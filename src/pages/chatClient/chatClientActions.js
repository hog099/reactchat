import { toastr } from 'react-redux-toastr'


export function EnterChat(values) {
    // console.log('rota', values)
    return dispatch => {
        const { name, nameSponsored } = values
     
                toastr.success('Bem-Vindo!') 
                dispatch({ type: 'CLIENT_ENTER_CHAT', payload: true })               
            

    }
}

