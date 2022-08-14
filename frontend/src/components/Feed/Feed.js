import './feed.css'
import React, { useEffect, useState } from 'react'
import Share from '../share/Share'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllPosts, loadPosts } from '../../actions/postActions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Feed = ({ profile, userId }) => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const [user, setUser] = useState(null)
	const timelinePosts = useSelector((state) => state.timelinePosts)
	const { loading, error, feedPosts } = timelinePosts
	const allPosts = useSelector((state) => state.allPosts)
	const { posts } = allPosts
	const dispatch = useDispatch()
	const navigate = useNavigate()
	useEffect(() => {
		if (userInfo) {
			if (profile) {
				getUser(userId)
				dispatch(loadAllPosts())
			} else {
				dispatch(loadPosts(userInfo._id))
			}
		} else {
			navigate('/')
		}
	}, [userInfo, dispatch, navigate, profile, userId])
	const getUser = async (id) => {
		const { data } = await axios.get(`/api/users/${id}`)
		setUser(data)
	}
	return (
		<div className='feed'>
			{!profile ? (
				<div className='feedWrapper'>
					<Share />

					{loading ? (
						<h4 className='loading'>Loading...</h4>
					) : error ? (
						<h3>{error}</h3>
					) : feedPosts.length > 0 ? (
						feedPosts.map((p) => <Post key={p._id} post={p} />)
					) : (
						<h4>Your timeline is empty , follow more people!</h4>
					)}
				</div>
			) : (
				<div className='feedWrapper'>
					<Share />

					{user &&
						posts &&
						posts
							.filter((p) => p.userId === user._id)
							.map((p) => <Post key={p._id} post={p} />)}
				</div>
			)}
		</div>
	)
}

export default Feed
