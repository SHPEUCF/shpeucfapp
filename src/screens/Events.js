import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, NavBar } from '../components/general'
import { Agenda } from 'react-native-calendars';
import {
  TouchableOpacity,
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView
  } from 'react-native';
import {
  fetchEvents,
  getPrivilege,
  committeeChanged,
  typeChanged,
  nameChanged,
  descriptionChanged,
  dateChanged,
  startTimeChanged,
  endTimeChanged,
  locationChanged,
  epointsChanged,
  eventIDChanged,
  goToCreateEvent,
  goToViewEvent
} from '../ducks';
import { ThemeConsumer } from 'react-native-elements';

const dimension = Dimensions.get('window');
let dateStr =  ""
let initDate = ""

class Events extends Component {
  constructor(props) {
    super(props);
    this.state ={status: "closed", day: new Date()}
  }

  componentDidMount(){
    let date = new Date()
    let month = this.prepend0((date.getMonth() + 1).toString())
    let year = date.getFullYear()
    let day = this.prepend0((date.getDate()).toString())
    let stringDate = `${year}-${month}-${day}`
    dateStr = stringDate
    initDate = stringDate
  }

  static onRight = function(){
    this.alert(new Date());
  }

  prepend0(item){
    if(item < 10){
        return "0" + item;
    }
    return item
}

  getDate(item){
    dateStr = item.dateString
  }

  chooseToday(){
    this.child.chooseToday()
  }

  render() {
    const {
      textColor
    } = styles
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0c0b0b'}}>
        <View style= {{backgroundColor: "black", flex: 1}}>
        <ScrollView style={{flex:1}}>
          <Agenda
            dashColor={this.props.dashColor}
            ref={child => {this.child = child}} {...this.props}
            selected={this.state.day}
            //onDayChange={(day)=>{alert('day pressed')}}
            setPos={(stat) => this.setState({status: stat})}
            passDate={(item) => this.getDate(item)}
            showWeekNumbers={false}
            pastScrollRange={24}
            futureScrollRange={24}
            showScrollIndicator={true}
            markedItems={this.markedItems.bind(this)}
            items = {this.getFormattedEventList()}
            // Will only load items for visible month to improve performance later
            // loadItemsForMonth={this.loadItemsForMonth.bind(this)}
            renderItem={(item) => this.renderItem(item)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            renderEmptyDate={ this.renderEmptyDate.bind(this) }
            renderEmptyData = {this.renderEmptyData.bind(this)}

            style={{
              height: dimension.height *.73
            }}
            theme={{
              backgroundColor: 'black',
              calendarBackground: '#21252b',
              agendaDayTextColor: '#fff',
              agendaDayNumColor: '#fff',
              dayTextColor: '#fff',
              monthTextColor: '#FECB00',
              textSectionTitleColor: '#FECB00',
              textDisabledColor: '#999',
              selectedDayTextColor: '#000',
              selectedDayBackgroundColor: '#FECB00',
              todayTextColor: '#44a1ff',
              textDayFontSize: 15,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              selectedDotColor: 'black',
            }}
          />
        </ScrollView>
        <View style= {{flex: .1}}>
        {(initDate !== dateStr) && ( <TouchableOpacity  style= {{alignItems: "center", justifyContent: "flex-start", flex: 1}} onPress={() => this.chooseToday()}>
            <View style= {{flex: .25}}></View>
            <Text style={{color: "white", fontSize: 16}}>
                Today
            </Text>
         </TouchableOpacity>)}
         </View>
        <View style={{flex: .1}}>
            {this.renderButton()}
        </View>
        </View>
      </SafeAreaView>
    );
  }

  selectButton(){
    if (this.state.status === "closed") {

      return (<Button
          title = "Open Calendar"
          onPress={() =>{
          this.child.onSnapAfterDrag("closed")
          this.setState({status: "opened"})
        }}
      />)
    }

    else {
      return (<Button
        title = "Close Calendar"
        onPress={() =>{
        this.child.onSnapAfterDrag("opened")
        this.setState({status: "closed"})
        }}
      />)
    }
  }

  renderButton(){
    if(this.props.privilege !== undefined && this.props.privilege.board){
      return (
        <View style ={{position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
        <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
            <View style={{flex: .45}}>
              <Button
                  title = "Create Event"
                  onPress={() =>
                    {
                    this.props.dateChanged(dateStr)
                    this.props.goToCreateEvent("events")}
                    }
              />
            </View>
            <View style={{flex: .45}}>
              {this.selectButton()}
            </View>
          </View>
        </View>
      )
    }

    else {
      return(
        <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
            <View style={{flex: .3}}></View>
            <View style={{flex: 1}}>
              {this.selectButton()}
            </View>
            <View style={{flex: .3}}></View>
          </View>
      )
    }
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

    const{
      textColor,
      emptyData
    } = styles
    return (
      <View style={[emptyData, {backgroundColor: this.props.dashColor}]}>
        <Text style={textColor}>No events to display on this day</Text>
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
    this.props.committeeChanged(item.committee);
    this.props.nameChanged(item.name)
    this.props.descriptionChanged(item.description)
    this.props.dateChanged(item.date)
    this.props.startTimeChanged(item.startTime)
    this.props.endTimeChanged(item.endTime)
    this.props.locationChanged(item.location)
    this.props.epointsChanged(item.points)
    this.props.eventIDChanged(item.eventID)
    this.props.goToViewEvent("events");
  }

  renderItem(item) {
    const {
      textColor,
      itemContainer
    } = styles

    var viewName = item.type + ": " + item.name;
    if (item.committee !== ''){
      viewName = item.committee + ": " + item.name;
    }
    
    return (
      <TouchableOpacity onPress={this.viewEvent.bind(this,item)}>
          <View style={[itemContainer, {backgroundColor: this.props.dashColor}]}>
            <Text style={[{ fontWeight: 'bold'},textColor]}>{viewName}</Text>
            <Text style={textColor}>Time: {this.convertHour(item.startTime)} - {this.convertHour(item.endTime)}</Text>
            <Text style={textColor}>Location: {item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  convertHour(time){
		var array = time.split(":")

		if(array[2] === "AM") {
      var hour = "" + (parseInt(array[0])) 
      return hour + ":" + array[1] + ":" +array[2]
    }
    
		var hour = "" + (parseInt(array[0]) - 12) 
		return hour + ":" + array[1] + ":" +array[2]
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
  textColor: {
    color: 'white'
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
  itemContainer: {
    flex: 1,
    backgroundColor: '#21252b',
    borderRadius: 5,
    padding: dimension.height *.020,
    marginRight: dimension.height *.010,
    marginTop: dimension.height *.02
  },
  headerTextStyle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  emptyData: {
    height: dimension.height * .15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21252b',
    borderRadius: 5,
    marginTop: dimension.height *.017
  },
  description: {
    // marginTop: 7,
  },
});

const mapStateToProps = ({ events, user }) => {
  const { eventList } = events;
  const { privilege, dashColor } = user;
  return { eventList, privilege, dashColor};
};

const mapDispatchToProps = {
  fetchEvents,
  getPrivilege,
  committeeChanged,
  typeChanged,
  nameChanged,
  descriptionChanged,
  dateChanged,
  startTimeChanged,
  endTimeChanged,
  locationChanged,
  epointsChanged,
  eventIDChanged,
  goToCreateEvent,
  goToViewEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
