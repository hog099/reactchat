import { toastr } from 'react-redux-toastr'

import firebase from '../../../config/firebaseConfig';

const chatRef = firebase.firestore().collection('/chats');



export function sendChatMessage(chatFrom, chatTo, content) {
//    console.log(chatFrom, chatTo, content)
    
    return dispatch => {

        if(content !== ''){
        // Adicionar mensagem no banco
        chatRef.doc(chatTo.id).collection('messages').add({
            content,
            timeStamp: new Date(),
            type: 'text',
            from: chatFrom.name,
            to: chatTo.name,
        });

        document.getElementById('inputChatAgent').value = '';

    }


    }
}


export function messagesListPainel(chatId) {
   
    
    return dispatch => {
        // Adicionar mensagem no banco
        chatRef.doc(chatId).collection('messages').orderBy('timeStamp').onSnapshot(docs =>{
            
            const listMessages = [];
            docs.forEach(doc=>{
                listMessages.push(doc.data()); 
            })
            // console.log(listMessages);  

            dispatch({ type: 'GET_LIST_MESSAGES_PAINEL', payload: listMessages })
            scrollMessagesToBottom();

        })

    }
}

export function scrollMessagesToBottom() {
    const eleMessageBox = document.getElementById('msg_historyPainel');
    eleMessageBox.scrollTop = document.getElementById('msg_historyPainel').scrollHeight;
}

export function finalizarChatPainel(chatId){

    return dispatch => {

        // Adicionar mensagem no banco
        chatRef.doc(chatId).update({
            status: 'finalizado'
        });

        dispatch({ type: 'CHAT_FINISHED_PAINEL' })

    }

}






// TOICKET ACTIONS
export function getChats() {

    return dispatch => {

        chatRef.onSnapshot(docs => {
            const chatList = []
            docs.forEach(doc => {
                // console.log(doc.id)
                if(doc.data().status !== 'finalizado'){
                const chat = {
                    id: doc.id,
                    agent: doc.data().agent,
                    status: doc.data().status,
                    name: doc.data().name,
                    nameSponsored: doc.data().nameSponsored
                }
                chatList.push(chat)
            }

            })

            dispatch({ type: 'CHAT_LIST_FETCHED', payload: chatList })
        });


    }

}

export function getDataChat(chatId) {


    return dispatch => {
        const chatList = [];
        chatRef.doc(chatId).get().then(chat => {
            //console.log('chat', chat.data())  
            const chatData = {
                id: chatId,
                status: chat.data().status,
                name: chat.data().name,
                nameSponsored: chat.data().nameSponsored
            }
            chatList.push(chatData)     

            dispatch({ type: 'CURRENT_CHAT', payload: chatList[0] })      
            
        });
    }

}


export function selectChat(chatId, agent) {

    return dispatch => {

        chatRef.doc(chatId).get().then(chat => {
            //console.log('chat', chat.data())
            if (chat.data().status === 'atendendo') {                
                if(!chat.data().agent === agent.uid){
                    toastr.warning('Chat sendo atendido por outro Agente.');
                }
            } else {
                chatRef.doc(chatId).update({
                    status: 'atendendo',
                    agent: agent.uid
                });
                
            }

        });



    }

}


