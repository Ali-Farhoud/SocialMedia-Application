import axios from 'axios'
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: 'USER_LOGIN_REQUEST',
		})

		const { data } = await axios.post('/api/auth/login', { email, password })

		dispatch({
			type: 'USER_LOGIN_SUCCESS',
			payload: data,
		})
		localStorage.setItem('userinfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: 'USER_LOGIN_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
export const logout = () => (dispatch) => {
	localStorage.removeItem('userinfo')
	dispatch({ type: 'USER_LOGOUT' })
}
export const signup = (newUser) => async (dispatch) => {
	try {
		dispatch({
			type: 'USER_SIGNUP_REQUEST',
		})

		await axios.post('/api/auth/register', {
			username: newUser.username,
			email: newUser.email,
			password: newUser.password,
		})

		dispatch({
			type: 'USER_SIGNUP_SUCCESS',
		})
	} catch (error) {
		dispatch({
			type: 'USER_SIGNUP_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
export const updateUser = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/api/users/${id}`)

		dispatch({
			type: 'USER_LOGIN_UPDATE',
			payload: data,
		})
		localStorage.setItem('userinfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: 'USER_LOGIN_UPDATE_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({
			type: 'USER_ALL_REQUEST',
		})
		const { data } = await axios.get('/api/users/all')

		dispatch({
			type: 'USER_ALL_SUCCESS',
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: 'USER_ALL_ERROR',
			payload: error.message,
		})
	}
}
