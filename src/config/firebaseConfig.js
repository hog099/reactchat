import firebase from 'firebase';
// const firebase = require('firebase')

var _config = {
    apiKey: "AIzaSyBM9z6ZCIKKM1mkS8lxVH-dHQiyJIio8eM",
    authDomain: "reactchat-7d437.firebaseapp.com",
    databaseURL: "https://reactchat-7d437.firebaseio.com",
    projectId: "reactchat-7d437",
    storageBucket: "",
    messagingSenderId: "776041580344",
    appId: "1:776041580344:web:2755fbb0218e0f28a7e3cd"
};


let firebaseConfig = firebase.initializeApp(_config)
 
export default firebaseConfig