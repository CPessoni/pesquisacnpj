import React from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomePage = props => {
    const containerStyle = {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const imgStyle = {
            width: 255,
    }

    return (
        <div style={ containerStyle }>
            <div>
                <View style={ styles.content }>
                    <img
                        alt="Pesquisa CNPJ"
                        src={ require('../images/search.png') }
                        style={ imgStyle }
                    />

                    <Text style={ styles.welcomeText }>Seja bem vindo ao App de Pesquisa de CNPJ!</Text>
                    
                </View>
                <View style={ styles.footer }>
                    <Button
                        title="Continuar..."
                        onPress={ () => {
                            props.navigation.navigate('PesquisaCnpjPage') 
                        } }
                        clear
                    />
                </View>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 15
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
})

export default WelcomePage;