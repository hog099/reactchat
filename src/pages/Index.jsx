import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as chatClientActions from './chatClient/chatClientActions'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom';
import { BarLoader } from 'react-spinners';


import './index.css';


class Index extends Component {

   constructor(props){
       super(props)
        this.state = {
            loadingbar: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }



    async onSubmit(e) {
        e.preventDefault();

        this.changeLoading();

        const values = {
            name: e.target.name.value,
            nameSponsored: e.target.nameSponsored.value
        }

        setTimeout(async()=>{
        await this.props.EnterChat(values);
        }, 1000);

        this.changeLoading();
    }

    changeLoading() {
        this.setState({ loadingbar: !this.state.loadingbar });
    }



    render() {
       
        if (this.props.clientEnter === true) {
            return <Redirect to='/homeClient' />
        }

        return (
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="card col-sm-12 col-md-6 col-xs-4 cardStyle d-flex">

                        <h3>Solicitar Atendimento</h3>

                        <div className="cardBody">
                            <form onSubmit={this.onSubmit}>
                                <input type="text" className="form-control" name="name" placeholder="Digite Seu Nome" required />
                                <input type="text" className="form-control" name="nameSponsored" placeholder="Digite Nome da Franquia" required />


                                {!this.state.loadingbar ?
                                    <button type="submit" className="btn btn-primary btn-block btnlogin" >Acessar</button>

                                    :
                                    <div className="row justify-content-center">
                                        <BarLoader className='spinnerloading' height={6} width={300} color={'#007bff'} />
                                    </div>
                                }



                            </form>

                        </div>

                    </div>
                </div>
            </div>
        );
    }


}


const mapStateToProps = state => ({
    clientEnter: state.ChatClient.clientEnter
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(chatClientActions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Index)
