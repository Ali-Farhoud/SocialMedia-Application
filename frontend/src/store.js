import { configureStore } from '@reduxjs/toolkit'
import { conversationReducer } from './reducers/conversationReducers'
import { messageReducer } from './reducers/messageReducers'
import { allPostsReducer, feedPostReducer } from './reducers/postReducers'
import {
	allUsersReducer,
	userLoginReducer,
	userSignupReducer,
} from './reducers/userReducers'

const userInfoFromStorage = localStorage.getItem('userinfo')
	? JSON.parse(localStorage.getItem('userinfo'))
	: null
const initialState = { userLogin: { userInfo: userInfoFromStorage } }
const store = configureStore({
	reducer: {
		userLogin: userLoginReducer,
		userSignup: userSignupReducer,
		timelinePosts: feedPostReducer,
		allPosts: allPostsReducer,
		allUsers: allUsersReducer,
		loadedConversations: conversationReducer,
		loadedMessages: messageReducer,
	},

	preloadedState: initialState,
})

export default store
