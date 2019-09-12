import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as chatClientActions from './chatClient/chatClientActions'
import { bindActionCreators } from 'redux'
import { BarLoader } from 'react-spinners';


import './index.css';


class Index extends Component {
   
       state = {
            loadingbar: false
        }
    


    async onSubmit(e) {
        e.preventDefault();
        this.changeloading();
        
        const values = {
            name: e.target.name,
            nameSponsored: e.target.nameSponsored
        }
        
        await this.props.EnterChat(values);
        
        this.changeloading();
    }

    changeloading() {
        this.setState({loadingbar: !this.state.loadingbar});
    }



    render() {
        return (
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="card col-sm-12 col-md-6 col-xs-4 cardStyle d-flex">

                        <h3>Solicitar Atendimento</h3>

                        <div className="cardBody">
                            <form>
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




const mapDispatchToProps = dispatch => (
    bindActionCreators(chatClientActions, dispatch)
)

export default connect(null, mapDispatchToProps)(Index)
