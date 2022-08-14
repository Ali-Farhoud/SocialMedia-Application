import './rightbar.css'
import React, { useEffect, useState } from 'react'
import CakeIcon from '@mui/icons-material/Cake'

import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Rightbar = ({ profile, userId }) => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const [user, setUser] = useState(null)
	useEffect(() => {
		if (profile) {
			getUser(userId)
		}
	}, [profile, userId])
	const getUser = async (id) => {
		const { data } = await axios.get(`/api/users/${id}`)
		setUser(data)
	}
	return (
		<div className='rightbar'>
			<div className='rightbarWrapper'>
				{!profile ? (
					<>
						<div className='birthdayContainer'>
							<CakeIcon className='cakeIcon' />
							<span className='birthdayText'>
								<b>Ammar Farhoud</b> and <b>3 other friends</b> have a birthday
								today
							</span>
						</div>
						<img src='/images/ad.jpeg' alt='' className='rightbarAd' />
						<h4 className='rightbarTitle'>Online Friends</h4>
						<hr className='rightbarHr' />
						<ul className='rightbarFriendList'>
							{userInfo && userInfo.following.length > 0 ? (
								userInfo.following.map((user) => (
									<li className='rightbarFriend' key={user._id}>
										<div className='rightbarProfileImgContainer'>
											<Link to={`/profile/${user._id}`}>
												<img
													src={user.profilePicture}
													alt=''
													className='rightbarProfileImg'
												/>
											</Link>
											<span className='rightbarOnline'></span>
										</div>
										<span className='rightbarUsername'>{user.username}</span>
									</li>
								))
							) : (
								<span>You currently have 0 friends online</span>
							)}
						</ul>
					</>
				) : profile && user ? (
					<>
						<h4 className='rightbarTitle'>User Information</h4>
						<div className='rightbarInfo'>
							<div className='rightbarInfoItem'>
								<span className='rightbarInfoKey'>City:</span>
								<span className='rightbarInfoValue'>Ottawa</span>
							</div>
							<div className='rightbarInfoItem'>
								<span className='rightbarInfoKey'>From:</span>
								<span className='rightbarInfoValue'>Palestine</span>
							</div>
							<div className='rightbarInfoItem'>
								<span className='rightbarInfoKey'>Relationship:</span>
								<span className='rightbarInfoValue'>Single</span>
							</div>
							<div className='rightbarInfoItem'>
								<span className='rightbarInfoKey'>Following:</span>
								<span className='rightbarInfoValue'>
									{user.following.length}
								</span>
							</div>
							<div className='rightbarInfoItem'>
								<span className='rightbarInfoKey'>Followers:</span>
								<span className='rightbarInfoValue'>
									{user.followers.length}
								</span>
							</div>
						</div>
						<h4 className='rightbarTitle'>User friends</h4>
						<div className='rightbarFollowings'>
							{user && user.following.length > 0 ? (
								user.following.map((user) => (
									<div className='rightbarFollowing' key={user._id}>
										<img
											src={user.profilePicture}
											alt=''
											className='rightbarFollowingImg'
										/>
										<span className='rightbarFollowingName'>
											{user.username}
										</span>
									</div>
								))
							) : (
								<span>0 friends</span>
							)}
						</div>
					</>
				) : (
					<h4>Please refresh page</h4>
				)}
			</div>
		</div>
	)
}

export default Rightbar
