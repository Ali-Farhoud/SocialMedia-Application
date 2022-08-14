import './sidebar.css'
import React, { useEffect, useState } from 'react'

import RssFeedIcon from '@mui/icons-material/RssFeed'
import ChatIcon from '@mui/icons-material/Chat'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import GroupsIcon from '@mui/icons-material/Groups'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HelpIcon from '@mui/icons-material/Help'
import WorkIcon from '@mui/icons-material/Work'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const allUsers = useSelector((state) => state.allUsers)
	const { users } = allUsers
	const [suggestedList, setSuggestedList] = useState([])

	useEffect(() => {
		if (userInfo && users) {
			const followingId = userInfo.following.map((u) => u._id)

			const suggested = users.filter(
				(u) => u._id !== userInfo._id && !followingId.includes(u._id)
			)
			setSuggestedList(suggested)
		}
	}, [userInfo, users])

	return (
		<div className='sidebar'>
			<div className='sidebar-wrapper'>
				<ul className='sidebarList'>
					<li className='sidebarListItem'>
						<RssFeedIcon className='sideBarIcon' />
						<span className='sidebarListItemText'>Feed</span>
					</li>
					<li className='sidebarListItem'>
						<ChatIcon className='sideBarIcon' />
						<span className='sidebarListItemText'>Chats</span>
					</li>
					<li className='sidebarListItem'>
						<OndemandVideoIcon className='sideBarIcon' />
						<span className='sidebarListItemText'>Videos</span>
					</li>
					<li className='sidebarListItem'>
						<GroupsIcon className='sideBarIcon' />
						<span className='sidebarListItemText'>Groups</span>
					</li>
					<li className='sidebarListItem'>
						<BookmarkIcon className='sideBarIcon' />
						<span className='sidebarListItemText'>Bookmarks</span>
					</li>
					<li className='sidebarListItem'>
						<HelpIcon className='sideBarIcon' />
						<span className='sidebarListItemText'>FAQs</span>
					</li>
					<li className='sidebarListItem'>
						<RssFeedIcon className='sideBarIcon' />
						<span className='sidebarListItemText'>Jobs</span>
					</li>
					<li className='sidebarListItem'>
						<WorkIcon className='sideBarIcon' />
						<span className='sidebarListItemText'>Events</span>
					</li>
				</ul>
				<button className='sidebarButton'>Show More</button>
				<hr className='sidebarhr' />
				<ul className='sidebarFriendList'>
					<span className='suggestedUsers'>Suggested Users</span>
					{suggestedList && suggestedList.length > 0 ? (
						suggestedList.map((user) => (
							<Link to={`/profile/${user._id}`} key={user._id}>
								<li className='sidebarFriend'>
									<img
										src={user.profilePicture}
										alt=''
										className='sidebarFriendImg'
									/>
									<span className='sidebarFriendName'>{user.username}</span>
								</li>
							</Link>
						))
					) : (
						<span>no suggested people</span>
					)}
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
