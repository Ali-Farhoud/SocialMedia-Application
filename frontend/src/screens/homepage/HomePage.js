import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './homepage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import { getAllUsers } from '../../actions/userActions'
const HomePage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin
	const allUsers = useSelector((state) => state.allUsers)
	const { users } = allUsers
	useEffect(() => {
		if (!userInfo) {
			navigate('/signin')
		}
		if (users && users.length === 0) {
			dispatch(getAllUsers())
		}
	}, [navigate, userInfo, dispatch, users])
	return (
		<>
			<div className='container'>
				<div className='homepage'>
					{loading ? (
						<h2>Loading...</h2>
					) : error ? (
						<h2>{error}</h2>
					) : (
						<>
							<Sidebar />
							<Feed />
							<Rightbar />
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default HomePage
