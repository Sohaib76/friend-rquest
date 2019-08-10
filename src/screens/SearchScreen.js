import React from 'react';
import { StyleSheet, Platform, Image, View } from 'react-native';
import {Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';
import firebase from 'react-native-firebase'
import AntDesign from 'react-native-vector-icons';
import UsersCard from '../components/UsersCard'
import { SearchBar } from 'react-native-elements';






export default class SearchScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null,search: '',  tempData: [] , userName:'User '}



 updateSearch = search => {
    this.setState({ search });
  };

  componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.readUserData(user.uid, user.email, this.state.userName);
            }
        })
        
   
}

 readUserData(userId, email, userName) {
    firebase.database().ref('users/').once('value', function(snapshot) {
        let data = snapshot.val();
        for(let i in data) {
            this.state.tempData.push(data[i]);
        }
        this.setState({tempData: this.state.tempData,});
            
    }.bind(this));
}
    

  

  static navigationOptions = { header: null };
render() {
    const { currentUser } = firebase.auth()
    const navigation = this.props.navigation;

    

   
    

      
      /** Comments for help in firebase*/

    // const userId = this.state.tempData
    // alert(JSON.stringify(userId))

    //     user.providerData.forEach(function (profile) {
    //     alert("Sign-in provider: " + profile.providerId);
    //     alert("  Provider-specific UID: " + profile.uid);
    //     alert("  Name: " + profile.displayName);
    //     alert("  Email: " + profile.email);
    //     alert("  Photo URL: " + profile.photoURL);
    //   });


    /**  Comments for retreiving specific User data */
    // firebase.database().ref('users/' + userId + '/').once('value', function(snapshot) {
    //     let data = snapshot.val();
    //     for(let i in data) {
    //         this.state.tempData.push(data[i]);
    //     }
    //     this.setState({tempData: this.state.tempData, email: email, userName: userName});
            
    // }.bind(this));

    //  const usersList = Object.keys(this.state.tempData).map((d, key) => {
    //        return  <Text key={key}> {this.state.tempData[d].email} </Text>
    // })
   




    

    
    const usersList = Object.keys(this.state.tempData).map((d, key) => {
           return  <UsersCard key={key} userName={this.state.tempData[d].info.userName} userEmail={this.state.tempData[d].info.email}
            navigation={navigation} otherUserProfile={'ProfileOtherUsers'}/>
    })

    


  



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

            
            
            {usersList}
        

        </Content>
    </Container>
    )
  }
}
