import React from 'react';
import { StyleSheet, Platform,  View ,Image} from 'react-native';
import {Subtitle,Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';
import firebase from 'react-native-firebase'
import AntDesign from 'react-native-vector-icons';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AccessToken, LoginManager ,GraphRequest,
  GraphRequestManager,} from 'react-native-fbsdk';
import {Overlay,Input} from 'react-native-elements';





export default class Home extends React.Component {
  state = { userName:'User 101' , address: '124 NewBolston' ,contact:'+363467444', mounted: true,
  email: '', password: '', errorMessage: null, photo: 'https://cdn2.iconfinder.com/data/icons/picons-essentials/71/user_add-512.png', 
  isVisible:false , id:'', userAppId: ''
}






  async facebookLogin() {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request'); 
        // alert("Login Denied")
      }
  
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken() 
   
      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      // this.setState({fbtoken : data.accessToken})
  
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    } catch (e) {
      console.error(e);
    }
    this.setState({isVisible:false})
    firebase.auth().onAuthStateChanged(user => {
    if(user) {
     
      // this.updateUserData(user.providerData[0].uid, user.email, user.displayName,user.photoURL);
      this.writeUserData(user.uid, this.state.email, this.state.firstName,this.state.lastName,this.state.photo);
      // this.setState({ isVisible:true})
     
  }
  })
  }
  

   writeUserData(userId, email, firstName,lastName, photoUrl) {
    firebase.database().ref('users/' + userId + '/').update({
        fb: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          photoUrl: photoUrl,
          
         
        },
      
    });
    }



  // updateUserData(fbuserId,fbuserEmail,fbuserName,fbphototUrl){
  //   firebase.database().ref('users/' + this.state.olduserId + '/' + 'info').update({
      
        
  //         userName: fbuserName,
  //         email: fbuserEmail,
  //         photoUrl: fbphototUrl,
  //         fbuserId: fbuserId 
  // });
  // }



componentWillMount () {

  const { currentUser } = firebase.auth()

  var email = currentUser.email;
  var emailSplitted = email.substr(0, email.indexOf('@'));
  var emailSplittedCapt = emailSplitted.charAt(0).toUpperCase() + emailSplitted.slice(1)

  

  // alert("Component Will mount")
  
 
    // this.setState({ currentUser ,Name:emailSplittedCapt})
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        // this.readUserData(user.uid);
        // this.setState({ userEmail:user.email, userName : emailSplittedCapt})
      }
    })

    this.getAndLoadHttpUrl(currentUser.uid)
    
}
























// readUserData(userId) {
//   firebase.database().ref('users/' + userId + '/').once('value', function(snapshot) {
//       let data = snapshot.val();
//       // alert(JSON.stringify(data))
//       if(data.info.firstName === undefined || data.info.firstName === null  ){
//         let firstName = data.fb.firstName
//         let lastName = data.fb.lastName
//         let email = data.fb.email
//         this.setState({firstName, lastName, email});
//       }
//       else{
//         let firstName = data.info.firstName
//         let lastName = data.info.lastName
//         let email = data.info.email
//         this.setState({firstName, lastName, email});
//       }
      
      
     
//     }.bind(this));
// }











componentDidMount(){
  const { currentUser } = firebase.auth()
  this.setState({olduserId : currentUser.uid})
  // this.getAndLoadHttpUrl(currentUser.uid)
  firebase.database().ref(`/users/${currentUser.uid}`).child('fb').once('value').then(snapshot => { 
    if (snapshot.val() !== null ) {
      firebase.database().ref(`/users/${currentUser.uid}/info`)
        .remove({ 
          
        })
        firebase.database().ref('users/' + currentUser.uid + '/').once('value', function(snapshot) {
          let data = snapshot.val();
        
         
            let firstName = data.fb.firstName
            let lastName = data.fb.lastName
            let email = data.fb.email
            let photo = data.fb.photoUrl
            this.setState({firstName, lastName, email, photo});
          
          
         
        }.bind(this));
    }
    else{
      firebase.database().ref('users/' + currentUser.uid + '/').once('value', function(snapshot) {
        let data = snapshot.val();
      
       
          let firstName = data.info.firstName
          let lastName = data.info.lastName
          let email = data.info.email
          let photo = data.info.photoUrl
          this.setState({firstName, lastName, email, photo});
        
       
      }.bind(this));
    }
    // alert("Component Did mount")
  })

}




async getAndLoadHttpUrl(userId) {
  if (this.state.mounted == true) {
    const ref = firebase.storage().ref(userId + '/to/image.jpg');
    ref.getDownloadURL().then(data => {
      if(data != null){

        this.setState({ photo: data })
        firebase.database().ref('users/' + userId + '/' + 'info').update({
          photoUrl: data,
          
       });
      }
       
      
    }).catch(error => {
      // alert('Please Select Your Profile Image')
      
   })
  }
 
}





//  writeUserData(userId, email, userName, photoUrl) {
//     firebase.database().ref('users/' + userId + '/').update({
//         info: {
//           userName: userName,
//           email: email,
//           photoUrl: photoUrl,
//           userId : userId,
//           fbuserId : '0'
         
//         },
      
//     });
//     }


  


    // readUserData(userId) {
    //   firebase.database().ref('users/' + userId + '/').once('value', function(snapshot) {
    //       let data = snapshot.val();
    //       let photoUrl = data.photoUrl
    //       this.setState({photo: photoUrl});
    //       alert(photoUrl)
    //     }.bind(this));
    // }












