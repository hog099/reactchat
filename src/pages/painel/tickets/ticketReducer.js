const INICIAL_STATE = {
    chatList: '',
    currentChat: '',
}

export default (state = INICIAL_STATE, action) => {
    switch (action.type) {

        case 'CHAT_LIST_FETCHED':
            return { ...state, chatList: action.payload }

        case 'CURRENT_CHAT':
            return { ...state, currentChat: action.payload }

        default:
            return state

    }

}