import { createSwitchNavigator } from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";

import WelcomePage from './pages/WelcomePage';
import PesquisaCnpjPage from './pages/PesquisaCnpjPage';
import EnderecoEmpresaPage from './pages/EnderecoEmpresaPage';

const AppNavigator = createSwitchNavigator(
	{
		WelcomePage: {
            screen: WelcomePage,
            path: 'welcome/',
            navigationOptions: {
                title: 'Welcome'
            }
		},
		PesquisaCnpjPage: {
            screen: PesquisaCnpjPage,
            path: 'pesquisacnpj/',
            navigationOptions: {
                title: 'Pesquisa CNPJ'
            }
		},
		EnderecoEmpresaPage: {
            screen: EnderecoEmpresaPage,
            path: 'enderecoempresa/',
			navigationOptions: ({navigation}) => {
                if (navigation.state.params) {
                    const { dadosEmpresa } = navigation.state.params;
                    return {
                        title: dadosEmpresa.nome
                    }
                }
                return {
                    title: 'Endereço'
                }
                
            }
            
		}
	}
  );

const AppContainer = createBrowserApp(AppNavigator);

export default AppContainer;