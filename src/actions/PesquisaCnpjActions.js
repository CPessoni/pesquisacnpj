export const SET_PESQUISA_CNPJ = 'SET_PESQUISA_CNPJ';
export const setPesquisaCnpj = cnpj => {
    return ({
        type: SET_PESQUISA_CNPJ,
        cnpj
    })
}