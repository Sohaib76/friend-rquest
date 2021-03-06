import React from 'react';
import { TouchableOpacity,StyleSheet, Platform, Image, View } from 'react-native';
import {Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';






export default class UsersCard extends React.Component {
  state = { email: '', password: '', errorMessage: null }


 
render() {

    
  return (
    <TouchableNativeFeedback onPress={()=>{this.props.navigation.navigate("ProfileOtherUsers", {showIdPopup:this.props.showIdPopup, username:this.props.userName, userPhoto:this.props.userPhoto, fbuserId:this.props.fbuserId , fbButtonDisable: this.props.fbButtonDisable} )}}>
          <Card>
              <CardItem bordered>
              <Left>
                <Thumbnail source={{uri: this.props.userPhoto}} />
                {/* 'http://2ap93t1x1l6e2f6gfo3ag4vw.wpengine.netdna-cdn.com/wp-content/uploads/2017/03/harry-768x576.jpg' */}
                <Body>
                  <Text>{this.props.userName}</Text>
                  <Text style={{fontSize: 10}}>{this.props.userEmail}</Text>
                </Body>
              </Left>
                
                <Right>
                  <Button dark rounded onPress={()=>{this.props.navigation.navigate("ProfileOtherUsers", {showIdPopup:this.props.showIdPopup,username:this.props.userName, userPhoto:this.props.userPhoto, fbuserId:this.props.fbuserId, fbButtonDisable: this.props.fbButtonDisable} )}}>
                    <Icon name='md-arrow-dropright' />
                  </Button>
                 
                </Right>
             
            </CardItem>
            {/* <CardItem footer>
             <Right/>
                <Button rounded onPress={this.props.fbrequest}>
                    <Icon name='logo-facebook' />
                  </Button>
               <Right/>
                
                  <Button rounded info >
                    <Icon name='logo-twitter' />
                  </Button>
                
                <Right/>
                  <Button rounded danger >
                    <Icon name='logo-instagram' />
                  </Button>
                  <Left/>
              
                  
            </CardItem> */}
            
           </Card>
          </TouchableNativeFeedback>

    )
  }
}
