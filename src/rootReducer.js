import {combineReducers} from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'

import ChatClientReducer from './site/chatclient/chatClientReducer';
import ChatPainelReducer from './site/painel/chatticket/chatReducer';
import AuthReducer from './site/auth/authReducer';

export default combineReducers({
    toastr: toastrReducer,
    ChatClient: ChatClientReducer,
    ChatPainel: ChatPainelReducer,
    AuthReducer: AuthReducer
})