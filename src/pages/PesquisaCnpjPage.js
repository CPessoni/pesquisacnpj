import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import FormRow from '../components/FormRow';
import Line from '../components/Line';
import { setPesquisaCnpj, setDadosEmpresa } from '../actions';
import { connect } from 'react-redux';

import axios from 'axios';


class PesquisaCnpjPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            temDadosEmpresa: false,
            pesquisando: false,
            messageError: ''
        }
    }

    searchCnpj = (cnpj) => {
        const { setDadosEmpresa, pesquisaCnpj } = this.props;

        this.setState({
            pesquisando: true,
            temDadosEmpresa: false
        })

        console.log(pesquisaCnpj)

        axios.get(`https://www.receitaws.com.br/v1/cnpj/${pesquisaCnpj}`)
            .then(response => {
                const { data } = response;
                if (data.status == "ERROR") {
                    this.setState({
                        pesquisando: false,
                        messageError: 'Erro do servidor: ' + data.message
                    })
                    return false;
                }

                const { cep } = data;
                const cepSemPontos = cep.replace(/[^\d]+/g, '');

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

                        this.setState({
                            pesquisando: false,
                            temDadosEmpresa: true
                        })
                    }).catch(e => {
                        this.setState({
                            pesquisando: false,
                            messageError: 'Erro no servidor de busca: ' + e
                        })
                        console.log(e)
                    })
            }).catch(e => {
                this.setState({
                    pesquisando: false,
                    messageError: 'Erro no servidor de busca: ' + e
                });
                console.log(e);
            })
    }

    render() {
        const { pesquisaCnpj, setPesquisaCnpj, dadosEmpresa } = this.props;

        console.log(pesquisaCnpj)

        return (
            <View style={styles.container}>
                <FormRow>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={pesquisaCnpj}
                        placeholder="Insira o CNPJ"
                        onChangeText={value => { setPesquisaCnpj(value); }}
                    />
                </FormRow>
                <Button
                    title="Pesquisar"
                    onPress={() => { this.searchCnpj(pesquisaCnpj) }}
                    disabled={this.state.pesquisando === true ? true : false}
                />

                {
                    this.state.temDadosEmpresa
                        ?
                        <View>
                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                                <Line label="Nome da Empresa:" content={dadosEmpresa.nome} />
                                <Line label="Fantasia:" content={dadosEmpresa.fantasia} />
                                <Line label="Situação:" content={dadosEmpresa.situacao} />

                            </View>

                            <TouchableOpacity
                                style={styles.buttonOpacity}
                                onPress={() => this.props.navigation.navigate('EnderecoEmpresaPage', { dadosEmpresa: dadosEmpresa })}
                            >
                                <Text style={styles.buttonOpacityText}> Ver endereço </Text>
                            </TouchableOpacity>

                        </View>
                        : this.state.pesquisando === false
                            ? this.state.messageError === ''
                                ? null
                                : <Text>{this.state.messageError}</Text>
                            : <ActivityIndicator size="large" color="#00ff00" />
                }

            </View>
        )
    }
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
    buttonOpacity: {
        alignItems: 'center',
        //backgroundColor: '#DDDDDD',
        padding: 10,
    },
    buttonOpacityText: {
        color: 'blue'
    }
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