import React from 'react';
import { StyleSheet, Platform, Image, View , WebView} from 'react-native';
import {Tabs,Tab,TabHeading, Segment,Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';






export default class WebViewFB extends React.Component {
 
      
     state={fbuserId: ''}


  static navigationOptions = { header: null };

componentDidMount(){
  var fbuserId = this.props.navigation.getParam('fbuserId')
  this.setState({fbuserId: fbuserId})
  alert('https://www.facebook.com/'+this.state.fbuserId)
}

render() {

    
  return (
    
    <WebView
    //html: '<iframe width="100%" height="50%" src="https://www.facebook.com/embed/" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    source={{uri: 'https://www.facebook.com/'+this.state.fbuserId}}
    // style={{marginTop: 20}}
 />
    )
  }
}
