const INICIAL_STATE = {
    clientEnter: false,
    chatFinish: false,
    chatFinishClient: false,
    chatData: '',
    listMessages: '',
}

export default (state = INICIAL_STATE, action) => {
    switch (action.type) {

        case 'CLIENT_ENTER_CHAT':
            localStorage.setItem('_chatData', JSON.stringify(action.chatData))
            return { ...state, clientEnter: action.payload, chatData: action.chatData }

        case 'GET_CHAT_DETAILS':
            localStorage.setItem('_chatData', JSON.stringify(action.payload))
            return { ...state, chatData: action.payload }

        case 'GET_LIST_MESSAGES':
            return { ...state, listMessages: action.payload }

        case 'CHAT_FINISHED':
            return { ...state, chatFinish: action.payload }

        case 'GET_CHAT_STATUS':
            return { ...state, chatFinishClient: action.payload }

        default:
            return state

    }

}