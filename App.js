import React, { Component,useState } from 'react';
import { StyleSheet, Text, View ,Button,TouchableOpacity,ScrollView, Dimensions} from 'react-native';
import AddGameScreen from './Screens/AddGame';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header } from 'react-native-elements';
import { Ionicons,AntDesign,FontAwesome } from '@expo/vector-icons';
import Game from './games/gamescreen';
import LoginPage from './Screens/LoginPage';
import { Table, TableWrapper,Col, Cols, Cell,Row  } from 'react-native-table-component';
import TBA from './TbaApi';
import myAccoutPage from './Screens/myAccoutPage'


function setCharAt(str,index,chr) {
  str = toString(str)
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}

class HomeScreen extends Component {
  
  constructor(props)
  {
    super(props);
    this.UserId = ""
    
    this.props.navigation.navigate('Add Game',  {UserId})
    this.props.navigation.navigate('Home');
    this.tba = new TBA("https://25e74bd6.ngrok.io/api/v3");
    this.state = {
      cooljson:[],
      realdata:{}
    }
  }

  componentDidMount() 
  {
      this.tba.GetMatches(UserId).then((res) => {
        this.setState({realdata:res})
        const tableData = [];
        
        
        for (let i = 0; i < res.length; i += 1) {
            const rowData = [];
            rowData.push(`${res[i]['Match Number']}`);
            rowData.push(`${res[i]['Team Number']}`);
            tableData.push(rowData);
        }
        
        this.setState({cooljson:tableData})
    })
  }
  
  render()
  {


   
      return (
        <View style={{flex:1}}>
          
          <View>
            <Header centerComponent={{ text: 'MA #5951 Scouting Application', style: { color: '#fff' } }}
            linearGradientProps={{
              colors: ['pink','red', 'pink'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
              }}/>
          </View>
        
          <View style={styles.container}>
          <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={['M N','T N']} widthArr={[55,80]} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  this.state.cooljson.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={[55,80]}
                      style={[styles.row, index%2 && { backgroundColor: '#F7F6E7'}, !index%2 &&{ backgroundColor: '#f2eaa5'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        </View>

        </View>
      );
    

  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead: { height: 40, backgroundColor: '#c8e1ff' },
  singleHeadRed: { height: 40, backgroundColor: 'red' },
  head: { flex: 1, backgroundColor: '#c8e1ff',},
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleBlue: { flex: 2, backgroundColor: '#6da4fc' },
  titleRed: { flex: 2, backgroundColor: '#db3d3d' },
  titleText: { marginRight: 6, textAlign:'right' },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' },  dataWrapper: { marginTop: -1 },row: { height: 40, backgroundColor: '#E7E6E1' }
});





var UserId = ""
const Tab = createBottomTabNavigator();

export default function App() {
  let  [,setState] = useState();
  
  
  function handleUpdate() {
      //passing empty object will re-render the component
      setState({});
  }
  
  function setInput(val) {
    Object.assign(UserId,val);
    UserId = val;
    console.log(UserId);
    handleUpdate()

    
  }
  if(UserId == "")
  {
    return( 
      <LoginPage setInput={setInput} />
    )
  }
  else
  {
    return (
        <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
    
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } 
                    else if (route.name === 'Add Game') {
                      iconName = focused ? 'form' : 'form';
                      return <AntDesign name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === `Let's Play`) {
                      iconName = focused ? 'gamepad' : 'gamepad';
                      return <FontAwesome name={iconName} size={size} color={color} />;
                    }
                    else
                    {
                      iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                      return <Ionicons name={iconName} size={size} color={color} />;
                    }
                    
                    // You can return any component that you like here!
                    
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'tomato',
                  inactiveTintColor: 'gray',
                }}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Add Game" component={AddGameScreen}  />
                <Tab.Screen name="Let's Play" component={Game} />
                <Tab.Screen name="My Account" component={myAccoutPage}></Tab.Screen>
              </Tab.Navigator>
          </NavigationContainer>
        );
  }

}



