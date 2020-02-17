import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView,I18nManager, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import Input from '../components/text-input.js'
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase'
import "firebase/firestore";

import { YellowBox } from 'react-native';

class DataBase
{
    constructor()
    {
  
        const firebaseConfig = {
            apiKey: "AIzaSyBwtgfOubebl1M7BoBP9cZyJ3ScHIICQ-M",
            authDomain: "vast-logic-239816.firebaseapp.com",
            databaseURL: "https://vast-logic-239816.firebaseio.com",
            projectId: "vast-logic-239816",
            storageBucket: "vast-logic-239816.appspot.com",
            messagingSenderId: "281371446684",
            appId: "1:281371446684:web:cebcdfb9e27626004c0c59",
            measurementId: "G-MK97XYS3F8"
          };
          
          if(!firebase.apps.length)
          {
              firebase.initializeApp(firebaseConfig);
          }
          this.db = firebase.firestore()
          
      }
      async AlreadyExsit(UserName)
      {
          let res = await this.db.collection('GameData').where('Name','==',UserName).get()
          return res.empty
      }
      async NewUser(UserName)
      {
          let isExsit = false;
          
          await this.AlreadyExsit(UserName).then((res) => {
              isExsit = res;
          })
          
          if(!isExsit)
          {
              return;
          }
  
          let res = await this.db.collection('GameData').add(
              {
                  Name:UserName,
              }   
          )
          return res.id
  
      }
      async GetUser(UserName, IsUserName)
      {
          if(IsUserName)
          {
              let res =  await this.db.collection('GameData').where('Name','==',UserName).get()
              if(res.empty)
                  return false;
  
              let id = null;
              await res.forEach((val) => {
                 id = val.id;
              })
              return id
          }
          else
          {
              let res = await this.db.collection('GameData').doc(UserName).get();
              return {"data":res.data(),"id":res.id}
          }
      }
      async AddMatch(UserId, Match)
      {
          let res = await this.db.collection('GameData').doc(UserId).collection('Matches')
          await res.add({Match})
          return await res
      }
      



}


export default class AddGameScreen extends Component {

    constructor(props)
    {
        super(props)
 
    }
    render()
    {
        return(
            <View>

            </View>
        )
    }

}
