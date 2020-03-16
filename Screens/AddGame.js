import React, { Component } from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import PreMatch from '../GameFeilds/pre-match'
import Auton from '../GameFeilds/auton'
import Teleop from '../GameFeilds/teleop'
import EndGame from '../GameFeilds/end-game'
import AtherGame from '../GameFeilds/login';
import RegisterScreen from '../GameFeilds/Register'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import firebase from 'firebase'
import { Header } from 'react-native-elements';
import { YellowBox } from 'react-native';
 



let Deffult_Form = {                
  TeamNumber: String(1), // שם הקבוצה
  match: String(1), // מספר המשחק
  color: 'BLUE', // איזו ברית
  position: 1, // איזה מיקום בברית
  
  Autonomous: {
      Starting_Number_Of_Power_Cells:Number(0), // כמות הכדורים שהרובוט התחיל בהם באוטונומי
      Cross_Line: false, // האם הרובוט עבר את הקו בסיום האוטונומי
      Low:Number(0), // כדורים לנמוך
      Hex:Number(0), // כדורים למשושה
      Hole:Number(0) // כדורים לחור הקטן בתוך המשושה
  },
  teleop: {
      Low:Number(0), // כדורים לנמוך
      Hex:Number(0), // כדורים למשושה
      Hole:Number(0),// כדורים לחור הקטן בתוך המשושה
      Spin_Wheel:false, // האם הרובוט סיבב את הגלגל
      Color:false // האם הרובוט עשה את זה לפי צבע
  },
  EndGame: {
    Climb:false, // האם הרובוט טיפס בסוף המשחק
    Park:false, // האם הרובוט חנה בסוף המשחק
    Generator_Switch_Level:false, // האם הרובוט עקף את 65 הנקודות בשלב האחרון
    Was_Broken_or_dc: false // האם הרובוט התנתק באמצע המשחק או נהרס
  },
      
      comments:"" // הערות}
  }

  class DataBase
  {
      constructor()
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
            
        }
        
        async AddMatch(UserId, Match)
        {
            let res = await this.db.collection('ScoutingData')
            await res.add({Match})
            return await res
        }
  }
export default class AddGameScreen extends Component {
      constructor(props) {
        super(props); // פעולה אשר מפעילה את המחלקה שהמחלקה יורשת
        this.Dbs = new DataBase()
        this.UserId = this.props.route.params.UserId;
        this.SecendUserId = this.props.route.params.UserId;

          YellowBox.ignoreWarnings(['Setting a timer']);
          this.state = { // ערך שמחזיק נתונים של היוזר באופן לוקאלי
              activeSlide: 0,
  
              form: {
                  ScouterName:this.UserId,
                  TeamNumber: String(1), // שם הקבוצה
                  match: String(1), // מספר המשחק
                  color: 'BLUE', // איזו ברית
                  position: 1, // איזה מיקום בברית
  
                  Autonomous: {
                      Starting_Number_Of_Power_Cells:Number(0), // כמות הכדורים שהרובוט התחיל בהם באוטונומי
                      Cross_Line: false, // האם הרובוט עבר את הקו בסיום האוטונומי
                      Low:Number(0), // כדורים לנמוך
                      Hex:Number(0), // כדורים למשושה
                      Hole:Number(0) // כדורים לחור הקטן בתוך המשושה
                  },
                  teleop: {
                      Low:Number(0), // כדורים לנמוך
                      Hex:Number(0), // כדורים למשושה
                      Hole:Number(0),// כדורים לחור הקטן בתוך המשושה
                      Spin_Wheel:false, // האם הרובוט סיבב את הגלגל
                      Color:false // האם הרובוט עשה את זה לפי צבע
                  },
                  EndGame: {
                      Tried_To_Climb:false,
                      Succeeded_Climb:false, // האם הרובוט טיפס בסוף המשחק
                      Park:false, // האם הרובוט חנה בסוף המשחק
                      Generator_Switch_Level:false, // האם הרובוט עקף את 65 הנקודות בשלב האחרון
                  },
                  
                  comments:"" // הערות
              }
          }
          this.restart = this.restart.bind(this)
          this.setInput = this.setInput.bind(this);
          this.submitMatch = this.submitMatch.bind(this);
          console.ignoredYellowBox = [
              'Setting a timer'
          ];
      }

