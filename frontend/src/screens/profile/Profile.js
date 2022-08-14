import './profile.css'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllUsers, updateUser } from '../../actions/userActions'
import axios from 'axios'
const Profile = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin
	const allUsers = useSelector((state) => state.allUsers)
	const { users } = allUsers
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const params = useParams()
	const [otherUser, setOtherUser] = useState(null)
	const [following, setFollowing] = useState([])
	useEffect(() => {
		if (!userInfo) {
			navigate('/signin')
		} else if (userInfo._id !== params.id) {
			getOtherUser(params.id)
			const followingList = userInfo.following.map((u) => u._id)
			setFollowing(followingList)
		}
		if (users && users.length === 0) {
			dispatch(getAllUsers())
		}
	}, [userInfo, navigate, dispatch, users, params.id])
	const getOtherUser = async (id) => {
		const { data } = await axios.get(`/api/users/${id}`)
		setOtherUser(data)
	}
	const followHandler = async (id, myId) => {
		try {
			await axios.put(`/api/users/${id}/follow`, { userId: myId })
			dispatch(updateUser(myId))
		} catch (error) {
			console.log(error)
		}
	}
	const unfollowHandler = async (id, myId) => {
		try {
			await axios.put(`/api/users/${id}/unfollow`, { userId: myId })
			dispatch(updateUser(myId))
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<div className='container'>
				<div className='profile'>
					{loading ? (
						<h4>Loading...</h4>
					) : error ? (
						<h4>{error}</h4>
					) : userInfo ? (
						<>
							<Sidebar />
							{userInfo._id === params.id ? (
								<div className='profileRight'>
									<div className='profileRightTop'>
										<div className='profileCover'>
											<img
												src='/assets/post/3.jpeg'
												alt=''
												className='profileCoverImg'
											/>
											<img
												src={userInfo.profilePicture}
												alt=''
												className='profileUserImg'
											/>
										</div>
										<div className='profileInfo'>
											<h4 className='profileName'>{userInfo.username}</h4>
											<span className='profileInfoDesc'>Hi Friends</span>
										</div>
									</div>
									<div className='profileRightBottom'>
										<Feed profile userId={userInfo._id} />
										<Rightbar profile userId={userInfo._id} />
									</div>
								</div>
							) : otherUser ? (
								<div className='profileRight'>
									<div className='profileRightTop'>
										<div className='profileCover'>
											<img
												src='/assets/post/3.jpeg'
												alt=''
												className='profileCoverImg'
											/>
											<img
												src={otherUser.profilePicture}
												alt=''
												className='profileUserImg'
											/>
										</div>
										<div className='profileInfo'>
											<h4 className='profileName'>{otherUser.username}</h4>
											<span className='profileInfoDesc'>Hi Friends</span>
											{following.includes(otherUser._id) ? (
												<button
													onClick={() => {
														unfollowHandler(otherUser._id, userInfo._id)
													}}
													className='followingButton'
												>
													Following
												</button>
											) : (
												<button
													onClick={() => {
														followHandler(otherUser._id, userInfo._id)
													}}
													className='followButton'
												>
													Follow
												</button>
											)}
										</div>
									</div>
									<div className='profileRightBottom'>
										<Feed profile userId={params.id} />
										<Rightbar profile userId={params.id} />
									</div>
								</div>
							) : (
								<h5>Something went wrong please refresh...</h5>
							)}
						</>
					) : (
						<h1>Please Sign in</h1>
					)}
				</div>
			</div>
		</>
	)
}

export default Profile
