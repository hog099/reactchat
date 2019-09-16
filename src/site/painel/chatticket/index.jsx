import React, { Component } from 'react';
import { userKey } from '../../../config/auth-token'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as chatActions from './chatActions'

import './index.css';

class Chatbox extends Component {


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
        const agent = JSON.parse(localStorage.getItem(userKey));
        const currentChat = this.props.currentChat;

        const content = value;
        const chatFromData = agent;
        const chatTo = currentChat;


        this.props.messagesListPainel(currentChat.id);

        this.props.sendChatMessage(chatFromData, chatTo, content);
    }


    
    finalizarChat(){ 
        const currentChat = this.props.currentChat;
        this.props.finalizarChatPainel(currentChat.id);
    }



    render() {
        const currentChat = this.props.currentChat;
        const listMessagesPainel = this.props.listMessagesPainel;
        const agent = JSON.parse(localStorage.getItem(userKey));
        

        return (
            <React.Fragment>

                <div className="card-header">
                    <p># {currentChat.nameSponsored}</p>
                    {currentChat ?
                        <span>
                            <button type="button" className="btn btn-sm btn-secondary"
                                onClick={() => this.finalizarChat()}>Finalizar</button>
                        </span>
                        : ''}

                </div>

                <div className="cardBody">

                    <div className="contentChatBox" id="msg_historyPainel">
                        {listMessagesPainel ?
                            listMessagesPainel.map((message, index) => {
                                if (message.from === agent.name) {
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
                                    id="inputChatAgent"
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


            </React.Fragment>

        );

    }
}


const mapStateToProps = state => ({
    currentChat: state.ChatPainel.currentChat,
    listMessagesPainel: state.ChatPainel.listMessagesPainel,
    chatFinish: state.ChatClient.chatFinish,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(chatActions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox)
