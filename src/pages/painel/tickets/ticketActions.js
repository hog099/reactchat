import { toastr } from 'react-redux-toastr'

import firebase from '../../../config/firebaseConfig';
const chatRef = firebase.firestore().collection('/chats');


export function getChats() {

    return dispatch => {

        chatRef.where("status", "!=", 'finalizado').onSnapshot(docs => {
            const chatList = []
            docs.forEach(doc => {
                // console.log('chatlist',doc.id)                
                const chat = {
                    id: doc.id,
                    agent: doc.data().agent,
                    status: doc.data().status,
                    name: doc.data().name,
                    nameSponsored: doc.data().nameSponsored
                }
                chatList.push(chat)
                
                // console.log('chatlist',chatList)                

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
            if (chat.data().status == 'atendendo') {
                if (!chat.data().agent == agent.uid) {
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


export function messagesList(chatId) {


    return dispatch => {
        const listMessages = [];
        // Adicionar mensagem no banco
        chatRef.doc(chatId).collection('messages').orderBy('timeStamp').onSnapshot(docs => {

            docs.forEach(doc => {
                listMessages.push(doc.data())
            })
            // console.log(listMessages);  

            dispatch({ type: 'GET_LIST_MESSAGES', payload: listMessages })
            scrollMessagesToBottom();

        })

    }
}

export function scrollMessagesToBottom() {
    const eleMessageBox = document.getElementById('msg_historyPainel');
    eleMessageBox.scrollTop = document.getElementById('msg_historyPainel').scrollHeight;
}
