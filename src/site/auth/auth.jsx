import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as authActions from './authActions'
import { bindActionCreators } from 'redux'

import { Redirect } from 'react-router-dom';
import { BarLoader } from 'react-spinners';


import './auth.css';


class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginMode: true,
            loadingbar: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }


    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }
    

    async onSubmit(e) {
        e.preventDefault();

        this.changeLoading();

        if (this.state.loginMode) {
            const values = {
                email: e.target.email.value,
                password: e.target.password.value
            }

            await this.props.login(values);
            setTimeout(async () => {
                this.changeLoading();                
            }, 1000);

            return <Redirect to="/Painel" />

        } else {

            const values = {
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value
            }

            setTimeout(async () => {
                await this.props.signup(values);
                this.changeLoading();
            }, 1000);
        }

        
    }


    changeLoading() {
        this.setState({ loadingbar: !this.state.loadingbar });
    }



    render() {

        return (
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="card col-sm-12 col-md-6 col-xs-4 cardStyle d-flex">

                        <h3>Realize seu Acesso</h3>

                        <div className="cardBody">
                            <form onSubmit={this.onSubmit}>
                                {!this.state.loginMode ? <input type="text" placeholder="Digite seu Nome" className="form-control" name="name" required /> : ''}

                                <input type="email" className="form-control" name="email" placeholder="Digite Seu E-mail" required />

                                <input type="password" className="form-control" name="password" placeholder="Digite Sua Senha" required />


                                {!this.state.loadingbar ?
                                    <button type="submit" className="btn btn-primary btn-block btnlogin" >Acessar</button>

                                    :
                                    <div className="row justify-content-center">
                                        <BarLoader className='spinnerloading' height={6} width={300} color={'#007bff'} />
                                    </div>
                                }

                            </form>

                            <br />
                            <a onClick={() => this.changeMode()}><div className="row justify-content-center">
                                {this.state.loginMode ? 'Novo usuário? Registrar aqui!' :
                                    'Já é cadastrado? Entrar aqui!'}
                            </div>
                            </a>

                        </div>

                    </div>
                </div>
            </div>
        );
    }


}



const mapDispatchToProps = dispatch => (
    bindActionCreators(authActions, dispatch)
)

export default connect(null, mapDispatchToProps)(Auth)
