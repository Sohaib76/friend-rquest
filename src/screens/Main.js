import React, { Component } from 'react';
import { Container, Badge, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { createDrawerNavigator ,createStackNavigator, createAppContainer , DrawerItems} from 'react-navigation'
import Home from './Home.js'
import {StatusBar,View} from 'react-native';
import SearchScreen from './SearchScreen.js';
import ProfileOtherUsers from './ProfileOtherUsers.js'
import WebViewFB from './WebViewFB';

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
      initialRouteName: 'Home'
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
  drawerOpenRoute:'DrawerOpen',
  drawerCloseRoute:'DrawerClose',
  drawerToggleRoute:'DrawerToggle',
//   drawerBackgroundColor: "transparent ",
//   opacity:"00FFFFF",
  mode: 'modal',
  headerMode: 'none',
  }
  ))