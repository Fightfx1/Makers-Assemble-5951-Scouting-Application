import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView,I18nManager, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import Input from '../components/text-input.js'
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase'
import "firebase/firestore";
import axios from 'axios';
import { YellowBox } from 'react-native';




class DataBase
{
    constructor(ApiUrl)
    {
  
        const firebaseConfig = {    
        apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: "",
            measurementId: ""
        };
          
          if(!firebase.apps.length)
          {
              firebase.initializeApp(firebaseConfig);
          }
          this.db = firebase.firestore()
          
          this.request = axios.create({
            baseURL:ApiUrl
        })
      }
      
      async AddMatch(UserId, Match)
      {
          let res = await this.db.collection('ScoutingData')
          await res.add({Match})
          return await res
      }
      async CanAcsess(UserName)
      {
          let res = await this.request({
              method: 'post',
              url:"/CanAcsess",
              headers:{
                  "UserName":UserName
              }
          }).catch(() =>{
              return {"data":{"CanAcsess":false}}
          })
  
          return res.data.CanAcsess
      }
}



export default class LoginPage extends Component {
    constructor(props)
    {
        super(props)
        
        
        this.UserName = ""
        this.Dbs = new DataBase("https://25e74bd6.ngrok.io/api/v3")

        this.state = {
            spinner: false,
            hasPressed: false,
        };
        this.Login = this.Login.bind(this);
        this.setUserNameOnPress = this.setUserNameOnPress.bind(this);
        this.cleenHadPressed = this.cleenHadPressed.bind(this);

        YellowBox.ignoreWarnings(['Setting a timer']);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    cleenHadPressed()
    {
        this.setState({hasPressed:false})
    }
    async MakeLogin()
    {
        this.setState({spinner:!this.state.spinner}) // start loding
    
        await this.Dbs.CanAcsess(this.UserName).then((res) => {


            this.setState({spinner:!this.state.spinner}) // end loding
            if(res === false)
            {  
                this.setState({hasPressed:true})
                setTimeout(this.cleenHadPressed,5000)
                return;
            }
            else
            {
                this.props.setInput(res)
                return;
            }
        
        })

       
    }
    Login()
    {
        this.MakeLogin()
    }
    setUserNameOnPress(val)
    {
        this.UserName = val
    }
    render()
    {
        return(
            <View>
                <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
                />
                <View>
                    <Header centerComponent={{ text: 'Login', style: { color: '#fff', fontSize:14 } }}
                    linearGradientProps={{
                    colors: ['pink','red', 'pink'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                    }}/>
                </View>
                <View>
                    {this.state.hasPressed? <Text>Not Find try agein</Text>: null }
                </View>

                
                
                <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent : 'center'}}>
                    <View style={styles.scrollView}>
                        <View style={styles.input}>
                            <Input style={styles.inputtext}
                                text="Enter your name:"
                                multiline={false}
                                placeholder=" insert name here"
                                onChange={(value) => this.setUserNameOnPress(value.text)}
                            />

                        </View>
                        <View style={styles.EndPageButton}>
                        <TouchableOpacity style={styles.submit_btn} onPress={() => this.Login()}>
                                    <Text style={styles.submitText}>Login</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>

            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    HederingViewBox:{
        justifyContent: 'center',
        alignItems: 'center',
        color: '#545454',
        fontSize: 16,
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
    heading: {
        color: '#545454',
        
        fontSize: 18
    },
    input: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 5
    },
    submit_btn: {
        marginTop: 20,
        height: 45,
        backgroundColor: '#0089ff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 7
    },
    EndPageButton:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
    },
    scrollView : {
        height : Dimensions.get('window').height - 30, },
    
    inputtext:{
        borderTopColor:'#707174',
        borderTopWidth: 1.5,
        height: 40,
        borderColor: '#707174',
        borderBottomWidth: 1.5,
        color: '#36373d',
        fontSize: 16,
        borderRightWidth:1.5,
        borderLeftWidth:1.5,
        borderRightColor:'#707174',
        borderLeftColor:'#707174'
    }
});