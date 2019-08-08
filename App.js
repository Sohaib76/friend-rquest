import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from './src/screens/SignUp.js';
import Home from './src/screens/Home';
import Loading from './src/screens/Loading'
import Login from './src/screens/Login'
import Main from './src/screens/Main'




const AppNavigator = createStackNavigator(
	{
    Loading,
    SignUp,
    Login,
    Main
	},
	{
		initialRouteName: 'Loading'
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
	render() {
		return <AppContainer/>
	}
}