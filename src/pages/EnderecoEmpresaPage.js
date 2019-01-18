import React from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Line from '../components/Line';
import Axios from 'axios';

class EnderecoEmpresaPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textoDistancia: '',
            calculando: false
        }
    }

    appId = "SykaiOeMJWQGdY2FaX3D";
    appCode = "OmXP7vpr1TC3IicHRsjCFQ";

    pegarCoordenadasLocais = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                const { coords } = position;
                const waypoint0 = coords.latitude.toFixed(2) + ',' + coords.longitude.toFixed(2);
                console.log('waypoint0', waypoint0)
                resolve(waypoint0);
            })
        })
    }

    verDistancia = (rua, numero, cidade, uf) => {
        this.setState({
            calculando: true
        })
        //BUSCANDO GEOLOCALIZAÇÃO LOCAL
        this.pegarCoordenadasLocais().then((waypoint0) => {
            rua = rua.replace(' ', '+');
            cidade = cidade.replace(' ', '+');

            // BUSCANDO GEOLOCALIZAÇÃO DA EMPRESA
            Axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=${this.appId
                }&app_code=${this.appCode
                }&searchtext=${rua}+${numero}+${cidade}+${uf}`
            ).then(response => {
                const { DisplayPosition } = response.data.Response.View[0].Result[0].Location;
                const waypoint1 = DisplayPosition.Latitude.toFixed(2) + ',' + DisplayPosition.Longitude.toFixed(2);

                //CALCULANDO DISTÂNCIA
                Axios.get(`https://route.api.here.com/routing/7.2/calculateroute.json?app_id=${this.appId
                    }&app_code=${this.appCode
                    }&waypoint0=geo!${waypoint0}&waypoint1=geo!${waypoint1}&mode=fastest;car;traffic:disabled&language=pt-br`)
                    .then(response => {
                        const { distance } = response.data.response.route[0].summary;
                        const km = distance / 1000;

                        this.setState({
                            textoDistancia: 'A distância é de ' + km + ' km',
                            calculando: false
                        })
                    }).catch(e => console.log(e))

            }).catch(e => console.log(e))
        })
    }

    render() {
        const { dadosEmpresa } = this.props;
        return (
            <View style={styles.container}>
                <Line label="Rua:" content={dadosEmpresa.logradouro} />
                <Line label="Número:" content={dadosEmpresa.numero} />
                <Line label="Bairro:" content={dadosEmpresa.bairro} />
                <Line label="Cidade:" content={dadosEmpresa.municipio} />
                <Line label="UF:" content={dadosEmpresa.uf} />

                <View style={styles.session}>
                    <Text style={{ fontSize: 20, padding: 10 }}>Dados da Busca pelo CEP</Text>
                </View>

                <Line label="Complemento:" content={dadosEmpresa.complemento} />
                <Line label="IBGE:" content={dadosEmpresa.ibge} />
                <Line label="Gia:" content={dadosEmpresa.gia} />

                <View>
                    <Button
                        title="Ver distância"
                        onPress={() => this.verDistancia(
                            dadosEmpresa.logradouro,
                            dadosEmpresa.numero,
                            dadosEmpresa.municipio,
                            dadosEmpresa.uf
                        )}
                        disabled={this.state.calculando === true ? true : false}
                    />

                    {this.state.calculando
                        ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                            <ActivityIndicator size="large" color="#00ff00" />
                            <Text>Calculando...</Text>
                        </View>
                        : <Text style={{ padding: 10, fontSize: 20 }}>{this.state.textoDistancia}</Text>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    session: {
        height: 50,
        backgroundColor: '#C5C5C5',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        dadosEmpresa: state.DadosEmpresa
    }
}

export default connect(mapStateToProps, null)(EnderecoEmpresaPage);