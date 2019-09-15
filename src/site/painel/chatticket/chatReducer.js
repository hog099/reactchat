const INICIAL_STATE = {
    listMessagesPainel: '',
    chatList: '',
    currentChat: '',
}

export default (state = INICIAL_STATE, action) => {
    switch (action.type) {

        case 'GET_LIST_MESSAGES_PAINEL':
            return { ...state, listMessagesPainel: action.payload }

        case 'CHAT_LIST_FETCHED':
            return { ...state, chatList: action.payload }

        case 'CURRENT_CHAT':
            return { ...state, currentChat: action.payload }

        case 'CHAT_FINISHED_PAINEL':
            return { ...state, currentChat: '', listMessagesPainel: '' }

        default:
            return state

    }

}