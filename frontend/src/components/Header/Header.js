import React from 'react'
import './header.css'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import InboxIcon from '@mui/icons-material/Inbox'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
const Header = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const dispatch = useDispatch()
	const logoutHandler = () => {
		dispatch(logout())
	}
	return (
		<div className='main-header'>
			<div className='container'>
				<div className='header-main'>
					<div className='header-left'>
						<Link to='/'>
							<h1>Social App</h1>
						</Link>
					</div>
					<div className='header-center'>
						<div className='searchbar'>
							<SearchIcon className='searchIcon' />
							<input
								className='search-input'
								type='text'
								placeholder='Search for anything...'
							/>
						</div>
					</div>
					<div className='header-right'>
						<div className='right-1'>
							<ul>
								<li>Profile</li>
								<li onClick={logoutHandler}>Sign Out</li>
							</ul>
						</div>
						<div className='right-2'>
							<div className='iconItem'>
								<InboxIcon /> <span className='iconBadge'>1</span>
							</div>
							<div className='iconItem'>
								<PersonIcon /> <span className='iconBadge'>1</span>
							</div>
							<div className='iconItem'>
								<NotificationsIcon /> <span className='iconBadge'>1</span>
							</div>
						</div>
						<div className='right-3'>
							{userInfo && (
								<Link to={`/profile/${userInfo._id}`}>
									<img
										className='nav-image'
										src={userInfo.profilePicture}
										alt='me'
									/>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
