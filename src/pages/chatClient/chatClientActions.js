import { toastr } from 'react-redux-toastr'


export function EnterChat(values) {
    // console.log('rota', values)
    return dispatch => {
        const { name, nameSponsored } = values
     
                toastr.success('Bem-Vindo!', 'Você está logado.') 
                dispatch({ type: 'CLIENT_ENTER_CHAT', payload: true })               
            

    }
}