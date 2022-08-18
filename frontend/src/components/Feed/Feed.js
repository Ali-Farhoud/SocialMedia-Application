import './feed.css'
import React, { useEffect, useState } from 'react'
import Share from '../share/Share'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllPosts, loadPosts } from '../../actions/postActions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Feed = ({ loggedInUser, profile, userId }) => {
	// useState hook for componenet level state
	const [user, setUser] = useState(null)
	// useSelector hook to retrieve state from redux store
	const timelinePosts = useSelector((state) => state.timelinePosts)
	const { loading, error, feedPosts } = timelinePosts
	const allPosts = useSelector((state) => state.allPosts)
	const { posts } = allPosts
	// dispatch for redux use
	const dispatch = useDispatch()
	// navigate to other urls
	const navigate = useNavigate()
	// useEffect runs when componenet runs or a value in the dependency array changes
	useEffect(() => {
		if (loggedInUser) {
			if (profile) {
				if (userId !== loggedInUser._id) {
					getUser(userId)
				} else {
					setUser(loggedInUser)
				}
				dispatch(loadAllPosts())
			} else {
				dispatch(loadPosts(loggedInUser._id))
			}
		} else {
			navigate('/')
		}
	}, [loggedInUser, dispatch, navigate, profile, userId])
	// gets user with (id) and sets it to user state
	const getUser = async (id) => {
		const { data } = await axios.get(`/api/users/${id}`)
		setUser(data)
	}
	return (
		<div className='feed'>
			{!profile ? (
				<div className='feedWrapper'>
					<Share loggedInUser={loggedInUser} />

					{loading ? (
						<h4 className='loading'>Loading...</h4>
					) : error ? (
						<h3>{error}</h3>
					) : feedPosts.length > 0 ? (
						feedPosts.map((p) => (
							<Post key={p._id} post={p} loggedInUser={loggedInUser} />
						))
					) : (
						<h4>Your timeline is empty , follow more people!</h4>
					)}
				</div>
			) : (
				<div className='feedWrapper'>
					<Share loggedInUser={loggedInUser} />

					{user &&
						posts &&
						posts
							.filter((p) => p.userId === user._id)
							.map((p) => (
								<Post key={p._id} post={p} loggedInUser={loggedInUser} />
							))}
				</div>
			)}
		</div>
	)
}

export default Feed
