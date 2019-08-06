import React from 'react';
import { StyleSheet, Platform, Image, Text, View,Button } from 'react-native';
import firebase from 'react-native-firebase'


export default class Home extends React.Component {
  state = { email: '', password: '', errorMessage: null }

componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}

handleLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => this.props.navigation.navigate('SignUp'))
    .catch(error => this.setState({ errorMessage: error.message }))
}

render() {
    const { currentUser } = this.state
  return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Hi<Text style={{color:'#e93766', fontSize: 20}}> 
          {currentUser && currentUser.email}!
        </Text></Text>
        <Button title="Logout" color="#e93766" onPress ={this.handleLogout} />
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})