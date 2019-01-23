import  { createAppContainer, createStackNavigator } from 'react-navigation'
import WelcomePage from './pages/WelcomePage';
import PesquisaCnpjPage from './pages/PesquisaCnpjPage';
import EnderecoEmpresaPage from './pages/EnderecoEmpresaPage';

const AppNavigator = createStackNavigator(
	{
		WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null
            }
		},
		PesquisaCnpjPage: {
			screen: PesquisaCnpjPage
		},
		EnderecoEmpresaPage: {
			screen: EnderecoEmpresaPage,
			navigationOptions: ({ navigation }) => {
				const { dadosEmpresa } = navigation.state.params;

				return {
					title: dadosEmpresa.nome
				}
			}
		}
	},
	{
		defaultNavigationOptions: {
			title: 'Pesquisa CNPJ',
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ca2f7',
				borderBottomWidth: 1,
				borderBottomColor: '#C5C5C5'
			},
			headerTitleStyle: {
				color: 'white',
				fontSize: 30
			}
		}
	}
	
  );

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;