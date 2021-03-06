import React from 'react';
import { StyleSheet, Platform, Image, View } from 'react-native';
import {Tabs,Tab,TabHeading, Segment,Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';
import { ShareDialog ,GameRequestDialog,MessageDialog  } from 'react-native-fbsdk';
import {Overlay,Input} from 'react-native-elements';
import firebase from 'react-native-firebase';


// Build up a shareable link.
// const shareLinkContent = {
//     contentType: 'link',
//     contentUrl: "https://facebook.com",
//     contentDescription: 'Wow, check out this great site!',
//   };



export default class ProfileOtherUsers extends React.Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
          contentType: 'link',
          contentUrl: 'https://www.facebook.com/',
          contentDescription: 'Facebook sharing is easy!',
          commonParameters : {
            peopleIds: ['102513651113996']
        }
        };
        // const gameRequestContent = {
        //     recipients: ['102513651113996'],
        //     title: 'Accept My Friend Request',
        //     message: 'Plz Accept M Request'
        //   };
          const messageDialog = {
            contentType: 'link',
            contentUrl: 'https://www.facebook.com/',
            commonParameters : {
                peopleIds: ['102513651113996']
            }
            
           
          };
    
        
        this.state = { userName:'Herina Longbottom' , address: '124 NewBolston' ,contact:'+363467444',email:'pol2s@edc.com',
      
      password: '', errorMessage: null , shareLinkContent: shareLinkContent, messageDialog:messageDialog , showIdPopup:true, id:''
      
        }
     
    }


  static navigationOptions = { header: null };

componentWillMount(){
    var user = this.props.navigation.getParam('username')
    var userPhoto = this.props.navigation.getParam('userPhoto')
    var fbuserId = this.props.navigation.getParam('fbuserId')
    var fbButtonDisable = this.props.navigation.getParam('fbButtonDisable')
    var showIdPopup = this.props.navigation.getParam('showIdPopup')
    this.setState({userName: user , userPhoto: userPhoto , fbuserId: fbuserId, fbButtonDisable:fbButtonDisable , showIdPopup:showIdPopup})
}


// sendFriendRequest = ()=>{
//     FB.ui({method: 'apprequests',
//         message: 'Accept My Friend Request',
//         to: this.state.fbuserId
//         }, function(response){
//         console.log(response);
//    });
// }




// Share the link using the share dialog.
shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: ' + result.postId);
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }


  
  // requestDialog (){
  //   var tmp = this;
  //   GameRequestDialog.canShow(this.state.gameRequestContent).then(
  //     function(canShow) {
  //       if (canShow) {
  //         return GameRequestDialog.show(tmp.state.gameRequestContent);
  //       }
  //     }
  //   ).then(
  //     function(result) {
  //       if (result.isCancelled) {
  //         alert('Request cancelled');
  //       } else {
  //         alert('Request success with postId: ' + result.postId);
  //       }
  //     },
  //     function(error) {
  //       alert('Request fail with error: ' + error);
  //     }
  //   );
  // }







  
  cancelledOverlayForId = ()=>{
    this.setState({isVisible:false})
  }
  
  
  
  uploadFbIdToFirebase = ()=>{
   
  
    // firebase.database().ref("users/" + currentUser.uid + "/info/firstName").once("value", snapshot => {
    //   if (!snapshot.exists()){
              if(this.state.id ===undefined || this.state.id=== null ||this.state.id === ''){
                alert("Please enter your username")
              }
              else{
                firebase.auth().onAuthStateChanged(user => {
                  if(user) {
                    firebase.database().ref('users/' + user.uid + '/info').update({    
                      fbuserId : this.state.id,
                      fbButtonDisable : false
                });
                }
            })
    
   
   
              }

              this.setState({isVisible:false})
    //   }
    // });
               
    // alert("Id Added Successfully")
    
   
    
  }
  



openFbProfile = ()=> {

  if(this.state.showIdPopup == true){
    this.setState({isVisible: true})
    if(this.state.isVisible == false){
          this.props.navigation.navigate("WebViewFB", {fbuserId:this.state.fbuserId})
    }
  
  }
  else{
    this.props.navigation.navigate("WebViewFB", {fbuserId:this.state.fbuserId})
  }
 
}








































