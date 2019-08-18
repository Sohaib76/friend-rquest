import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View} from 'react-native';
import firebase from 'react-native-firebase';
import styles from './style'
import {Button} from 'native-base'

export default class Login extends Component {
  state = { email: '', password: '', errorMessage: null }
 handleLogin = () => {
  if(this.state.email === '' || this.state.password === ''){
    alert("Please enter your details")
  }

  else{
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Home'))
    .catch(error => this.setState({ errorMessage: error.message }))
    
  }
   
 }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText ={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText ={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button style={{backgroundColor:"#e93766",margin:30}} block onPress ={this.handleLogin} >
              <Text style={{color:'white'}}>Login</Text>
          </Button>
        <View>
        <Text> Don't have an account? <Text onPress ={() => this.props.navigation.navigate('SignUp')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>
    )
  }
}