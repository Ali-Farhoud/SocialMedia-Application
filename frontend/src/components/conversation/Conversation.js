import './conversation.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Conversation = ({ userId }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		if (!user) {
			getUser(userId)
		}
	}, [user, userId])
	const getUser = async (userId) => {
		try {
			const { data } = await axios.get(`/api/users/${userId}`)
			setUser(data)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='conversation'>
			{user ? (
				<>
					<img className='conversationImg' src={user.profilePicture} alt='' />
					<span className='conversationName'>{user.username}</span>
				</>
			) : (
				<h4>Loading..</h4>
			)}
		</div>
	)
}

export default Conversation