render() {

    
  return (
         <Container padder>
    
        <Header style={{backgroundColor:'#e93766'}}>
            <Left>
                <Button bage transparent 
                    onPress={() => {
                        this.props.navigation.navigate("SearchScreen");
                    }}
                >
                    <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title>{this.props.username} Profile</Title>
            </Body>
        </Header>
        <Content >

          <Card style={{borderRadius:25}}>
           
               
                {/* <Right>
                <Left/>
                 <Left/>
                  <Left/> */}
                <CardItem cardBody>
                    <Image source={{uri: 'https://cdn.pixabay.com/photo/2017/03/14/17/43/mountain-2143877_960_720.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                    {/* 'https://cdn.pixabay.com/photo/2017/03/14/17/43/mountain-2143877_960_720.jpg' */}
                     <Text style={{position:'absolute',color:'white',bottom:-40,left:158,right:0,top:150
                        ,fontSize:25,textShadowOffset:{width:1,height:2},textShadowColor:'black'
                        ,textShadowRadius:3}}>{this.state.userName}</Text>
                     <Thumbnail style={{
                        position:'absolute',bottom:-50,left:150,right:0,top:50,
                    
                        marginTop:10,
                    
                    }} large
                    source={{uri: this.state.userPhoto}} />
                    {/* 'http://2ap93t1x1l6e2f6gfo3ag4vw.wpengine.netdna-cdn.com/wp-content/uploads/2017/03/harry-768x576.jpg' */}
                </CardItem>

                
                
                {/* </Right> */}
              
                
                <CardItem/>
               
              
                
                  
                
                <CardItem>
                <Right/>


                {!this.state.fbButtonDisable ? ( 
                <Button    style={{ width:70,height:70, alignItems:'center',justifyContent:'center'}} rounded onPress={this.openFbProfile }>
                              <Left/> 
                              <Icon  style={{ marginLeft: 20, marginRight: 10,}} name='logo-facebook' /> 
                              <Right/>
                              <Badge style={{position:'absolute',bottom:-4,left:5,backgroundColor:'grey'}}>
                            <Text>+</Text>
                     </Badge>
                      
                      </Button>
                      ) :( 
                        <Button  disabled style={{ width:70,height:70, alignItems:'center',justifyContent:'center'}} rounded >
                            <Icon  style={{ marginLeft: 20, marginRight: 10,}} name='logo-facebook' />
                            <Badge style={{position:'absolute',bottom:-4,left:5,backgroundColor:'grey'}}>
                            <Text>+</Text>
                            </Badge>
             
                      </Button>
                      )
                  
                      }
                  
                   
                    {/* <Badge>
                        <Text>5</Text>
                    </Badge> */}
                   
                   
                <Right/>

                  <Button  info style={{width:70,height:70, alignItems:'center'}} rounded>
                    
                    <Icon style={{ marginLeft: 30, marginRight: 0,}} name='logo-twitter' />
                    {/* <Badge>
                        <Text>235</Text>
                    </Badge> */}
                   
                    <Badge style={{position:'absolute',bottom:-4,left:5,backgroundColor:'grey'}}>
                            <Text>+</Text>
                     </Badge>
                 
                </Button>
                <Right/>
                <Button  rounded danger style={{width:70,height:70, alignItems:'center',}}>
                    
                    <Icon style={{ marginLeft: 30, marginRight: 0,}} name='logo-instagram' />
                    {/* <Badge>
                        <Text>50</Text>
                    </Badge> */}
                   
                    <Badge style={{position:'absolute',bottom:-4,left:5,backgroundColor:'grey'}}>
                            <Text>+</Text>
                     </Badge>
                 
                </Button>

                <Right/>


                
               
                </CardItem>
               

                {/* <CardItem>
                    <Left/>
                     <Button style={{backgroundColor:"#e93766",width:200,margin:20}} block >
                         <Text>Follow</Text>
                    </Button>
                    <Right/>
                </CardItem>
              */}
              <CardItem/>
             </Card>
            {/* <Card>
                <CardItem>
                <Left/>
                <Button androidRippleColor= {{ color:'red', borderless:false }} style={{ marginRight:0,margin:20, borderRadius:4}} block rounded bordered danger>
                         <Text>Following</Text>
                </Button>
                 <Button style={{backgroundColor:"#e93766",margin:20,marginLeft:0}} block >
                         <Text>Followers</Text>
                 </Button>
                 <Right/>
                </CardItem>
                
               
            </Card> */}


           <Tabs tabBarUnderlineStyle={{ backgroundColor: "#e93766" }} style={{marginTop:40}}>
          <Tab
           heading={ <TabHeading style={{ backgroundColor: "white" }}><Text style={{color:'black'}}>Following</Text></TabHeading>}>
            <Text style={{margin:20,fontSize:20}}>Following</Text>
          </Tab>
          <Tab
             heading={ <TabHeading style={{ backgroundColor: "white" }}><Text style={{color:'black'}}>Followers</Text></TabHeading>}>
            <Text style={{margin:20,fontSize:20}}>Followers</Text>
          </Tab>
          
        </Tabs>
            
        </Content>




        {
          this.state.isVisible == true && (
            <Overlay
            
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column',margin:20}}>
                <Text style={{marginTop:20,marginBottom:20}}>Please enter your Facebook user name</Text>
                  <Input
                    placeholder='jhon.doe.23'
                    shake={true}
                    onChangeText={id => this.setState({id})}
                    value={this.state.id}
                  />

                  <Text style={{margin:10,marginTop:10}}>To find your user name, please follow these steps.</Text>
                  <Text style={{fontSize:12}}>1. Open facebook on your browser and login to your account.</Text>
                  <Text style={{fontSize:12}}>2. Go to your profile page and see the url after the slash "/" on the search bar of your browser</Text>
                  <Text style={{fontSize:12}}>3. Example: www.facebook.com/abc.qwe.21 so here "abc.qwe.21" is your username.</Text>
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
