import React from 'react';
import { StyleSheet, Platform, Image, View , ActivityIndicator } from 'react-native';
import {Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';
import firebase from 'react-native-firebase'
import AntDesign from 'react-native-vector-icons';
import UsersCard from '../components/UsersCard'
import { SearchBar } from 'react-native-elements';






export default class SearchScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null,search: '',  tempData: [] , filteredData: [], firstName:'User ', contactsFetched:false}



 updateSearch = search => {
     let text = search.toLowerCase();
     let usersInfo = this.state.tempData
     let filteredData = usersInfo.filter(item =>{
         if(item.info.firstName.toLowerCase().match(text)){
             return item
         }
     } )

    this.setState({ filteredData : filteredData ,search });
    // alert(this.state.filteredData)
  };

  componentDidMount() {
        this.closeActivityIndicator();  

        var olduserId = this.props.navigation.getParam('olduserId')
    //    alert(olduserId)
        
        const currentUserId = firebase.auth().currentUser.uid
        
        this.setState({currentUserId : currentUserId , olduserId: olduserId})

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.readUserData(user.uid);
            }
        })
        

       

        
        // x = this.state.tempData.filter(item => {
        //     return item.info.userName=='Longbottom'
        // })
        // alert(JSON.stringify(x))
   
}

 readUserData() {
    const {currentUser} = firebase.auth()
    // firebase.database().ref(`/users/${currentUser.uid}/fb`).child('email').once('value').then(snapshot => { 
    //     let uemail = snapshot.val()
   
    // })
    
    firebase.database().ref('users/').once('value', function(snapshot) {
        
        let data = snapshot.val();
        
        
       
        
        // alert(JSON.stringify(data[currentUser.uid].fb.email))
        
        
            for(let i in data) {
                
                if(i != this.state.currentUserId && i!=this.state.olduserId ) {
                    if(data[i].fb != undefined){
                        if(data[i].info != null && data[i].fb == null){
                      
                            let myEmail = data[currentUser.uid].fb.email
                            if (myEmail != data[i].info.email ) {
                             
                                this.state.tempData.push(data[i]);
                            }
                        
                       
                                                                        
                        }
                    }
                    else{
                        this.state.tempData.push(data[i]);
                    }

                   
                }
          

                
          }
       
            
        this.setState({tempData: this.state.tempData,});
     
        
            
    }.bind(this));
    
    
}


closeActivityIndicator() {
    setTimeout(() => {
     this.setState({contactsFetched: true});
    }, 1000);
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
   









    
    
        const usersListAll = Object.keys(this.state.tempData).map((d, key) => {
                    return <UsersCard key={key} userName={this.state.tempData[d].info.firstName} userEmail={this.state.tempData[d].info.email}
                    userPhoto = {this.state.tempData[d].info.photoUrl}  fbuserId={this.state.tempData[d].info.fbuserId}
                    navigation={navigation} otherUserProfile={'ProfileOtherUsers'}
                    
                    />
             })
   
  

        const usersList = Object.keys(this.state.filteredData).map((d, key) => {
            return  <UsersCard key={key} userName={this.state.filteredData[d].info.firstName} userEmail={this.state.filteredData[d].info.email}
            userPhoto = {this.state.filteredData[d].info.photoUrl} fbuserId={this.state.filteredData[d].info.fbuserId}
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

            {
                (this.state.contactsFetched == false &&  
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"
                    />) 
                    
                   
                
                

            }    
            
            {this.state.filteredData == 0 && usersListAll}
            {usersList}
        

        </Content>
    </Container>
    )
  }
}

const styles = StyleSheet.create({
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    }
  });
