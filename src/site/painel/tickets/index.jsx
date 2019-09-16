import React, { Component } from 'react';
import { userKey } from '../../../config/auth-token'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as chatticketActions from '../chatticket/chatActions'

import './index.css';

class Tickets extends Component {

    componentWillMount() { 
        this.props.getChats();
    }


    openItem(chat) {
        const agent = JSON.parse(localStorage.getItem(userKey));
        
        if(chat.agent === agent.name){
            this.props.getDataChat(chat.id);
        }else{
            if( window.confirm('Inicar Atendimento?') ){
                this.props.getDataChat(chat.id);
                this.props.selectChat(chat.id, agent);
            }
        }
       
        this.props.messagesListPainel(chat.id);
        

    }


    render() {
        const chatList = this.props.chatList;

        return (
            <React.Fragment>

                {chatList ?
                    chatList.map((chat, index) => {
                        return (
                            <div className="card cardTicketItemlist" key={index} onClick={()=>this.openItem(chat)} >
                                <div className="textCardTicketItemList"key={index}>
                                    <p>{`#${index+1}-${chat.nameSponsored}`}</p>
                                    <p>Solic: {chat.name} || Agente: {chat.agent} </p>
                                    {/* <p>Agente: {chat.agent}</p> */}
                                </div>
                                <div className={`cardFooterChatItemList statusitemlistChat${chat.status}`}>
                                    <p>{chat.status}</p>
                                </div>
                            </div>
                        )
                    })

                    :
                    <p>Carregando Lista...</p>
                }

                               

            </React.Fragment>

        );

    }
}


const mapStateToProps = state => ({
    chatList: state.ChatPainel.chatList,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(chatticketActions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
