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
import axios from 'axios';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


class Events extends Component {

  constructor(props) {
  super(props);
  this.state = {
    items: {}
  };
}

componentWillMount() {
    axios.get('https://api.myjson.com/bins/16upy5')
    .then(response => this.setState({ items: response.data}))
    .then(console.log(this.state.items));
}

render() {
  const gbm = {key:'gmb', color: 'gold'};
  const shpeJr = {key:'shpeJr', color: '#000080', selectedColor: 'blue'};
  const mentorSHPE = {key:'mentorSHPE', color: '#400080', selectedColor: 'blue'};
  const workshop = {key:'workshop', color: 'orange'};
  const event = {key:'event', color:'black'};
console.log(this.state);

  return (

    <Agenda

selected={new Date()}
onCalendarToggled={(calendarClosed) => {console.log(calendarClosed)}}
showWeekNumbers={true}
pastScrollRange={24}
futureScrollRange={24}
showScrollIndicator={true}
markingType={'multi-dot'}

         markedDates={{
           '2018-01-22': {dots: [shpeJr, mentorSHPE, workshop],},
           '2018-01-23': {dots: [mentorSHPE, workshop], },
           '2018-01-24': {dots: [gbm]}
          }}

          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          renderEmptyDate={ this.renderEmptyDate.bind(this) }
          renderEmptyData = {this.renderEmptyData.bind(this)}


          theme={{calendarBackground: '#ffffff', agendaKnobColor: 'lightgrey',
          textDayFontSize:18, textMonthFontSize:20, textDayHeaderFontSize:18}}

    />
  );
}

renderEmptyDate(){
  return(
    <View>
      <Text>There are not events today.</Text>
    </View>
  );
}

renderEmptyData(){
  return (
    <View>
      <Text>No items to display</Text>
    </View>
  );
}

loadItems(day) {
  setTimeout(() => {
    {/*for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        const numItems = Math.floor(Math.random() * 5);
        for (let j = 0; j < numItems; j++) {
          this.state.items[strTime].push({
            name: 'Item for ' + strTime,
            height: Math.max(50, Math.floor(Math.random() * 150))
          });
        }
      }
    }*/}
    //console.log(this.state.items);
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    this.setState({
      items: newItems
    });
  }, 1000);
  // console.log(`Load Items for ${day.year}-${day.month}`);
}

renderItem(item) {
  return (
    <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
  );
}

rowHasChanged(r1, r2) {
  return r1.name !== r2.name;
}

timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
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
