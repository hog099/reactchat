const INICIAL_STATE = {
    clientEnter: false
}

export default (state = INICIAL_STATE, action) => {
    switch (action.type) {

        case 'CLIENT_ENTER_CHAT':
            return { ...state, clientEnter: action.payload }

        default:
            return state

    }

}