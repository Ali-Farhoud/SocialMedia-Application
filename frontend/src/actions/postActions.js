import axios from 'axios'
export const loadPosts = (userId) => async (dispatch) => {
	try {
		dispatch({
			type: 'FEED_POST_REQUEST',
		})
		const { data } = await axios.get(`/api/posts/timeline/${userId}`)
		dispatch({
			type: 'FEED_POST_SUCCESS',
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: 'FEED_POST_FAIL',
			payload: error.message,
		})
	}
}
export const loadAllPosts = () => async (dispatch) => {
	try {
		dispatch({
			type: 'ALL_POST_REQUEST',
		})
		const { data } = await axios.get(`/api/posts`)
		dispatch({
			type: 'ALL_POST_SUCCESS',
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: 'ALL_POST_FAIL',
			payload: error.message,
		})
	}
}
