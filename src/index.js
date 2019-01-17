import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './PesquisaCnpjApp';


//ReactDOM.render(<App />, document.getElementById('root'));

import { AppRegistry } from 'react-native';


const rootTag = document.getElementById('root');

AppRegistry.registerComponent('UniversalReactNative', () => App);
AppRegistry.runApplication('UniversalReactNative', { rootTag });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
