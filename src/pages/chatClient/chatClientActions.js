import { toastr } from 'react-redux-toastr'

import firebase from '../../config/firebaseConfig';

const chatRef = firebase.firestore().collection('/chats');

export function EnterChat(values) {
    // console.log('rota', values)
    return dispatch => {
        const { name, nameSponsored } = values
       
        createChat(name, nameSponsored).then(chat =>{
            // console.log('chat n action',chat);
            toastr.success('Bem-Vindo!')
            dispatch({ type: 'CLIENT_ENTER_CHAT', payload: true, chatData: chat })
        });



    }
}

function createChat(name, nameSponsored) {
    return new Promise((s, f) => {
        chatRef.add({ 
            status: 'aberto', 
            name: name, 
            nameSponsored: nameSponsored, 
            agent: '',
            timestamp: new Date() 
        }).then(doc => {
            chatRef.doc(doc.id).get().then(chat => {
                // console.log(chat.data());
                const chatData = {
                    id: doc.id,
                    status: chat.data().status,
                    name: chat.data().name,
                    nameSponsored: chat.data().nameSponsored
                }

               s(chatData);
            }).catch(err => { 
                toastr.error('Erro ao Abrir Atendimento');
            });
        }).catch(err => { 
            toastr.error('Erro ao Abrir Atendimento');
        });  

    });

}


export function setChatData(chatId){
    
    return dispatch => {
       
        chatRef.doc(chatId).get().then(chat => {
            // console.log(chat.data());
            const chatData = {
                id: chatId,
                status: chat.data().status,
                name: chat.data().name,
                nameSponsored: chat.data().nameSponsored
            }

            dispatch({ type: 'GET_CHAT_DETAILS', payload: chatData })

           
        }).catch(err => { 
            toastr.error('Erro ao Abrir Atendimento');
        });


    }

}


export function sendChatMessage(chatFrom, chatTo, content) {
   
    
    return dispatch => {

        if(content !== ''){
        // Adicionar mensagem no banco
        chatRef.doc(chatFrom.id).collection('messages').add({
            content,
            timeStamp: new Date(),
            type: 'text',
            from: chatFrom.name,
            to: chatTo,
        });

        document.getElementById('inputChatClient').value = '';

    }
        
       

    }
}


export function messagesList(chatId) {
   
    
    return dispatch => {
        // Adicionar mensagem no banco
        chatRef.doc(chatId).collection('messages').orderBy('timeStamp').onSnapshot(docs =>{
            // console.log('docs',docs);  
            
            const listMessages = [];
            docs.forEach(doc=>{
                listMessages.push(doc.data())
            })
            // console.log(listMessages);  

            dispatch({ type: 'GET_LIST_MESSAGES', payload: listMessages })
            scrollMessagesToBottom();
        })

    }
}

export function scrollMessagesToBottom() {
    const eleMessageBox = document.getElementById('msg_history');
    if(eleMessageBox){
        eleMessageBox.scrollTop = document.getElementById('msg_history').scrollHeight;
    }
}



export function finalizarChatClient(chatId){

    return dispatch => {

        // Adicionar mensagem no banco
        chatRef.doc(chatId).update({
            status: 'finalizado'
        });

        dispatch({ type: 'CHAT_FINISHED', payload: true })

    }

}



export function checkStatusChat(chatId){

    return dispatch => {

        chatRef.doc(chatId).get().then(chat => {
           
            if(chat.data().status === 'finalizado'){
                dispatch({ type: 'GET_CHAT_STATUS', payload: true })                
            }
           
        });


    }

}

