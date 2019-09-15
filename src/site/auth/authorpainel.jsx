import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authActions from './authActions'

// import './App.css'
import Auth from './auth'
import App from '../painel/index'


class AuthOrApp extends Component {

    componentWillMount() {
        if (this.props.user) {
            // const res = this.props.validateToken(this.props.user.token) 
            this.props.userlogged(this.props.user)
        }
    }

    render() {
        const validToken = this.props.validToken
        const user = this.props.user
        

        if (user && validToken) {
            return  <App /> 
        } else if (!user && !validToken) {
            return <Auth />
        } else {
            return <Auth />
        }

    }

}


const mapStateToProps = state => ({
    validToken: state.AuthReducer.validToken,
    user: state.AuthReducer.user
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(authActions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)