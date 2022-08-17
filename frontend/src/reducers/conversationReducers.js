export const conversationReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CONVERSATION_REQUEST':
			return { loading: true }
		case 'CONVERSATION_SUCCESS':
			return { loading: false, conversations: action.payload }
		case 'CONVERSATION_FAIL':
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
