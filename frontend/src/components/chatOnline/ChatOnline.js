import './chatOnline.css'

const ChatOnline = ({ user, myUser }) => {
	return (
		<div className='chatOnline'>
			{user && (
				<div className='chatOnlineFriend'>
					<div className='chatOnlineImgContainer'>
						<img src={user.profilePicture} alt='' className='chatOnlineImg' />
						<div className='chatOnlineBadge'></div>
					</div>
					<span className='chatOnlineName'>{user.username}</span>
				</div>
			)}
		</div>
	)
}

export default ChatOnline
