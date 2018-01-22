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

  state = { data: [], items: {} };

  componentWillMount() {
      axios.get('https://api.myjson.com/bins/7jlzt')
      .then(response => this.setState({ data: response.data }))
  }

  render() {

    return (
      <Agenda
        selected={new Date()}
        onDayChange={(day)=>{alert('day pressed')}}
        showWeekNumbers={true}
        pastScrollRange={24}
        futureScrollRange={24}
        showScrollIndicator={true}
        markedItems={this.markedItems.bind(this)}

        items={this.state.items}
        loadItemsForMonth={(this.loadItems.bind(this))}
        renderItem={this.renderItem.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderEmptyDate={ this.renderEmptyDate.bind(this) }
        renderEmptyData = {this.renderEmptyData.bind(this)}

        theme={{
          backgroundColor: 'transparent',
          calendarBackground: '#FFF',
          agendaKnobColor: 'lightgrey',
          agendaDayTextColor: '#333',
          agendaDayNumColor: '#333',
          selectedDayTextColor: '#000',
          todayTextColor: '#CC0000',
          textDayFontSize:18,
          textMonthFontSize:22,
          textDayHeaderFontSize:14,
          selectedDotColor: 'black',
          selectedDayBackgroundColor: '#FECB00',
        }}
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
      <View style={styles.emptyData}>
        <Text>No events to display on this day</Text>
      </View>
    );
  }

  loadItems() {
    const newItems = {};

    setTimeout(() => {
      // Transform date to form 'YYYY-MM-DD' from current JSON format
      this.state.data.map((calendar) => {
        const year = calendar.year;
        calendar.months.map((aMonth) => {
          const month = (aMonth.month >= 1 && aMonth.month <= 9) ?
          `0${aMonth.month}` : `${aMonth.month}`
          aMonth.days.map((aDay) => {
            const day = (aDay.day >= 1 && aDay.day <= 9) ?
            `0${aDay.day}` : `${aDay.day}`
            // Create items object
            const date = `${year}-${month}-${day}`;
            newItems[date] = aDay.events;
            this.setState({
              items: newItems
            });
          });
        });
      });
    }, 1000);
  }

  markedItems() {
    const markedItems = {};
    Object.keys(this.state.items).forEach(key => { markedItems[key] = {selected: true, marked: true}});
    return markedItems;
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text style={{ fontWeight: 'bold' }}>{item["title"]}</Text>
        <Text>{item["time"]}</Text>
        <Text>{item["location"]}</Text>
        <View>
          <Text style={styles.description}>{item["description"]}</Text>
        </View>
    </View>
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
    marginTop: 7,
  },
});

export { Events };
