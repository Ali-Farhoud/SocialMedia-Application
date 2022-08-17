import axios from 'axios'
import { useEffect, useState } from 'react'
import './message.css'

const Message = ({ own, userId, text, time }) => {
	const [user, setUser] = useState(null)
	useEffect(() => {
		if (userId) {
			getUser(userId)
		}
	}, [userId])
	const getUser = async (userId) => {
		try {
			const { data } = await axios.get(`/api/users/${userId}`)
			setUser(data)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className={own ? 'message own' : 'message'}>
			<div className='messageTop'>
				{user ? (
					<img src={user.profilePicture} alt='' className='messageImg' />
				) : (
					<img src='/images/default.jpeg' alt='' className='messageImg' />
				)}
				<p className='messageText'>{text}</p>
			</div>
			<div className='messageBottom'>
				<span className='messageDate'>{time}</span>
			</div>
		</div>
	)
}

export default Message
