import React, { Component } from 'react';
import { Container, Badge, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { createDrawerNavigator ,createStackNavigator, createAppContainer , DrawerItems} from 'react-navigation'
import Home from './Home.js'
import {StatusBar,View} from 'react-native';
import SearchScreen from './SearchScreen.js';
import ProfileOtherUsers from './ProfileOtherUsers.js'
// import Logout from '../components/Logout'
import WebViewFB from './WebViewFB';
import LoadingBeforeHome from './LoadingBeforeHome.js';

export default class Main extends Component {

    static navigationOptions = { header: null };
    render() {
      return (
        <View style={{flex:1}}> 
          
          <MyApp />
        </View>
          
      );
    }
  }








  export const MyHomeStack = createStackNavigator(
    {
      LoadingBeforeHome:{
        screen: LoadingBeforeHome,
      },
      Home: {
        screen:Home,
        navigationOptions: {
         
        },
      },
      SearchScreen: {
          screen:SearchScreen
      },
      ProfileOtherUsers: {
          screen: ProfileOtherUsers
      },
      WebViewFB: {
        screen : WebViewFB
      }
  
    }, 
    
    {
      initialRouteName: 'LoadingBeforeHome'
    }
)
      
  

const MyApp = createAppContainer(createDrawerNavigator(
    {
      Home: {
        screen:MyHomeStack,
        navigationOptions: {
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" size={24} style={{ color: tintColor }} />
          ),
        },
      },
      Search: {
        screen:SearchScreen,
        navigationOptions: {
          drawerLabel: 'Search',
          drawerIcon: ({ tintColor }) => (
            <Icon name="search" size={24} style={{ color: tintColor }} />
          ),
        },
      },
      // Logout: {
      //   screen:Logout,
      //   navigationOptions: {
      //     drawerLabel: 'Logout',
      //     drawerIcon: ({ tintColor }) => (
      //       <Icon name="search" size={24} style={{ color: tintColor }} />
      //     ),
      //   },
      // },
      // Home: {
      //   screen:MyHomeStack,
      //   navigationOptions: {
      //     drawerLabel: 'Home',
      //     drawerIcon: ({ tintColor }) => (
      //       <Icon name="home" size={24} style={{ color: tintColor }} />
      //     ),
      //   },
      // },
      
      
    },

    {
    //   contentComponent:CustomDrawerContentComponent,
  hideStatusBar: true,
  drawerOpenRoute:'DrawerOpen',
  drawerCloseRoute:'DrawerClose',
  drawerToggleRoute:'DrawerToggle',
//   drawerBackgroundColor: "transparent ",
//   opacity:"00FFFFF",
  mode: 'modal',
  headerMode: 'none',
  }
  ))