import {combineReducers} from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'

import ChatClientReducer from './pages/chatClient/chatClientReducer';

export default combineReducers({
    toastr: toastrReducer,
    ChatClient: ChatClientReducer
})