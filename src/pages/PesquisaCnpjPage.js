import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import FormRow from '../components/FormRow';
import Line from '../components/Line';
import { setPesquisaCnpj, setDadosEmpresa, setDadosEmpresaCep } from '../actions';
import { connect } from 'react-redux';

import axios from 'axios';


class PesquisaCnpjPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pesquisando: false
        }
    }

  /*  searchCnpj = async (cnpj) => {
        const { setDadosEmpresa, setDadosEmpresaCep } = this.props;

        this.setState({
            pesquisando: true
        })

        try {
            const response = await axios.get('https://www.receitaws.com.br/v1/cnpj/28036967000142')

            const { data } = response;
            const { cep } = data;
            const cepSemPontos = cep.replace(/[^\d]+/g,'');

            const dadosEmpresa = {
                nome: data.nome,
                fantasia: data.fantasia,
                situacao: data.situacao,
                bairro: data.bairro,
                logradouro: data.logradouro,
                numero: data.numero,
                cep: data.cep,
                municipio: data.municipio,
                uf: data.uf
            }

            setDadosEmpresa(dadosEmpresa)
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cepSemPontos}/json/`);

                const { data } = response;

                const dadosEmpresaCep = {
                    complemento: data.complemento,
                    ibge: data.ibge,
                    gia: data.gia
                }

                setDadosEmpresaCep(dadosEmpresaCep)
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log(e);
        }
    }
*/
    searchCnpj = (cnpj) => {
        const { setDadosEmpresa, setDadosEmpresaCep } = this.props;

        this.setState({
            pesquisando: true
        })

        axios.get('https://www.receitaws.com.br/v1/cnpj/28036967000142')
        .then(response => {
            const { data } = response;
            const { cep } = data;
            const cepSemPontos = cep.replace(/[^\d]+/g,'');

            const dadosEmpresaCnpj = {
                nome: data.nome,
                fantasia: data.fantasia,
                situacao: data.situacao,
                bairro: data.bairro,
                logradouro: data.logradouro,
                numero: data.numero,
                cep: data.cep,
                municipio: data.municipio,
                uf: data.uf
            }
            // GET NA API DE PESQUISA DE CEPS
            axios.get(`https://viacep.com.br/ws/${cepSemPontos}/json/`)
            .then(response => {
                const { data } = response;

                const dadosEmpresaCep = {
                    complemento: data.complemento,
                    ibge: data.ibge,
                    gia: data.gia
                }

                const dadosEmpresa = Object.assign(dadosEmpresaCnpj, dadosEmpresaCep)
                setDadosEmpresa(dadosEmpresa)
            }).catch(e => console.log(e))
        }).catch(e=> console.log(e))
    }

    render() {
        const { pesquisaCnpj, setPesquisaCnpj, dadosEmpresa } = this.props;

        console.log(dadosEmpresa)
        return (
        <View style={ styles.container }>
            <FormRow>
                <TextInput
                    style={ styles.input }
                    keyboardType='numeric'
                    value={ pesquisaCnpj }
                    placeholder="Insira o CNPJ"
                    onChangeText={ value => { setPesquisaCnpj(value); } }
                />
            </FormRow>
            <Button
                title="Pesquisar"
                onPress={ () => { this.searchCnpj(pesquisaCnpj) } }
            />
            { 
                dadosEmpresa.nome
                ?   
                    <View>
                        <View style={{ marginTop: 20, marginBottom: 20 }}>
                            <Line label="Nome da Empresa:" content={ dadosEmpresa.nome }/>
                            <Line label="Fantasia:" content={ dadosEmpresa.fantasia }/>
                            <Line label="Situação:" content={ dadosEmpresa.situacao }/>
                            
                        </View>
                        <Button title="Ver endereço" onPress={ () => this.props.navigation.navigate('EnderecoEmpresaPage', { dadosEmpresa: dadosEmpresa }) }/>
                    </View>
                : this.state.pesquisando === false
                ? null
                : <ActivityIndicator size="large" color="#00ff00" />
            }
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
})

const mapStateToProps = state => {
    return {
        pesquisaCnpj: state.PesquisaCnpj,
        dadosEmpresa: state.DadosEmpresa
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        setPesquisaCnpj: (cnpj) => dispatch(setPesquisaCnpj(cnpj)),
        setDadosEmpresa: dados => dispatch(setDadosEmpresa(dados)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(PesquisaCnpjPage);