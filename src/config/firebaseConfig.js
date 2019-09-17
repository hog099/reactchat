import firebase from 'firebase';
// const firebase = require('firebase')

var _config = {
    apiKey: "######",
    authDomain: "project-firebase.firebaseapp.com",
    databaseURL: "https://project-firebase.firebaseio.com",
    projectId: "project-firebase",
    storageBucket: "",
    messagingSenderId: "11111111111",
    appId: "1111111111111111"
};


let firebaseConfig = firebase.initializeApp(_config)
 
export default firebaseConfig
