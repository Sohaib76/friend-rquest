import React from 'react';
import { StyleSheet, Platform, Image, View } from 'react-native';
import {Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';
import firebase from 'react-native-firebase'
import AntDesign from 'react-native-vector-icons';
import UsersCard from '../components/UsersCard'
import { SearchBar } from 'react-native-elements';





export default class SearchScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null,search: '', }



 updateSearch = search => {
    this.setState({ search });
  };
  


  static navigationOptions = { header: null };
render() {
    const { currentUser } = this.state
    const navigation = this.props.navigation;

    FBfriendRequest = () => {
        alert("Your Friend Request Has Been Sent")
    }

  return (
    <Container >
    
         <Header style={{backgroundColor:'#e93766'}}>
            <Left>
                <Button bage transparent 
                    onPress={() => {
                        this.props.navigation.openDrawer();
                    }}
                >
                    <Icon name="menu" />
                </Button>
            </Left>
            <Body>
                <Title>Search</Title>
            </Body>
            <Right>
                <Button badge transparent active 
                  onPress={()=> {
                    this.props.navigation.navigate("Home")
                  }}
                >
                    <Icon name="home" />
                </Button>
            </Right>
    
        </Header>
        <Content>
            <SearchBar
                containerStyle = {{backgroundColor:'white'}}
                placeholder="Type a User Name..."
                onChangeText={this.updateSearch}
                value={this.state.search}
            />
        
           <UsersCard fbrequest={this.FBfriendRequest}
            navigation={navigation} otherUserProfile={'ProfileOtherUsers'}/>
            <UsersCard fbrequest={this.FBfriendRequest}
            navigation={navigation} otherUserProfile={'ProfileOtherUsers'}/>
            <UsersCard fbrequest={this.FBfriendRequest}
            navigation={navigation} otherUserProfile={'ProfileOtherUsers'}/>
            <UsersCard fbrequest={this.FBfriendRequest}
            navigation={navigation} otherUserProfile={'ProfileOtherUsers'}/>
            <UsersCard fbrequest={this.FBfriendRequest}
            navigation={navigation} otherUserProfile={'ProfileOtherUsers'}/>
        
        </Content>
    </Container>
    )
  }
}
