import { SET_PESQUISA_CNPJ } from '../actions';


const PesquisaCnpjReducer = (state='', action) => {
    switch(action.type) {
        case SET_PESQUISA_CNPJ:
            return action.cnpj
        default:
            return state;
    }
}

export default PesquisaCnpjReducer;