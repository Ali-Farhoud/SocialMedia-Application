import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import { useDispatch, useSelector } from 'react-redux'
import './messenger.css'
import { useEffect, useRef, useState } from 'react'
import { loadConversations } from '../../actions/conversationActions'
import { loadMessages } from '../../actions/messageActions'
import SmsIcon from '@mui/icons-material/Sms'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
const Messenger = () => {
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const loadedConversations = useSelector((state) => state.loadedConversations)
	const { conversations } = loadedConversations
	const [currentConversation, setCurrentConversation] = useState(null)
	const [currentConversationMembers, setCurrentConversationMembers] = useState(
		[]
	)
	const loadedMessages = useSelector((state) => state.loadedMessages)
	const { messages } = loadedMessages
	const [message, setMessage] = useState('')
	const [arrivingMessage, setArrivingMessage] = useState(null)
	const [socket, setSocket] = useState(null)
	const scrollRef = useRef()
	const navigate = useNavigate()

	useEffect(() => {
		setSocket(io('ws://localhost:8900'))
	}, [])
	useEffect(() => {
		socket?.on('getMessage', (data) => {
			setArrivingMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			})
		})
	}, [socket])
	useEffect(() => {
		arrivingMessage &&
			currentConversationMembers.includes(arrivingMessage.sender) &&
			dispatch(loadMessages(currentConversation))
	}, [arrivingMessage])
	useEffect(() => {
		socket?.emit('addUser', userInfo._id)
		socket?.on('users', (users) => {
			console.log(users)
		})
	}, [userInfo, socket])
	useEffect(() => {
		if (userInfo) {
			dispatch(loadConversations(userInfo._id))
		} else {
			navigate('/signin')
		}
		if (currentConversation) {
			dispatch(loadMessages(currentConversation))
		}
	}, [dispatch, userInfo, currentConversation, navigate])
	const startConversation = async (recieverId, senderId) => {
		try {
			const newConversation = { senderId, recieverId }
			const {
				data: { _id, members },
			} = await axios.post('/api/conversations', newConversation)
			setCurrentConversation(_id)
			setCurrentConversationMembers(members)
		} catch (error) {}
	}
	const sendMessage = async () => {
		const newMessage = {
			conversationId: currentConversation,
			sender: userInfo._id,
			text: message,
		}
		socket?.emit('sendMessage', {
			senderId: userInfo._id,
			recieverId: currentConversationMembers.find((m) => m !== userInfo._id),
			text: message,
		})
		try {
			await axios.post('/api/messages', newMessage)
			setMessage('')
			dispatch(loadMessages(currentConversation))
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		scrollRef.current?.scrollIntoView()
	}, [messages])
	return (
		<div className='messenger'>
			<div className='chatMenu'>
				{conversations ? (
					<div className='chatMenuWrapper'>
						<input
							type='text'
							placeholder='Search for friends...'
							className='chatMenuInput'
						/>

						{conversations.map((c) => (
							<div
								onClick={() => {
									setCurrentConversation(c._id)
									setCurrentConversationMembers(c.members)
								}}
								key={c._id}
							>
								<Conversation
									userId={c.members.filter((m) => m !== String(userInfo._id))}
								/>
							</div>
						))}
					</div>
				) : (
					<h4>Loading...</h4>
				)}
			</div>
			<div className='chatBox'>
				<div className='chatBoxWrapper'>
					<div className='chatBoxTop'>
						{currentConversation && messages ? (
							messages.map((m) =>
								m.sender === String(userInfo._id) ? (
									<div ref={scrollRef} key={m._id}>
										<Message own text={m.text} time={m.createdAt} />
									</div>
								) : (
									<div ref={scrollRef} key={m._id}>
										<Message
											userId={m.sender}
											text={m.text}
											time={m.createdAt}
										/>
									</div>
								)
							)
						) : (
							<h4>Chat with friends!</h4>
						)}
					</div>
					<div className='chatBoxBottom'>
						<textarea
							className='chatBoxInput'
							placeholder='Type message here...'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button className='chatBoxSend' onClick={sendMessage}>
							Send
						</button>
					</div>
				</div>
			</div>
			<div className='chatOnline'>
				<div className='chatOnlineWrapper'>
					{userInfo && (
						<>
							<p className='chatOnlineP'>Online Friends</p>
							{userInfo.following.map((f) => (
								<div className='chatOnlineBox' key={f._id}>
									<ChatOnline user={f} myUser={userInfo} />
									<div
										className='startConvoIcon'
										onClick={() => startConversation(f._id, userInfo._id)}
									>
										<SmsIcon />
									</div>
								</div>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Messenger
