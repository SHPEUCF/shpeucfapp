import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents, goToCreateEvent } from '../actions';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { RkButton } from 'react-native-ui-kitten';
import {
  TouchableOpacity,
  Alert,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView
  } from 'react-native';

class Events extends Component {

  static onRight = function(){
    this.alert(new Date());
  }

  componentWillMount() {
    this.props.fetchEvents();
  }

  render() {

    return (
      <ScrollView>
        <Agenda
          selected={new Date()}
          //onDayChange={(day)=>{alert('day pressed')}}
          showWeekNumbers={true}
          pastScrollRange={24}
          futureScrollRange={24}
          showScrollIndicator={true}
          markedItems={this.markedItems.bind(this)}
          items = {this.getFormattedEventList()}
          // Will only load items for visible month to improve performance later
          // loadItemsForMonth={this.loadItemsForMonth.bind(this)}
          renderItem={this.renderItem.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          renderEmptyDate={ this.renderEmptyDate.bind(this) }
          renderEmptyData = {this.renderEmptyData.bind(this)}

          style={{
            height: 475
          }}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: '#FFF',
            agendaKnobColor: 'lightgrey',
            agendaDayTextColor: '#333',
            agendaDayNumColor: '#333',
            selectedDayTextColor: '#000',
            todayTextColor: '#CC0000',
            textDayFontSize: 15,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
            selectedDotColor: 'black',
            selectedDayBackgroundColor: '#FECB00',
          }}
        />
        <View style={{paddingTop:20, paddingHorizontal:10}}>
          <RkButton rkType='rounded stretch'
                style={{backgroundColor: '#FECB00'}}
                contentStyle={{color: '#000', fontWeight: 'bold'}}
                onPress={this.props.goToCreateEvent.bind(this)}
                >
                Create Event
          </RkButton>
          
        </View>
      </ScrollView>
    );
  }

  getFormattedEventList() {
    var events = this.props.eventList;
    var dates = {};

    for(props in events){
      if (dates[events[props].date] === undefined)
        dates[events[props].date] = [events[props]]
      else
        dates[events[props].date].push(events[props]);
    }

    return dates;
  }

  renderEmptyDate(){
    return(
      <View>
      </View>
    );
  }

  renderEmptyData(){
    return (
      <View style={styles.emptyData}>
        <Text>No events to display on this day</Text>
      </View>
    );
  }

  markedItems() {
    const markedItems = {};
    Object.keys(items).forEach(key => { markedItems[key] = {selected: true, marked: true}});
    return markedItems;
  }

  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => Alert.alert('Event Clicked','Event Details')}>
          <View style={styles.item}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Location: {item.location}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>
            <Text>Points: {item.points}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

} // End of component class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 5,
  },
  item: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    flex:1,
    height: 15,
    paddingTop: 30,
  },
  emptyData: {
    height: 15,
    paddingTop: 30,
    paddingBottom: 30,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 17
  },
  description: {
    // marginTop: 7,
  },
});

const mapStateToProps = ({ events }) => {
  const { eventList } = events;

  return { eventList };
};

const mapDispatchToProps = {
  fetchEvents,
  goToCreateEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
