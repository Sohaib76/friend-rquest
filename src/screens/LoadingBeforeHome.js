import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class LoadingBeforeHome extends Component {
  componentDidMount() {
    setTimeout(() => {
        this.props.navigation.navigate('Home')
       }, 3000);
      
    
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color='#e93766' size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});