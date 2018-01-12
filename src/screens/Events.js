import React, { Component } from 'react';
import {
  TouchableOpacity,
  Button,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView
  } from 'react-native';
import Moment from 'moment';
import { Card, SegmentBtn } from '../components/general';

let date = new Date();

let curWeekDay = date.getDay();
let curDay = date.getDate();

let BeginMonth = date.getMonth();
let BeginYear = date.getFullYear();

let todayKey;

let fullMonthName = ["January  ","February  ",
"March  ","April  ","May  ","June  ",
"July  ","August  ","September  ","October  "
,"November  ","December  "];
let shortWeekDayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];


class Events extends Component {

  state = { month:BeginMonth, year:BeginYear, selectedDay:date, show:false };

  prevMonth = () => {
    if (this.state.month > 0) {
      this.setState({month: (this.state.month - 1)});
      this.setState({year: (this.state.year)});
    } else {
      this.setState({month: 11});
      this.setState({year: (this.state.year - 1)});
    }
  };

  nextMonth = () => {
    if (this.state.month < 11) {
      this.setState({month: (this.state.month + 1)});
      this.setState({year: (this.state.year)});
    } else {
      this.setState({month: 0});
      this.setState({year: (this.state.year + 1)});
    }
  };
// This func render the names of the week days.
  renderWeekDays() {
    return shortWeekDayName.map((item, key) => {
      return(
        <View key={key} style={{flex:1, alignItems:'center',
          justifyContent:'center',height:70,
          backgroundColor:'grey',borderWidth:3,
          borderColor:'white'}}>
            <Text key={key}
              style={{fontWeight:'900',
                color:'white'}}>
                {item}
            </Text>
          </View>
        );
      });
    }


  renderDays(week_days, len) {
    return week_days.map((day, key) => {
      var mapDate = new Date(this.state.year, this.state.month, day).toDateString();
      return (
        <TouchableOpacity
          key={key}
          onPress={()=> this.datePress(day)}
          style={{flex:1,
            alignItems:'center',
            justifyContent:'flex-start',
            backgroundColor:this.daySelectedColor(day),
            borderWidth:3,
            borderColor:'white',
            height:(Dimensions.get('window').height/len)-48}}>
            <Text key={key} style={{
                fontSize:18,
                fontWeight:date.toDateString() == mapDate ?'900':'100',
                color:date.toDateString() == mapDate ?'#1c5f68':'black',
                textAlign:date.toDateString() == mapDate ? 'center':'left',
              }}>
              {day}
            </Text>
            <Card></Card>

        </TouchableOpacity>
      );
    });
  }

  renderCalendarDays() {
    let monthDays = new Date(this.state.year, this.state.month + 1, 0).getDate();
    let startMonth = new Date(this.state.year, this.state.month, 1).getDay();
    let endMonth = new Date(this.state.year, this.state.month,monthDays).getDay();


    let test2 = [];
    let count = 0;
    let oneWeek = [];
    let weeks = [];
    let totalD = 0;
    let d = 1;
    {/*if((startMonth * 7) - monthDays <= 7){*/}
    totalD = startMonth  + monthDays + ( 7 - endMonth);

    {/*creates the days array.*/}
    for(let i = 0; i <= totalD ; i++) {
      if (i < startMonth) {
        test2[i] = " ";
      }
      else if (d <= monthDays) {
        test2[i] = d;
        //if (d == curDay){
          //this.setState({selectedDay:i});}
        d++;
      } else {
        test2[i] = " ";
      }
    }
    {/*creates an array with seven days array.*/}
    test2.forEach((item) => {
      count += 1;
      oneWeek.push(item);
      if(count == 7){
        weeks.push(oneWeek);
        oneWeek = [];
        count = 0;
      }
    });
    return weeks;
}
renderMonth(){
var weeks = this.renderCalendarDays();

    return weeks.map((item, key) => {
      return(
        <View key={key} style={{flex:1,
            flexDirection:'row',
            alignItems:'flex-start',
            justifyContent:'center',}}>
            { this.renderDays(item, weeks.length) }
          </View>
        );
      });
    }

      daySelectedColor(day){
        var newDate = new Date(this.state.year, this.state.month, day).toDateString();
        var stateDate = this.state.selectedDay.toDateString();
      return newDate == stateDate ? 'lightgrey':'white';
    }
datePress(day){

      if(day != " " ){
        this.setState({show:true});

        if(this.state.selectedDay.getDate() != day){

        var tempDate = new Date(this.state.year, this.state.month, day);
        this.setState({selectedDay:tempDate});
      }
    }
  }
showDayInfo(){
  if(this.state.show){
    return(
      <View style={styles.overlay}>
          <View style={styles.display}>
            <View style={{flex:0, alignItems:'flex-end', marginRight:6}}>
              <Button title={"X"} onPress={()=> {this.setState({show:false})}}
                style={{flex:2,fontSize:48, color: '#000000'}}/>
            </View>
            <ScrollView style={{margin:2, marginBottom:6, backgroundColor:'lightgrey'}}>
            </ScrollView>
          </View>
      </View>
    );
  }
  else{
    return(null);
  }
}



  render() {

    return (
      <View style={{ flex:1 }}>

        <View style={styles.container}>

          {/*]<Text>{new Date(this.state.year, this.state.month, 11).toDateString()+" | "+this.state.selectedDay.toDateString()}</Text>*/}
          <SegmentBtn
            leftText={"Month"}
            rightText={"List"}
            borderColor={'gold'}
            color={'gold'}
            screen1={
              <View style={{flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              margin:3}}>
              <View style={{flex:0,flexDirection:'row', alignItems:'center',}}>
                <TouchableOpacity style={{flex:1}}
                  onPress={this.prevMonth.bind(this)} >
                  <Text style={{textAlign:'left', fontSize:20}}>{"< Back"}</Text>
                </TouchableOpacity>
                <Text style={{textAlign:'center', fontSize:24}}>{fullMonthName[this.state.month].concat(this.state.year)}</Text>
                <TouchableOpacity style={{flex:1}}
                  onPress = {this.nextMonth.bind(this)} >
                  <Text style={{textAlign:'right', fontSize:20}}>{"Next >"}</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex:0, flexDirection:'row'}}>
                { this.renderWeekDays() }
              </View>
              { this.renderMonth() }
              </View>
            }
            screen2={
              <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'gold', fontWeight:'900', fontSize:30}}>FBGM</Text>
                </View>
            }/>

        </View>
          {this.showDayInfo()}
      </View>
    );
  }

} // End of component class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 5,
    backgroundColor:'white',
  },
  text: {
    textAlign: 'center',
  },
  overlay:{
    flex:1,
    position:'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#00000095',
  },
  display:{
    flex:1,
    margin:20,
    backgroundColor:'white',
    borderRadius:10,
  }
});

export { Events };
