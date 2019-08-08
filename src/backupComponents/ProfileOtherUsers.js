import React from 'react';
import { StyleSheet, Platform, Image, View } from 'react-native';
import {Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';






export default class ProfileOtherUsers extends React.Component {
  state = { userName:'Herina Longbottom' , address: '124 NewBolston' ,contact:'+363467444',email:'pol2s@edc.com',
      
      password: '', errorMessage: null }


  static navigationOptions = { header: null };
render() {

    
  return (
         <Container >
    
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
           
               
                <Right>
                <Left/>
                 <Left/>
                  <Left/>
               
                <Thumbnail style={{marginTop:10}}
                source={{uri: 'http://2ap93t1x1l6e2f6gfo3ag4vw.wpengine.netdna-cdn.com/wp-content/uploads/2017/03/harry-768x576.jpg'}} />
   
                </Right>
               
                
                <CardItem/>
                <CardItem/>
                <CardItem>
                    <Text>{this.state.userName}</Text>
                </CardItem>
                <CardItem/>
                <CardItem>
                    <Text>{this.state.address}</Text>
                </CardItem>
                <CardItem/>
                <CardItem>
                    <Text>{this.state.contact}</Text>
                </CardItem>
                <CardItem/>
                <CardItem>
                    <Text>{this.state.email}</Text>
                </CardItem>
                <CardItem/>

                <Button block>
                    <Icon name='logo-facebook' />
                    <Text>Send Request On Facebook</Text>
                </Button>
                
                 <Button block info>
                     <Icon name='logo-twitter' />
                    <Text>Send Request On Twitter</Text>
                </Button>
                 <Button block danger>
                <Icon name='logo-instagram' danger />
                    <Text>Send Request On Instagram</Text>
                </Button>
             
      

            </Card>
            
        </Content>
        </Container>

    )
  }
}
