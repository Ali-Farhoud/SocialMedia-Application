import './post.css'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Post = ({ post, loggedInUser }) => {
	//useState for component-level state
	const [user, setUser] = useState(null)
	const [likes, setLikes] = useState(post.likes.length)
	const [isLiked, setIsLiked] = useState(
		loggedInUser && post.likes.includes(loggedInUser._id)
	)
	// handle like action by user
	const likeHandler = async () => {
		if (loggedInUser) {
			if (!isLiked) {
				await axios.put(`/api/posts/${post._id}/like`, {
					userId: loggedInUser._id,
				})
				setLikes(likes + 1)
				setIsLiked(true)
			} else {
				await axios.put(`/api/posts/${post._id}/like`, {
					userId: loggedInUser._id,
				})
				setLikes(likes - 1)
				setIsLiked(false)
			}
		}
	}
	// useEffect hook runs when component renders or value in dependency array changes
	useEffect(() => {
		if (post) {
			const getUser = async (userId) => {
				try {
					const { data } = await axios.get(`/api/users/${userId}`)
					setUser(data)
				} catch (err) {
					console.log(err)
				}
			}
			if (post.userId === loggedInUser._id) {
				setUser(loggedInUser)
			} else {
				getUser(post.userId)
			}
		}
	}, [post, loggedInUser])
	return (
		<div className='post'>
			<div className='postWrapper'>
				<div className='postTop'>
					<div className='postTopLeft'>
						{user && (
							<>
								<Link to={`/profile/${user.userId}`}>
									<img
										src={user.profilePicture}
										alt=''
										className='postProfileImg'
									/>
									<span className='postName'>{user.username}</span>
								</Link>
								<span className='postTime'>{post.createdAt}</span>
							</>
						)}
					</div>
					<div className='postTopRight'>
						<MoreVertIcon className='postMoreIcon' />
					</div>
				</div>

				<div className='postCenter'>
					<span className='postText'>{post?.description}</span>
					<img src={post.image} alt='' className='postImg' />
				</div>
				<div className='postBottom'>
					<div className='postBottomLeft'>
						<FavoriteIcon
							htmlColor='tomato'
							className='likeIcon'
							onClick={likeHandler}
						/>
						<span className='postLikeCounter'>{likes}</span>
						<CommentIcon htmlColor='blue' className='commentIcon' />
						<span className='commentCount'>0</span>
					</div>
					<div className='postBottomRight'>
						{/* <span className='postCommentText'>{post.comment} comments</span> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Post
