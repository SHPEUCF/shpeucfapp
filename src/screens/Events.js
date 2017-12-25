import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet }from 'react-native';
import Moment from 'moment';

import { Header, Card } from '../components/general';

var date = new Date();

let curWeekDay = date.getDay();
let curDay = date.getDate();


var BeginMonth = date.getMonth();
var BeginYear = date.getFullYear();


let fullMonthName = ["January  ","February  ",
"March  ","April  ","May  ","June  ",
"July  ","August  ","September  ","October  "
,"November  ","December  "];
let shortWeekDayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];



class Events extends Component {

state = { month:BeginMonth, year:BeginYear };

prevMonth = () => {

     if (this.state.month > 0) {
         this.setState({month: (this.state.month- 1)});
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
}
  render() {

    return (
<View style={{flex:1, }}>

  <Header headerTitle={'Events'}/>
    <View style={styles.container}>

      <View style={{flex:0,flexDirection:'row', alignItems:'center',}}>
        <TouchableOpacity style={{flex:1}}
           onPress={ this.prevMonth.bind(this)} >
        <Text style={{textAlign:'left', fontSize:20}}>{"< Back"}</Text>
      </TouchableOpacity>
    <Text style={{textAlign:'center', fontSize:24}}>{fullMonthName[this.state.month].concat(this.state.year)}</Text>
      <TouchableOpacity style={{flex:1}}
        onPress = { this.nextMonth.bind(this)} >
        <Text style={{textAlign:'right', fontSize:20}}>{"Next >"}</Text>
      </TouchableOpacity>
    </View>

      <View style={{flex:0,flexDirection:'row', }}>
              { this.renderWeekDays()}
      </View>

              { this.renderCalendarDays() }
    </View>

</View>
    )
  }

  renderWeekDays(){
    return shortWeekDayName.map((item, key)=>{
      return(
        <View key={key} style={{flex:1, alignItems:'center',
          justifyContent:'center',height:50,
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

  renderDays(week_days) {
      return week_days.map((day, key) => {
          return (

            <View
              key={key}
              style={{flex:1,
                alignItems:'center',
                justifyContent:'center',

                backgroundColor:'lightgrey',

                borderWidth:3,
                borderColor:'white'}}>
              <Text key={key} style={{
                  fontSize:18,
                  fontWeight:'100'
                }}>{day}</Text>
              <Card> </Card>
            </View>

          );
      });
  }

  renderCalendarDays(){
    var monthDays = new Date(this.state.year, this.state.month + 1, 0).getDate()
    var startMonth = new Date(this.state.year, this.state.month, 1).getDay();
    var endMonth = new Date(this.state.year, this.state.month,monthDays).getDay();


    var test2 = [];
    var count = 0;
    var oneWeek = [];
    var weeks = [];
    var totalD = 0;
    var d = 1;
    {/*if((startMonth * 7) - monthDays <= 7){*/}
      totalD = startMonth  + monthDays + ( 7 - endMonth);

    {/*creates the days array.*/}
    for(var i = 0; i <= totalD ; i++){
      if(i < startMonth){
        test2[i] = " ";
      }
      else if(d <= monthDays){
        test2[i] = d;
        d++;
      }
      else{
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

     return weeks.map((item, key) => {
       return(
         <View key={key} style={{flex:0,
             flexDirection:'row',
             alignItems:'center',
             justifyContent:'center'}}>
           { this.renderDays(item) }
         </View>
       );
     });

  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    marginTop:5,
    marginLeft:5,
    marginRight:5
  },
  text:{
    textAlign:'center',

  },

});

export { Events };
