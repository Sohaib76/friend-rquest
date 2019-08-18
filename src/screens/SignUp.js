import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity  } from 'react-native'
import firebase from 'react-native-firebase';
import styles from './style'
import {Button} from 'native-base'
import { LoginButton, AccessToken ,GraphRequest,
  GraphRequestManager,} from 'react-native-fbsdk';


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
    this.state = { email: '', password: '', errorMessage: null, firstName:'', lastName:''}
  }
  
  // handleSignUp () {
  //   firebase
    
  //     .auth()
  //     .createUserWithEmailAndPassword(this.state.email, this.state.password)
  //     .then(() => this.props.navigation.navigate('Home'))
  //     .catch(error => this.setState({ errorMessage: error.message }))
         
  // }

  handleSignUp () {
    if(this.state.email === '' || this.state.password === '' || this.state.firstName === '', this.state.lastName === ''){
      alert("Please enter your details")
    }
    else{
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
          firebase.database().ref('users/' + res.user.uid + '/').set({
            info: {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email : this.state.email,
              fbButtonDisable: true
              // photoUrl : ''

              
             
            },
             
          })
      })
    .catch(error => this.setState({ errorMessage: error.message }))
    this.props.navigation.navigate('Home')
     
    }
    
     
  }

  

  // get_Response_Info = (error, result) => {
  //   if (error) {
  //     //Alert for the Error
  //     Alert.alert('Error fetching data: ' + error.toString());
  //   } else {
  //     //response alert
  //     alert(JSON.stringify(result));
  //     this.setState({ fbuser_name: result.name });
  //     this.setState({ fbtoken: result.id });
  //     this.setState({ fbprofile_pic: result.picture.data.url });
  //     this.setState({ fbemail: result.email });
      

  //     //third_party_id
      

  //     // firebase.auth().onAuthStateChanged(user => {
  //     //   if(user) {
  //     //     this.writeUserFBData(this.state.fbuser_name,this.state.fbemail,this.state.fbuser_Name,this.state.fbprofile_pic);
          
          
  //     //   }
  //     // })

  //   }
  //   this.props.navigation.navigate('Home')
  // }
   


  // writeUserFBData(fbuserId, fbemail, fbuserName, fbphotoUrl) {
  //   firebase.database().ref('users/' + fbuserId + '/').set({
  //       info: {
  //         fbuserName: fbuserName,
  //         fbemail: fbemail,
  //         fbphotoUrl: fbphotoUrl
  //       },
      
  //   });
  //   }

   
  

render() {
    return (
      <View style={styles.container}>
      <Text style={{color:'#e93766', fontSize: 40,margin:15}}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

          <TextInput
          placeholder="First Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />

        <TextInput
          placeholder="Last Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
        />
        
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
          {/* <Button style={{marginLeft:40,marginRight:40,margin:10,backgroundColor:'#1752ad'}}>
              <LoginButton 
              readPermissions={['public_profile']}
              onLoginFinished={(error, result) => {
                if (error) {
                  alert(error);
                  alert('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  alert('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    alert(data.accessToken.toString());
    
                    const processRequest = new GraphRequest(
                      '/me?fields=id,first_name,last_name,name,picture.type(large),email,gender',
                      null,
                      this.get_Response_Info
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(processRequest).start();
                  });
                }
              }}
              onLogoutFinished={this.onLogout}
            />
          </Button> */}
        
        <View>
        <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{color:'#e93766', fontSize: 18}}> Login </Text></Text>
        </View>
      </View>
    )
  }
}