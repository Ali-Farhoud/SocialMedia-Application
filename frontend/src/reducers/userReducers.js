export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case 'USER_LOGIN_REQUEST':
			return { loading: true }
		case 'USER_LOGIN_SUCCESS':
			return { loading: false, userInfo: action.payload }
		case 'USER_LOGIN_UPDATE':
			return { loading: false, userInfo: action.payload }
		case 'USER_LOGIN_FAIL':
			return { loading: false, error: action.payload }
		case 'USER_LOGOUT':
			return {}
		default:
			return state
	}
}
export const allUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case 'USER_ALL_REQUEST':
			return { loading: true }
		case 'USER_ALL_SUCCESS':
			return { loading: false, users: action.payload }
		case 'USER_ALL_FAIL':
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
export const userSignupReducer = (state = {}, action) => {
	switch (action.type) {
		case 'USER_SIGNUP_REQUEST':
			return { loading: true }
		case 'USER_SIGNUP_SUCCESS':
			return { loading: false, success: true }
		case 'USER_SIGNUP_FAIL':
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
