import { userKey } from '../../config/auth-token'

const INICIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKey)),
    validToken: false,
    loadingbarLogin: false,
    userDetails: ''
}

export default (state = INICIAL_STATE, action) => {
    switch (action.type) {

        case 'USER_FETCHED':
            localStorage.setItem(userKey, JSON.stringify(action.payload))
            return { ...state, user: action.payload, userDetails: action.userDetails, validToken: true }

        case 'USER_ALREADY_LOGGED':
            return { ...state, userDetails: action.payload, validToken: true }

        case 'USER_DETAILS_FETCHED':
            return { ...state, userDetails: action.payload }


        case 'CHANGE_LOADINGBAR_LOGIN':
            return { ...state, loadingbarLogin: action.payload }

        default:
            return state

    }

}