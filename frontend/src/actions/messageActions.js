import axios from 'axios'
export const loadMessages = (convoId) => async (dispatch) => {
	try {
		dispatch({
			type: 'MESSAGES_REQUEST',
		})
		const { data } = await axios.get(`/api/messages/${convoId}`)
		dispatch({
			type: 'MESSAGES_SUCCESS',
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: 'MESSAGES_FAIL',
			payload: error.message,
		})
	}
}
