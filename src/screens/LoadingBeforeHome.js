import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import {NavigationEvents} from 'react-navigation';

export default class LoadingBeforeHome extends Component {

    state = {
        firstName : '', lastName: '', email: '', photo: 'https://cdn1.iconfinder.com/data/icons/smashicons-interactions-flat-vol-6/59/360_-_Add_Profile_interaction_communication_interface-512.png'
    }




  componentDidMount() {
    
      
   
    
}


updateDataRealTime = ()=>{
    // setTimeout(() => {
    //     this.props.navigation.navigate('Home' , {firstName: this.state.firstName, lastName:this.state.lastName, email:this.state.email, photo:this.state.photo})
    //    }, 3000);
      
    // alert("Data updated")
    const { currentUser } = firebase.auth()
   
  
    // this.getAndLoadHttpUrl(currentUser.uid)
    
        // this.getAndLoadHttpUrl(currentUser.uid)
        firebase.database().ref(`/users/${currentUser.uid}/info`).child('photoUrl').once('value').then(snapshot => { 
          let imgUrl = snapshot.val()
          if (imgUrl === undefined || imgUrl === null || imgUrl === "" ) {
            firebase.database().ref('users/' + currentUser.uid + '/' + 'info').update({
              
              photoUrl: this.state.photo,
                      
              });
          
          }
          else{
            // alert(imgUrl)
            this.setState({photo: imgUrl})
           }         
          
        })
  
  
        firebase.database().ref('users/' + currentUser.uid + '/').once('value', function(snapshot) {
          let data = snapshot.val();
        
         
            let firstName = data.info.firstName
            let lastName = data.info.lastName
            let email = data.info.email
            // let photo = data.info.photoUrl
             this.setState({firstName, lastName, email});
          
         
        }.bind(this));
      }
      // alert("Component Did mount")
   
  
  
  



passDataToHome(){
    setTimeout(() => {
        this.props.navigation.navigate('Home' , {firstName: this.state.firstName, lastName:this.state.lastName, email:this.state.email, photo:this.state.photo})
       }, 3000)
}




      


   


  render() {
      const indicator = this.passDataToHome()

      
    
      
    
    return (
        
      <View style={styles.container}>
          {indicator}
         
          <NavigationEvents 
        onWillFocus={
          this.updateDataRealTime 
        }
      />
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