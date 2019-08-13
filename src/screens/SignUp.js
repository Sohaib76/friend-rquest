import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity  } from 'react-native'
import firebase from 'react-native-firebase';
import styles from './style'
import {Button} from 'native-base'
import { LoginButton, AccessToken } from 'react-native-fbsdk';


var config = {
    databaseURL: "https://friendrequest-a67aa.firebaseio.com/",
    projectId: "friendrequest-a67aa",
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default class signUp extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', errorMessage: null, }
  }
  
  handleSignUp () {
    firebase
    
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
      
    
    
  }

   
  

render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40}}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText= {password => this.setState({ password })}
          value={this.state.password}
        />
        {/* <Button 
        title="Sign Up" color="#e93766" onPress={this.handleSignUp}/> */}
          <Button style={{backgroundColor:"#e93766",margin:30}} block onPress ={this.handleSignUp.bind(this,this.state.email)} >
              <Text style={{color:'white'}}>SignUp</Text>
          </Button>
           <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
        <View>
        <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{color:'#e93766', fontSize: 18}}> Login </Text></Text>
        </View>
      </View>
    )
  }
}