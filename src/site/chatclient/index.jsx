import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as chatClientActions from './chatClientActions';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import './index.css';

class chatClient extends Component {


    componentWillMount() {
        const chat = JSON.parse(localStorage.getItem('_chatData'));
        if (chat) {
            this.props.setChatData(chat.id);
            this.props.messagesList(chat.id);
        }
      
    }


    handleSubmit = e => {
        e.preventDefault();
        // console.log(e.target.textchat.value)
        this.sendMessage(e.target.textchat.value);
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            let value = e.target.value;
            this.sendMessage(value);
        }
    }

    sendMessage(value) {
        const content = value;
        const chatFromData = this.props.chatData;
        const chatTo = '';


        this.props.sendChatMessage(chatFromData, chatTo, content);
        const chat = JSON.parse(localStorage.getItem('_chatData'));
        this.props.messagesList(chat.id);
    }

    finalizarChat() {
        const chat = JSON.parse(localStorage.getItem('_chatData'));
        localStorage.removeItem('_chatData');
        this.props.finalizarChatClient(chat.id);
        window.location.reload();
    }

   

    render() {
        const { nameSponsored } = this.props.chatData;
        const listMessages = this.props.listMessages;
        const chat = JSON.parse(localStorage.getItem('_chatData'));


        if (!chat) {            
            return <Redirect to="/" />
        }


        return (
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="card col-sm-10 col-md-10 col-xs-10 cardChatStyle d-flex">

                        <h3>Atendimento em Andamento</h3>



                        <div className="cardChat">

                            <div className="card-header cardHeader">
                                <p># - {nameSponsored}</p>
                                <span>
                                    <button type="button" className="btn btn-sm btn-secondary"
                                        onClick={() => this.finalizarChat()}>Finalizar</button>
                                </span>
                            </div>

                            <div className="cardBody">

                                <div className="contentChat" id="msg_history">

                                    {listMessages ?
                                        listMessages.map((message, index) => {
                                            if (message.from === chat.name) {
                                                return (
                                                    <div className="outgoing_msg" key={index}>
                                                        <div className="sent_msg">
                                                            <p>{message.content}</p>
                                                            {/* <span className="time_date"> 11:01 AM | June 9</span> */}
                                                        </div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="incoming_msg" key={index}>
                                                        <div className="received_msg">
                                                            <p>{message.content}</p>
                                                            {/* <span className="time_date"> 11:01 AM | June 9</span> */}
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        }) : ''
                                    }

                                </div>

                            </div>

                            <div className="card-footer cardChatFooter">

                                <div className="contentTypeChat">
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="input-group">
                                            <input type="text"
                                                className="form-control inputChat"
                                                name="textchat"
                                                id="inputChatClient"
                                                onKeyPress={this.handleKeyPress}
                                                placeholder="Digite uma Mensagem"
                                            />

                                            <div className="input-group-append">
                                                <button className="input-group-text"
                                                    type="submit"
                                                >
                                                    <i className="fas fa-paper-plane" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>


                                    </form>

                                </div>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    chatData: state.ChatClient.chatData,
    listMessages: state.ChatClient.listMessages,
    chatFinishClient: state.ChatClient.chatFinishClient,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(chatClientActions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(chatClient)