handleChoosePhoto = ()=>{
  
  ImagePicker.showImagePicker( response => {
    if (response.uri) {
      // User picked an image
      const {uri} = response;
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          const ref = firebase.storage().ref(user.uid + '/to/image.jpg');
          ref.putFile(uri)
      }
      })
      this.setState({photo : uri,})
    }
})
}

cancelledOverlayForId = ()=>{
  this.setState({isVisible:false})
}



uploadFbIdToFirebase = ()=>{
  const { currentUser } = firebase.auth()

  // firebase.database().ref("users/" + currentUser.uid + "/info/firstName").once("value", snapshot => {
  //   if (!snapshot.exists()){
  //   }
  // });
              firebase.auth().onAuthStateChanged(user => {
                if(user) {
                  firebase.database().ref('users/' + user.uid + '/info').update({    
                    fbuserId : this.state.id
              });
              }
          })
  
 
  this.setState({isVisible:false})
  // alert("Id Added Successfully")
  
 
  return this.facebookLogin()
}







// handleChoosePhoto = () => {
  // const options = {
  //   noData: true,
  // };
  // ImagePicker.launchImageLibrary(options, response => {
  //   if (response.uri) {
  //     this.setState({ photo: response.uri });
  //   }
//}







  componentWillUnmount() {
    this.setState({ isMounted: false })
}
  
  
signOutUser = async () => {
  try {
      await firebase.auth().signOut()
      .then(() => this.props.navigation.navigate('Loading'))
     
  } catch (e) {
      console.log(e);
  }
}
  


// handleLogout = () => {
//   LoginManager.logOut()
//   firebase
//     .auth()
//     .signOut()
//     .then(() => this.props.navigation.navigate('SignUp'))
//     .catch(error => this.setState({ errorMessage: error.message }))

//   this.setState({photo : 'https://cdn2.iconfinder.com/data/icons/picons-essentials/71/user_add-512.png'})
  
// }
  static navigationOptions = { header: null };
render() {
    const { photo } = this.state;
    const { currentUser } = this.state
    
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
                <Title>Home</Title>
               <Subtitle> 
              {this.state.email}!</Subtitle>
            </Body>
            <Right>
                <Button badge transparent active 
                  onPress={()=> {
                    this.props.navigation.navigate("SearchScreen", {olduserId:this.state.olduserId})
                  }}
                >
                    <Icon name="search" />
                </Button>
            </Right>
        </Header>
        <Content padder>

           <Card style={{borderRadius:25}}>
           
               
                <Right>
                <Left/>
                 <Left/>
                  <Left/>
                  
               
               <Button onPress={this.handleChoosePhoto} rounded
                    style={{margin:30, backgroundColor:'white'}}
               >
                 
                  <Thumbnail style={{marginTop:10}} large
                    source={{uri : this.state.photo}} />
                    {/* <Badge  style={{padding:0,  width:30,height:30, backgroundColor:'white',borderRadius:20, position: 'absolute', right:-2,bottom:-18}}>
                      <Icon style={{margin:0}} type="MaterialCommunityIcons" name='pencil-circle' />
                    </Badge> */}
               </Button>
               
                
   
                </Right>
               
                
                
                <CardItem>
                    <Text>Name    :  {this.state.firstName} {this.state.lastName}</Text>
                </CardItem>
                <CardItem/>
                <CardItem>
                    <Text>Address :  {this.state.address}</Text>
                </CardItem>
                <CardItem/>
                <CardItem>
                    <Text>Contact :  {this.state.contact}</Text>
                </CardItem>
                <CardItem/>
                <CardItem>
                    <Text>Email    :  {this.state.email}!</Text>
                </CardItem>
                

                <Button block style={{marginLeft:40,marginRight:40,margin:10}} onPress={()=> this.setState({isVisible:true})}> 
                {/* this.facebookLogin */}
                    <Icon name='logo-facebook' />
                    <Text>Facebook</Text>
                </Button>

                
                 <Button block info style={{marginLeft:40,marginRight:40,margin:10}}>
                     <Icon name='logo-twitter' />
                    <Text>Twitter</Text>
                </Button>


                 <Button block danger style={{marginLeft:40,marginRight:40,margin:10}}>
                <Icon name='logo-instagram' danger />
                    <Text>Instagram</Text>
                </Button>


                
             
      

            </Card>
            


            


            
            <Button style={{backgroundColor:"#e93766"}} block onPress ={this.handleLogout} >
              <Text>Logout</Text>
            </Button>
             
        
        </Content>
           
        {
          this.state.isVisible == true && (
            <Overlay
            
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',margin:20}}>
                <Text style={{marginTop:20,marginBottom:20}}>Please Enter your Facebook UserName</Text>
                  <Input
                    placeholder='jhon.doe.23'
                    shake={true}
                    onChangeText={id => this.setState({id})}
                    value={this.state.id}
                  />

                  <Text style={{margin:10,marginTop:10}}>If you don't know your user name plz follow these steps.</Text>
                  <Text style={{fontSize:12}}>1. Open facebook on your browser and login to your account.</Text>
                  <Text style={{fontSize:12}}>2. Go to your Profile page and see the url after slash "/" on your browser search bar</Text>
                  <Text style={{fontSize:12}}>3. Example: www.facebook.com/abc.qwe.21 so in this scenario  "abc.qwe.21" is your username.</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'space-around',marginTop:30,margin:20}}> 
                    <Button transparent style={{margin:20}} onPress={this.uploadFbIdToFirebase}><Text>Done</Text></Button>
                    <Button transparent style={{margin:20}} onPress={this.cancelledOverlayForId}><Text>Cancel</Text></Button>
                </View>
               



              </View>
                
               
 
            </Overlay>
          )
        }
       
        </Container>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
})