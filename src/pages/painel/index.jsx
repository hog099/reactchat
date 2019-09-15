import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../auth/authActions'

import './index.css';

import Tickets from './tickets/index';
import ChatBox from './chatticket/index';
import NavbarPainel from './navbarpainel/index';

class Painel extends Component {

    componentWillMount() {
        const userLogged = this.props.user
        if (userLogged) {
            this.props.getUserDetails(userLogged)
        }

    }

    render() {
        if (!this.props.user || !this.props.validToken) {
            return <Redirect to="/login" />
        }


        return (
            <React.Fragment>
                
                <NavbarPainel />

                <div className='container-fluid PainelAdmin'>
                    <div className="row justify-content-center">


                        <div className="card col-sm col-md cardPainelStyle">
                            <div className="row">


                                <div className="card col-sm-3 col-md-3 col-xs-3  d-flex containterTickets">
                                    <Tickets />
                                </div>

                                <div className="card col-sm col-md col-xs  d-flex containerBodyMsgs">
                                    <ChatBox />

                                </div>

                            </div>
                        </div>






                    </div>
                </div>
            </React.Fragment>
        )
    }

}


const mapStateToProps = state => ({
    validToken: state.AuthReducer.validToken,
    user: state.AuthReducer.user
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(authActions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Painel)
