import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../auth/authActions'

import './index.css';

class Navbarpainel extends Component {


    logoutPainel() {
        this.props.logout();
    }

    render() {
        return (
            <div className="card col-sm col-md navbarpainel">
                <div className="row">
                    <div className="col-md-8">
                        <h4>ReactChat</h4>

                    </div>

                    <div className="col-md-4">

                        <span>
                            <button type="button" className="btn btn-sm btn-default"
                                onClick={() => this.logoutPainel()}>
                                <h5>Sair</h5>
                            </button>
                        </span>
                    </div>

                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => (
    bindActionCreators(authActions, dispatch)
)

export default connect(null, mapDispatchToProps)(Navbarpainel)
