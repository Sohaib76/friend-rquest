import firebase from 'react-native-firebase'
import React from 'react';

export const Logout = async () => {
    try {
        await firebase.auth().signOut()
        .then(() => this.props.navigation.navigate('Loading'))
       
    } catch (e) {
        console.log(e);
    }
  }