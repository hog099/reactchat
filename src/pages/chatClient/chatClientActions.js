import { toastr } from 'react-redux-toastr'


export function EnterChat(values) {
    // console.log(values)
    return dispatch => {
        const { name, nameSponsored } = values

                toastr.success('Bem-Vindo!', 'Você está logado.')
                
            

    }
}