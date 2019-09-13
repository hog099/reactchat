import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { HashRouter } from 'react-router-dom'
// import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import thunk from 'redux-thunk';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/jquery/dist/jquery.min.js'


import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(
    <Provider store={store}>
        <ReduxToastr />
        <HashRouter>
            <Routes />
        </HashRouter>
    </Provider>
    , document.getElementById('root'));


// serviceWorker.unregister();