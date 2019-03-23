import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from '../components/general'
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions
  } from 'react-native';
import {
  fetchEvents,
  getPrivilege,
  typeChanged,
  nameChanged,
  descriptionChanged,
  dateChanged,
  timeChanged,
  locationChanged,
  epointsChanged,
  eventIDChanged,
  goToCreateEvent,
  goToViewEvent
} from '../actions';

const dimension = Dimensions.get('window');

class Events extends Component {

  static onRight = function(){
    this.alert(new Date());
  }

  componentWillMount() {
    {this.setState({modalVisible: false})}
    this.props.fetchEvents();
    this.props.getPrivilege();
  }

  renderCodeBox(){
    return (
      <Modal
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
      visible={this.state.modalVisible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {this.setState({modalVisible: false})}}>
              <Text>X</Text>
            </TouchableOpacity>
            <View style={styles.container}>
              <Text style={styles.headerTextStyle}>Enter Code</Text>
              <TextInput
              style={styles.modalTextInput}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              autoCapitalize={'characters'}
              autoCorrect={false}
              maxLength={4}
              // editable={true}
              // style={{marginTop:dimension.height*.1}}
              // inputStyle={styles.modalTextInput}
              />
            <Button title = "OK" width={70}/>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderButton(){
    if(this.props.privilege !== undefined && this.props.privilege.board === true){
      return (
          <Button
              title = "CREATE EVENT"
              onPress={this.props.goToCreateEvent.bind(this)}
          />
      )
    }else
    return(
       < Button
          title = "CHECK IN"
          onPress={() => {this.setState({modalVisible: true})}}

        />
    )
  }
  render() {

    return (
      <View>
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
              height: dimension.height *.73
            }}
            theme={{
              backgroundColor: '#0c0b0b',
              calendarBackground: '#FFF',
              agendaKnobColor: 'lightgrey',
              agendaDayTextColor: '#F7F7F2',
              agendaDayNumColor: '#F7F7F2',
              selectedDayTextColor: '#000',
              todayTextColor: '#44a1ff',
              textDayFontSize: 15,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              selectedDotColor: 'black',
              selectedDayBackgroundColor: '#FECB00',
            }}
          />
        </ScrollView>
        {this.renderCodeBox()}
        <View style={{height: dimension.height *5, backgroundColor: '#0c0b0b'}}>

          {this.renderButton()}
        </View>
      </View>
    );
  }

  getFormattedEventList() {
    var events = this.props.eventList;
    var dates = {};

    for(props in events){
      events[props]["eventID"] = props;
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

  viewEvent(item) {
    this.props.typeChanged(item.type);
    this.props.nameChanged(item.name)
    this.props.descriptionChanged(item.description)
    this.props.dateChanged(item.date)
    this.props.timeChanged(item.time)
    this.props.locationChanged(item.location)
    this.props.epointsChanged(item.points)
    this.props.eventIDChanged(item.eventID)
    this.props.goToViewEvent();
  }

  renderItem(item) {
    return (
      <TouchableOpacity onPress={this.viewEvent.bind(this,item)}>
          <View style={styles.item}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Location: {item.location}</Text>
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
  modalTextInput: {
    marginTop: dimension.height*.05,
    height: dimension.height * .091,
    textAlign: 'center',
    width: dimension.width*.6,
    backgroundColor: '#FECB0022',
    borderColor: '#FECB00',
    borderRadius: dimension.height * .01,
    borderWidth: dimension.width *.01,
    borderStyle: 'solid',
    fontWeight: 'bold',
    fontSize: 60
  },
  modalContent: {
    height: dimension.height*.35,
    width: dimension.width*.8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    height: dimension.height,
    width: dimension.width,
    backgroundColor: '#000a'
  },
  item: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: dimension.height *.020,
    marginRight: dimension.height *.010,
    marginTop: dimension.height *.02
  },
  headerTextStyle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  emptyDate: {
    flex:1,
    height: dimension.height * .015,
    paddingTop: dimension.height *.030,
  },
  emptyData: {
    height: dimension.height * .015,
    paddingTop: dimension.height * .030,
    paddingBottom: dimension.height *.04,
    marginRight: dimension.height *.010,
    marginLeft: dimension.height *.010,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: dimension.height *.017
  },
  description: {
    // marginTop: 7,
  },
});

const mapStateToProps = ({ events, auth }) => {
  const { eventList } = events;
  const { privilege } = auth;
  return { eventList, privilege };
};

const mapDispatchToProps = {
  fetchEvents,
  getPrivilege,
  typeChanged,
  nameChanged,
  descriptionChanged,
  dateChanged,
  timeChanged,
  locationChanged,
  epointsChanged,
  eventIDChanged,
  goToCreateEvent,
  goToViewEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
