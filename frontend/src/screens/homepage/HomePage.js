import './homepage.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'

const HomePage = () => {
	// useNavigate hook to navigate to a different path
	const navigate = useNavigate()
	// useDispatch hook to work with redux
	const dispatch = useDispatch()
	// useSelector hook retrieves universal state from redux store
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	// useEffect hook is run when component is rendered and when values in the dependency array change
	useEffect(() => {
		// check for logged in user
		if (!userInfo) {
			navigate('/signin')
		}
	}, [navigate, userInfo, dispatch])
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
							<Sidebar loggedInUser={userInfo} />
							<Feed loggedInUser={userInfo} />
							<Rightbar loggedInUser={userInfo} />
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default HomePage
