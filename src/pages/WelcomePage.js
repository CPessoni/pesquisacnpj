import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const WelcomePage = props => {
    return (
        <View style={ styles.container }>
            <View style={ styles.content }>
                <Image
                    source={ require('../images/search.png') }
                    style={ {aspectRatio: 1, width: 255} }
                />
                <Text style={ styles.welcomeText }>Seja bem vindo ao App de Pesquisa de CNPJ!</Text>

                
            </View>
            <View style={ styles.footer }>
                <Button
                    title="Continuar..."
                    onPress={ () => props.navigation.replace('PesquisaCnpjPage') }
                    clear
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
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
    }
})

export default WelcomePage;