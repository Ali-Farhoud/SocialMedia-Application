import axios from 'axios'
export const loadConversations = (userId) => async (dispatch) => {
	try {
		dispatch({
			type: 'CONVERSATION_REQUEST',
		})
		const { data } = await axios.get(`/api/conversations/${userId}`)
		dispatch({
			type: 'CONVERSATION_SUCCESS',
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: 'CONVERSATION_FAIL',
			payload: error.message,
		})
	}
}
