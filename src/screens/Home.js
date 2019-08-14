import React from 'react';
import { StyleSheet, Platform,  View ,Image} from 'react-native';
import {Subtitle,Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';
import firebase from 'react-native-firebase'
import AntDesign from 'react-native-vector-icons';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AccessToken, LoginManager } from 'react-native-fbsdk';




export default class Home extends React.Component {
  state = { userName:'User 101' , address: '124 NewBolston' ,contact:'+363467444',
  email: '', password: '', errorMessage: null, photo: 'https://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/5kh3kjh36.png', }






  facebookLogin = async()=> {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'id']);
  
      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request'); 
      }
  
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
  
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
  
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    } catch (e) {
      console.error(e);
    }
    firebase.auth().onAuthStateChanged(user => {
    if(user) {
      this.updateUserData(user.uid, user.email, user.displayName,user.photoURL);
      this.setState({photo: user.photoURL, userEmail: user.email, userName:user.displayName})
      
    }
  })
  }

  updateUserData(fbuserId,fbuserEmail,fbuserName,fbphtotUrl){
    firebase.database().ref('users/' + this.state.olduserId + '/').update({
      
        info: {
          userName: fbuserName,
          email: fbuserEmail,
          photoUrl: fbphtotUrl,
          fbuserId: fbuserId
         
        },
    
     
    
  });
  }













componentWillMount () {

  const { currentUser } = firebase.auth()
  var email = currentUser.email;
  var emailSplitted = email.substr(0, email.indexOf('@'));
  var emailSplittedCapt = emailSplitted.charAt(0).toUpperCase() + emailSplitted.slice(1)
  
 
    this.setState({ currentUser ,userName:emailSplittedCapt})
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.writeUserData(user.uid, user.email, emailSplittedCapt,this.state.photo);
        // this.readUserData(user.uid);
        this.setState({ userEmail:user.email, userName : emailSplittedCapt})
      }
    })
    
    
}


componentDidMount(){
  const { currentUser } = firebase.auth()
  this.setState({olduserId : currentUser.uid})
}


 writeUserData(userId, email, userName, photoUrl) {
    firebase.database().ref('users/' + userId + '/').set({
        info: {
          userName: userName,
          email: email,
          photoUrl: photoUrl,
          userId : userId
         
        },
      
    });
    }
    

  


    // readUserData(userId) {
    //   firebase.database().ref('users/' + userId + '/').once('value', function(snapshot) {
    //       let data = snapshot.val();
    //       let photoUrl = data.photoUrl
    //       this.setState({photo: photoUrl});
    //       alert(photoUrl)
    //     }.bind(this));
    // }




handleChoosePhoto = () => {
  const options = {
    noData: true,
  };
  ImagePicker.launchImageLibrary(options, response => {
    if (response.uri) {
      this.setState({ photo: response.uri });
    }

  //   firebase.auth().onAuthStateChanged(user => {
  //     firebase.database().ref('users/' + user.uid + '/').update({
  //       info: {
  //         userName: this.state.userName,
  //         email : user.email,
  //         photoUrl : response.uri,
          
  //       },
  //   })

  // });


 
  
  
});
  
};

handleLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => this.props.navigation.navigate('SignUp'))
    .catch(error => this.setState({ errorMessage: error.message }))
}
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
              {currentUser && this.state.userEmail}!</Subtitle>
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
                  {photo && (
               
               <Button onPress={this.handleChoosePhoto} rounded
                    style={{margin:30, backgroundColor:'white'}}
               >
                 
                  <Thumbnail style={{marginTop:10}} large
                    source={{uri: photo}} />
                    {/* <Badge  style={{padding:0,  width:30,height:30, backgroundColor:'white',borderRadius:20, position: 'absolute', right:-2,bottom:-18}}>
                      <Icon style={{margin:0}} type="MaterialCommunityIcons" name='pencil-circle' />
                    </Badge> */}
               </Button>
                  )}
   
                </Right>
               
                
                
                <CardItem>
                    <Text>Name    :  {this.state.userName}</Text>
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
                    <Text>Email    :  {currentUser && this.state.userEmail}!</Text>
                </CardItem>
                

                <Button block style={{marginLeft:40,marginRight:40,margin:10}} onPress={this.facebookLogin}> 
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
        </Container>
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