      submitMatch() {
        const {navigate} = this.props.navigation;
        let match = this.state.form;
        this.Dbs.AddMatch(this.UserId,match)
        this.state.form = Deffult_Form
        this.UserId = ""
        this.forceUpdate();
        
        
          
      }
      restart()
      {
        this.forceUpdate();
      }
      renderItem ({item, index}) {
          return (
              <View style={styles.card}>
                  <Text style={styles.title}>{ item.title }</Text>
                  { item.content }
              </View>
          );
      }
      setInput(key, val, period = '') {
          const form = period != '' ? {
              form: Object.assign({}, this.state.form, {
                  [period]: Object.assign({}, this.state.form[period], {
                      [key]: val
                  })
              })
          } : {
              form: Object.assign({}, this.state.form, {
                  [key]: val
              })
          };
  
          this.setState(form);
      }
      render(){
            if(this.UserId == "")
            {
                
                var items = [
                    {
                        title: "restart",
                        content: <AtherGame restart={this.restart}/>
                    }
                    
                ]

                this.UserId = this.SecendUserId;
                
            }
            else
            {
                var items = [
                    {
                        title: 'לפני המשחק',
                        content: <PreMatch set={this.setInput}/>
                    },
                    {
                        title: 'השלב האוטונומי',
                        content: <Auton set={this.setInput}/>
                    },
                    {
                        title: 'שלב הטלופ',
                        content: <Teleop set={this.setInput}/>
                    },
                    {
                        title: 'סוף המשחק',
                        content: <EndGame set={this.setInput} submit={this.submitMatch}/>
                    }
                ]
            
            ;
            }

  
  
          return (
              <View style={styles.container}>
                <Header centerComponent={{ text: 'MA #5951 Scouting Application', style: { color: '#fff' } }}
                  linearGradientProps={{
                    colors: ['pink','red', 'pink'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                  }}/>
                  <Carousel
                  
                      ref={c => this.carousel = c}
                      data={items}
                      renderItem={this.renderItem}
                      onSnapToItem={(index) => this.setState({ activeSlide: index }) }
  
                      sliderWidth={Dimensions.get('window').width}
                      itemWidth={(Dimensions.get('window').width * .85) + 10}
                      slideStyle={styles.slide}
                      containerCustomStyle={styles.slider}
                      contentContainerCustomStyle={styles.sliderContentContainer}
                      inactiveSlideScale={.98}
                      inactiveSlideOpacity={.5}
                      enableMomentum={true}
                  />
                  <Pagination
                      dotsLength={items.length}
                      activeDotIndex={this.state.activeSlide}
  
                      containerStyle={styles.paginationContainer}
                      dotColor={'black'}
                      dotStyle={styles.paginationDot}
                      inactiveDotColor={'black'}
                      inactiveDotOpacity={0.4}
                      inactiveDotScale={0.7}
                      carouselRef={this.carousel}
                      tappableDots={!!this.carousel}
                  />
              </View>
          );
      }
}
  

  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#EBEEF5'
      },
      card: {
          backgroundColor: 'white',
          paddingTop: 20,
          paddingBottom: 20,
          paddingHorizontal: 16,
          flex: 1,
          borderRadius: 4
      },
      title: {
          fontSize: 19,
          fontWeight: '700'
      },
  
      slider: {
          marginTop: 15,
          overflow: 'visible'
      },
      slide: {
          width: Dimensions.get('window').width * .85,
          marginHorizontal: 5
      }
  });
  