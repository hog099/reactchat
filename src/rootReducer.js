import {combineReducers} from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'

import ChatClientReducer from './pages/chatClient/chatClientReducer';
import AuthReducer from './pages/auth/authReducer';

export default combineReducers({
    toastr: toastrReducer,
    ChatClient: ChatClientReducer,
    AuthReducer: AuthReducer
})