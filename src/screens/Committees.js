import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Input, NavBar } from '../components/general';
import _ from 'lodash';
import {
  getCommittees, 
  changeUserCommittees,
  getUserCommittees,
  typeChanged,
	nameChanged,
	descriptionChanged,
	dateChanged,
	timeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
  goToViewEvent,
  loadCommittee
} from '../ducks';
import { Avatar } from 'react-native-elements';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
  } from 'react-native';
  import Ionicons from 'react-native-vector-icons/Ionicons';

  const dimension = Dimensions.get('window');
  const iteratees = ['level'];
  const order = ['asc'];

  class Committees extends Component {

    constructor(props) {
      super(props);
      this.state = {opened: {}}
      }

  componentDidMount() {
    this.props.getCommittees();
  }

  render() {
    const {
        tabBar,
        tabBarText,
        content,
        page,
    } = styles;   

    const {
      committeesList,
    } = this.props;

    const committeesArray = _.orderBy(committeesList, iteratees, order)

    return (
     <SafeAreaView style={page}>
        <NavBar title="Committees" back onBack={() => Actions.pop()} />
        <View style={content}>
          {this.renderFlatlist(committeesArray)}
        </View>
    </SafeAreaView>
    );
  }

  toggleEvents(title){
    if (this.state.opened[title] !== null && this.state.opened[title] !== undefined){
      return null
    }

    else {
      return true
    }
  }

  filterDates(date){
    temp_date = date.split("-");
    let thisdate = new Date()
    let month = (thisdate.getMonth() + 1)
    let year = thisdate.getFullYear()
    let day = (thisdate.getDate())

    if (temp_date[0] < parseInt(year)) return true
    if (temp_date[1] < parseInt(month)) return true
    if (temp_date[2] < parseInt(day)) return true
  }

  _keyExtractor = (item, index) => index;

  renderFlatlist(committees){
    return(
      <View style= {{}}>
      <FlatList
          data={committees}
          extraData={this.props}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          this.renderCommittees(item)
        )}
      />
      </View>
    )
  }

  sortEvents(eventIds, eventList){
    let events = {}
    eventIds.forEach(function(element){
      Object.assign(events, {[element]: eventList[element]})
    })
   
    let sortedEvents = _.orderBy(events, ['date', 'startTime', 'endTime'], ['asc', 'asc', 'asc']);

    return sortedEvents
  }

  viewCommittee(item){
    this.props.loadCommittee(item)
    Actions["CommitteePageC"]({screen: "committees"});
  }


  renderCommittees(item) {
    const {
      containerStyle,
      contentContainerStyle,
      textColor
    } = styles;

    if (this.props.screen === "dashboard"){
      return (
        <View >
        <View style={contentContainerStyle}>
            <View style={{flex: .3}}></View>
              <View style={containerStyle}>
                <Text style={[textColor, {fontSize: 16}]}>{item.title}</Text>
              </View>
              {(!(this.props.userCommittees === null || this.props.userCommittees === undefined) && this.props.userCommittees[item.title])&&(<View style= {{backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end"}}>
                <Ionicons name="ios-star" size={dimension.height * .03} onPress = {() => this.props.changeUserCommittees({[item.title]: null})} style={{color: '#FECB00'}}/>
              </View>)}
                {(this.props.userCommittees === null || this.props.userCommittees === undefined || !this.props.userCommittees[item.title])&&(<View style= {{backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end"}}>
                <Ionicons name="ios-star-outline" size={dimension.height * .03} onPress= {() => {if (Object.entries(this.props.userCommittees).length <= 4) this.props.changeUserCommittees({[item.title]: true})}} style={{color: '#FECB00'}}/>
                </View>)}
            <View style={{flex: .3}}></View>
        </View>
        </View>
      )
    }

   
    return (
      <View >
      <TouchableOpacity onPress={() => this.viewCommittee(item)} style={contentContainerStyle}>
          <View style={{flex: .3}}></View>
            <View style={containerStyle}>
              <Text style={[textColor, {fontSize: 16}]}>{item.title}</Text>
            </View>
            {((this.state.opened[item.title] !== true)&&
              <View style= {{backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end"}}>
              <Ionicons name="ios-calendar" size={dimension.height * .03} onPress = {() => {this.setState({opened: Object.assign(this.state.opened, {[item.title]: this.toggleEvents(item.title)})})}} style={{color: 'white'}}/>
            </View>)}
            {((this.state.opened[item.title] === true)&&
              <View style= {{backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end"}}>
              <Ionicons name="ios-calendar" size={dimension.height * .03} onPress = {() => {this.setState({opened: Object.assign(this.state.opened, {[item.title]: this.toggleEvents(item.title)})})}} style={{color: '#FECB00'}}/>
            </View>)}
            <View style ={{ flex: 1}}></View>
            <View style = {{flex: .6, justifyContent: "center"}}>
            <Ionicons name="ios-arrow-dropright" size={dimension.height * .025} style={{color: '#FECB00', backgroundColor: "transparent", alignSelf: "center"}}/>
            </View>
          <View style={{flex: .3}}></View>
      </TouchableOpacity>
      {(this.state.opened[item.title] !== null && this.state.opened[item.title] !== undefined && item.events != null && item.events != undefined) &&
        (<View style={{}}>
        <FlatList
            data={this.sortEvents(Object.keys(item.events), this.props.eventList)}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={({item, separators}) => (
            this.renderEvents(item)
          )}
        />
        </View>)}
      </View>
    )
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

  renderEvents(event) {
    const {
      containerStyle,
      contentContainerStyle,
      textColor,
      eventStyle
    } = styles;

    if (this.filterDates(event.date) || event === null || event === undefined) return null

		const {
			name,
			date,
			description,
			committee,
			startTime,
			endTime,
			type
		} = event;

		if (description !== undefined && description.length > 75) {
			description = description.slice(0, 75);
			description += '...';
		}

		var viewName = type  + ": " + name;

		if (committee !== ''){
		viewName = committee + ": "  + name;
    }
    
    var realStart = this.convertHour(startTime)
		var realEnd = this.convertHour(endTime)
   
    return (
      <View>
      <View style={[contentContainerStyle, {backgroundColor:"#0c0b0b"}]}>
      <View style={{flexDirection: "row", flex: 1}}>
			<View style = {{flex: .1}}></View>
			<View style={{alignItems:'center', flexDirection: "row", borderColor: "white", flex: 1}}>
				<View style={{flex: 1, alignItems: "flex-start"}}>
					<View style={{alignItems: "flex-start"}}>
						<Text style={{color: "white", fontSize: dimension.width * .035}}>{name}</Text>
						<Text style={{color: "white", fontSize: dimension.width * .035}}>{this.convertNumToDate(date)} - {realStart} - {realEnd} </Text>
					</View>
				</View>
				<View style ={{flex:.08, height: "60%"}}></View>
			</View>
		</View>
      </View>
      </View>
    )
  }

  convertHour(time){
  var array = time.split(":")

  if(array[2] === "AM") {
  var hour = "" + (parseInt(array[0])) 
  if (hour === "0") hour = "12"
  return hour + ":" + array[1] + ":" +array[2]
  }
  
  var hour = "" + (parseInt(array[0]) - 12) 
  if (hour === "0") hour = "12"
  return hour + ":" + array[1] + ":" +array[2]
  }

  convertNumToDate(date) {
		var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		temp_date = date.split("-");
		return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}`;
	}

  

  renderbuttons(item){

    const {
      position,
      id,
      firstName,
      lastName
    } = item

    const{
      deleteApplication,
      approveApplication
    } = this.props

    const {
      buttonContainerStyle
    } = styles;

    if(!item.approved){
      return (
        <View style = {[{flexDirection: 'row', flex: 1}]}>
            <View style= {buttonContainerStyle}>
              <TouchableOpacity
              onPress={() => approveApplication( position, id, firstName, lastName)}>
                <Ionicons name="md-checkmark-circle" size={40} color='#e0e6ed'/>
              </TouchableOpacity>
            </View>
            <View style= {buttonContainerStyle}>
              <TouchableOpacity
              onPress={() => deleteApplication( position, id)}>
                <Ionicons name="md-close-circle" size={40} color='#e0e6ed'/>
              </TouchableOpacity>
            </View>
          </View>
      )
    }

    else{
      return (
        <View style = {[{flexDirection: 'row', flex: 1}]}>
          <View style= {buttonContainerStyle}>
          <TouchableOpacity onPress={() => this.viewCandidate(item)}>
            <Ionicons name="md-create" size={40} color='#e0e6ed'/>
          </TouchableOpacity>
          </View>
          <View style= {buttonContainerStyle}>
            <TouchableOpacity
            onPress={() => deleteApplication( position, id)}>
              <Ionicons name="md-remove-circle" size={40} color='#e0e6ed'/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  tabBar : {
    height: dimension.height * .1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0005",
  },
  containerStyle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'black',
    paddingHorizontal: 15,
  },
  eventStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  containerTextStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textColor: {
    color: 'white'
  },
  contentContainerStyle: {
    backgroundColor: 'black',
    height: dimension.height * .09,
    flexDirection: "row"
  },
  tabBarText : {
    color: '#000',
    fontSize: 20,
    margin: 20,
    alignSelf: "center"
  },
  content: {
    flex: .98,
    backgroundColor: "black"
  },
  buttonContainerStyle: {
    flex: .5,
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: '#0c0b0b',
  },
  candidateContainer: {
    flex: .5,
    marginTop: dimension.height * .002,
    flexDirection: 'row',
    justifyContent: 'center',
    height: dimension.height * .09,
  },
});

  const mapStateToProps = ({ committees, user, events}) => {
    const { committeesList } = committees;
    const { userCommittees } = user 
    const { eventList } = events

    return { committeesList, Committees, userCommittees, eventList};
  };

  const mapDispatchToProps = {
    getCommittees,
    changeUserCommittees,
    getUserCommittees,
    typeChanged,
    nameChanged,
    descriptionChanged,
    dateChanged,
    timeChanged,
    locationChanged,
    epointsChanged,
    eventIDChanged,
    goToViewEvent,
    loadCommittee
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Committees); 