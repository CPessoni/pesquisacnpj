import { combineReducers } from 'redux';
import PesquisaCnpjReducer from './PesquisaCnpjReducer';
import DadosEmpresaReducer from './DadosEmpresaReducer';

export default combineReducers({
    PesquisaCnpj: PesquisaCnpjReducer,
    DadosEmpresa: DadosEmpresaReducer
});