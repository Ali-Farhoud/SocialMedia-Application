import './share.css'
import React, { useState } from 'react'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import RoomIcon from '@mui/icons-material/Room'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import LabelIcon from '@mui/icons-material/Label'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { loadPosts } from '../../actions/postActions'
const Share = ({ loggedInUser }) => {
	// useState hook for componenet level state
	const [description, setDescription] = useState('')
	const [file, setFile] = useState(null)
	const dispatch = useDispatch()

	// upload photo file to backend
	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.post('/api/upload', formData, config)
			setFile(data)
		} catch (error) {
			console.log(error)
		}
	}
	// submit handler to create post
	const submitHandler = async (e) => {
		e.preventDefault()
		const post = {
			userId: loggedInUser._id,
			description,
			image: file,
		}
		await axios.post('/api/posts', post)
		dispatch(loadPosts(loggedInUser._id))
		setDescription('')
	}
	return (
		<div className='share'>
			<div className='shareWrapper'>
				<div className='shareTop'>
					{loggedInUser && (
						<>
							<img
								src={loggedInUser.profilePicture}
								alt=''
								className='shareProfileImg'
							/>
							<input
								placeholder={`What's on your mind, ${loggedInUser.username}?`}
								className='shareInput'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</>
					)}
				</div>
				<hr className='shareHr' />
				<form className='shareBottom' onSubmit={submitHandler}>
					<div className='shareOptions'>
						<label htmlFor='file' className='shareOption'>
							<PermMediaIcon htmlColor='tomato' className='shareIcon' />
							<span className='shareOptionText'>Photo or Video</span>
							<input
								type='file'
								style={{ display: 'none' }}
								id='file'
								accept='.png,.jpeg,.jpg'
								onChange={uploadFileHandler}
							/>
						</label>
						<div className='shareOption'>
							<LabelIcon htmlColor='blue' className='shareIcon' />
							<span className='shareOptionText'>Tag</span>
						</div>
						<div className='shareOption'>
							<RoomIcon htmlColor='green' className='shareIcon' />
							<span className='shareOptionText'>Location</span>
						</div>
						<div className='shareOption'>
							<EmojiEmotionsIcon htmlColor='goldenrod' className='shareIcon' />
							<span className='shareOptionText'>Feelings</span>
						</div>
					</div>
					<button className='shareButton' type='submit'>
						Share
					</button>
				</form>
			</div>
		</div>
	)
}

export default Share
