import React from 'react';
import { StyleSheet, Platform, Image, View } from 'react-native';
import {Tabs,Tab,TabHeading, Segment,Thumbnail,Button,Text,Card,CardItem,Container, Badge, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, } from 'native-base';






export default class ProfileOtherUsers extends React.Component {
  state = { userName:'Herina Longbottom' , address: '124 NewBolston' ,contact:'+363467444',email:'pol2s@edc.com',
      
      password: '', errorMessage: null }


  static navigationOptions = { header: null };
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
                     <Text style={{position:'absolute',color:'white',bottom:-40,left:140,right:0,top:150
                        ,fontSize:25,textShadowOffset:{width:1,height:2},textShadowColor:'black'
                        ,textShadowRadius:3}}>User Name</Text>
                     <Thumbnail style={{
                        position:'absolute',bottom:-50,left:150,right:0,top:50,
                    
                        marginTop:10,
                    
                    }} large
                    source={{uri: 'http://2ap93t1x1l6e2f6gfo3ag4vw.wpengine.netdna-cdn.com/wp-content/uploads/2017/03/harry-768x576.jpg'}} />
                </CardItem>

                
                
                {/* </Right> */}
              
                
                <CardItem/>
               
              
                
                  
                
                <CardItem>
                <Right/>
                <Button style={{ width:70,height:70, alignItems:'center',justifyContent:'center'}} rounded>
                    <Left/>
                    <Icon  style={{ marginLeft: 30, marginRight: 0,}} name='logo-facebook' />
                    <Right/>
                    <Badge>
                        <Text>5</Text>
                    </Badge>
                   
                    <Badge style={{position:'absolute',bottom:-4,left:5,backgroundColor:'grey'}}>
                            <Text>+</Text>
                     </Badge>
                 
                </Button>
                <Right/>

                  <Button  info style={{width:70,height:70, alignItems:'center'}} rounded>
                    
                    <Icon style={{ marginLeft: 30, marginRight: 0,}} name='logo-twitter' />
                    <Badge>
                        <Text>235</Text>
                    </Badge>
                   
                    <Badge style={{position:'absolute',bottom:-4,left:5,backgroundColor:'grey'}}>
                            <Text>+</Text>
                     </Badge>
                 
                </Button>
                <Right/>
                <Button  rounded danger style={{width:70,height:70, alignItems:'center',}}>
                    
                    <Icon style={{ marginLeft: 30, marginRight: 0,}} name='logo-instagram' />
                    <Badge>
                        <Text>50</Text>
                    </Badge>
                   
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
         
         
        </Container>

    )
  }
}
