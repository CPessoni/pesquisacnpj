import { SET_DADOS_EMPRESA } from '../actions';

const DadosCnpjEmpresaReducer = (state={}, action) => {
    switch(action.type) {
        case SET_DADOS_EMPRESA:
            return action.dados;
        
        default:
            return state
    }
}

export default DadosCnpjEmpresaReducer;