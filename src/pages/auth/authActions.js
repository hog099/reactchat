import { toastr } from 'react-redux-toastr'
import firebase from "../../config/firebaseConfig"



const userRef = firebase.firestore().collection('users');
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/


export function login(values) {
    // console.log(values)
    return dispatch => {
        const { email, password } = values

        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
            
            userRef.doc(email).get().then(snapshot => {
                const userDetails = snapshot.data();
                userDetails.password = undefined;

                toastr.success('Bem-Vindo!', 'Você está logado.')
                dispatch({ type: 'USER_FETCHED', payload: userDetails })
                // dispatch({ type: 'USER_DETAILS_FETCHED', payload: userDetails })

            });
            // userRef.doc(user.user.uid).get().then(response => {})


        }).catch(err => {
            // console.log('Erro ao logar', err)
            toastr.error('Error', 'Falha ao Logar, Tente Novamente.')

        })



    }
}


export function signup(values) {
    const { name, email, password } = values


    if (!email.match(emailRegex)) {
        toastr.error('Error!', 'O e-mail informado está inválido')
    }
      
    
    return dispatch => {

        userRef.doc(email).get().then(response => {
            // console.log(response.data())
            if (response.data() !== undefined) {
                toastr.error('Error!', 'Usuário já Registrado!')

            } else {
                

                firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
                    // console.log('usuario', user)
        
                    const userData = {
                        uid: user.user.uid,
                        name: name,
                        email: email,
                    }
        
                    // userRef.set(userData).then(()=>{                
                    userRef.doc(userData.email).set(userData).then(() => {
                        // return { message: "Usuário cadastrado com Sucesso!", result: true }
                        toastr.success('Sucesso!', 'Você está Registrado!')
                        
                        const values = {
                            email: email,
                            password: password
                        }
                        return this.login(values)
        
                    }).catch(err => {
                        toastr.warning('Error!', 'Erro ao Realizar Registro!')
                        return { message: "Usuário não Cadastrado!", result: false }

                    })
        
                }).catch(function (error) {
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    toastr.warning('Error!', 'Erro ao Realizar Registro!')
                    return { message: "Usuário não Cadastrado!", result: false }
                })




            }            
        }) // Fim do get user do BD



    } // Fim do Dispatch


}


export function logout() {
    firebase.auth().signOut()
    return { type: 'TOKEN_VALIDATED', payload: false }
}


export function userlogged(user) {
    return dispatch => {
        dispatch({ type: 'USER_ALREADY_LOGGED', payload: user })
    }
}


export function getUserDetails(userLogged) {
    return dispatch => {
        userRef.doc(userLogged.email).get().then(response => {
            const userDetails = response.data()
            userDetails.password = undefined;
            dispatch({ type: 'USER_DETAILS_FETCHED', payload: userDetails })
        })
    }
}





