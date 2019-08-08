import React from 'react';
import { StyleSheet, Platform, Image, View } from 'react-native';
import {Subtitle,Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';
import firebase from 'react-native-firebase'
import AntDesign from 'react-native-vector-icons';





export default class Home extends React.Component {
  state = { userName:'Herina Longbottom' , address: '124 NewBolston' ,contact:'+363467444',
  email: '', password: '', errorMessage: null }




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
  static navigationOptions = { header: null };
render() {
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
              {currentUser && currentUser.email}!</Subtitle>
            </Body>
            <Right>
                <Button badge transparent active 
                  onPress={()=> {
                    this.props.navigation.navigate("SearchScreen")
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
               
                <Thumbnail style={{marginTop:10}}
                source={{uri: 'https://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/5kh3kjh36.png'}} />
   
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
                    <Text>Email    :  {currentUser && currentUser.email}!</Text>
                </CardItem>
                

                <Button block style={{marginLeft:40,marginRight:40,margin:10}}> 
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