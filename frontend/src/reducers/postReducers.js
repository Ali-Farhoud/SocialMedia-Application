export const feedPostReducer = (state = { feedPosts: [] }, action) => {
	switch (action.type) {
		case 'FEED_POST_REQUEST':
			return { loading: true }
		case 'FEED_POST_SUCCESS':
			return { loading: false, feedPosts: action.payload }
		case 'FEED_POST_FAIL':
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
export const allPostsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ALL_POST_REQUEST':
			return { loading: true }
		case 'ALL_POST_SUCCESS':
			return { loading: false, posts: action.payload }
		case 'ALL_POST_FAIL':
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
