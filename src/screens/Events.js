import React, { Component } from 'react';
import {Image, Text, View, StyleSheet }from 'react-native';
import Moment from 'moment';

import { Header, Card } from '../components/general';


class Events extends Component {

//new Date(2017, 11 + 1, 0).getDate() returns the amount of days in the month

  render() {
    const curDate =new Date();
    const curMonth = new Date().getMonth();
    const curWeekDay = new Date().getDay();
    const curDay = new Date().getDate();
    const curYear = new Date().getFullYear();
    const monthDays = new Date(curYear, curMonth + 1, 0).getDate()


    return (
      <View style={{flex:1, }}>
        <Header headerTitle={'Events'} />
        <View style={styles.container}>
          {/*<Image style={{margin:10, height:100, width:100, backgroundColor:'orange'}} source={{uri:'https://reactjs.org/logo-og.png'}}/>
          <Card style={{fle:1,height:20, width:40, backgroundColor:'green'}}/>*/}
          <View style={{flex:1, flexDirection:'row', marginLeft:5, marginRight:5}}>

            {shortWeekDayName.map((item, key)=>(
              <View key={key} style={{flex:1, alignItems:'center',
                justifyContent:'center',height:50,
                backgroundColor:'grey',borderWidth:3,
                borderColor:'white'}}>
                <Text key={key} style={{fontWeight:'900', color:'white'}}>
                  {item}
                </Text>
              </View>))}


          </View>
        </View>
      </View>
    )
  }
}



const fullMonthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const shortWeekDayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:5,
    justifyContent:'space-between',
    alignItems:'flex-start',
  },
  text:{
    textAlign:'center',

  }
});

export { Events };
