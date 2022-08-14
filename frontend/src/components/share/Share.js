import './share.css'
import React from 'react'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import RoomIcon from '@mui/icons-material/Room'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import LabelIcon from '@mui/icons-material/Label'
import { useSelector } from 'react-redux'
const Share = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, userInfo } = userLogin

	return (
		<div className='share'>
			<div className='shareWrapper'>
				<div className='shareTop'>
					{loading ? (
						<h1>loading...</h1>
					) : userInfo ? (
						<>
							<img
								src={userInfo.profilePicture}
								alt=''
								className='shareProfileImg'
							/>
							<input
								placeholder={`What's on your mind, ${userInfo.username}?`}
								className='shareInput'
							/>
						</>
					) : (
						<h1>no user logged in</h1>
					)}
				</div>
				<hr className='shareHr' />
				<div className='shareBottom'>
					<div className='shareOptions'>
						<div className='shareOption'>
							<PermMediaIcon htmlColor='tomato' className='shareIcon' />
							<span className='shareOptionText'>Photo or Video</span>
						</div>
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
					<button className='shareButton'>Share</button>
				</div>
			</div>
		</div>
	)
}

export default Share
