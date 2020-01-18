import firebase from 'firebase';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Dimensions, TouchableOpacity, Linking, Modal, SafeAreaView, StatusBar, FlatList} from 'react-native';
import * as Progress from 'react-native-progress';
import _ from 'lodash';
import { Spinner, NavBar, Input, Button } from '../components/general'
import CodeBox from '../components/event/CodeBox'
import { Actions } from 'react-native-router-flux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
	loadUser,
	pageLoad,
	fetchMembersPoints,
	fetchMemberProfile,
	fetchEvents,
	getPrivilege,
	updateElection,
	typeChanged,
	nameChanged,
	descriptionChanged,
	dateChanged,
	startTimeChanged,
	endTimeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
	goToViewEvent,
	getCommittees,
	setDashColor,
	setFlag,
	fetchAllUsers,
    getUserCommittees,
    committeeChanged,
    goToCreateEvent,
}
from '../ducks';
import Flag from 'react-native-flags'
import {ColorPicker} from 'react-native-color-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Agenda } from 'react-native-calendars';


const dimension = Dimensions.get('window');
let dateStr =  ""
let initDate = ""


class CommitteePage extends Component {

	constructor(props) {
        super(props);
        this.state ={status: "closed", day: new Date(), visible: false}
      }

      chooseToday(){
        this.child.chooseToday()
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

	render() {

		if(this.props.loading){
		  return <Spinner/>
		}
		return this.renderContent()
	  }

	  _keyExtractor = (item, index) => index;

	  renderContent() {
		const {
		  page,
		  mainContentStyle,
		  greetingContainerStyle,
		  ContainerStyle,
		  title,
		  webTitle,
		  touchLeaderboard,
		  touchCommittee,
		  eventsContainer,
		  textColor,
		  indexText,
		  index,
		  modalText
      } = styles;


	  return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0c0b0b'}}>
         <View style = {{flexDirection: "row", justifyContent: "space-between", backgroundColor: "black", paddingRight: "10%"}}>
            <NavBar title={this.props.committeeTitle} back onBack={() => Actions.pop()} />
            <View style = {{flex: .2, alignItems: "center", justifyContent: "center", backgroundColor: "black"}}>
                <View style= {{backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end"}}>
                <Ionicons name="ios-calendar" size={dimension.height * .03} onPress = {() => this.setState({visible: !this.state.visible})} style={{color: '#FECB00'}}/>
                </View>
            </View>
            </View>
        <ScrollView style={{flex: 1, backgroundColor: "black"}}>
            <View style= {{flex: 1, height: dimension.height * 1}}>
            <View style = {{height: dimension.height * .06, justifyContent: "center"}}>
            {this.renderGreeting()}
            </View>
            {(this.state.visible) && 
            (<View style= {{backgroundColor: "black", height: dimension.height * .75, padding: "5%"}}>
                <ScrollView style={{flex:1}}>
                 <Agenda
                    key={JSON.stringify(this.props.eventList)}
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
                    items = {this.getFormattedEventList(this.props.eventList)}
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
                </View>)}
                {this.renderSelect()}
                </View>
         </ScrollView>
      </SafeAreaView>
	  );
   }

   renderSelect(){
    if(this.props.chair.id === this.props.id){

        if(this.props.joinedMembers){

        }

        return(
            <View style = {{alignItems: "center"}}>
               {this.renderJoined()}
               {this.renderPending()}
               {this.renderLinks()}
            </View>
        )
    }

        else  return null
    }   

    renderJoined(){
        if (this.props.joinedMembers === null || this.props.joinedMembers === undefined) {
            return (<Text style={{color: "white", fontSize: 16}}>No Committee Members</Text>)
        }

        return(
            <View>
                {Object.keys(this.props.joinedMembers).map(item => (
                    this.renderJoinedMembers(item)
                ))}
            </View>
        )
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
        if(this.props.privilege !== undefined && this.props.privilege.board && (this.props.chair.id === this.props.id)){
    
          return (
            <View style ={{position: "absolute", bottom: dimension.height * .032, width:"100%"}}>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
                <View style={{flex: .45}}>
                  <Button
                      title = "Create Event"
                      onPress={() =>
                        {
                        this.props.dateChanged(dateStr)
                        this.props.goToCreateEvent(this.props.screen + "committeepage", {type: "Committee", committee: this.props.committeeTitle, points: 2})}
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


    renderJoinedMembers(item) {
        var user = this.props.userList[item]

        const {
            firstName,
            lastName
        } = user

        return(
            <Text style={{color: "white", fontSize: 16}}>{firstName} {lastName}</Text>
        )
    }

    renderPending(){
        if (this.props.pendingMembers === null || this.props.pendingMembers === undefined) {
            return (<Text style={{color: "white", fontSize: 16}}>No Pending Members</Text>)
        }

        return(
            <View>
                {Object.keys(this.props.pendingMembers).map(item => (
                    this.renderPendingMembers(item)
                ))}
            </View>
        )
    }

    renderPendingMembers(){
        var user = this.props.userList[item]

        const {
            firstName,
            lastName
        } = user

        return(
            <Text style={{color: "white", fontSize: 16}}>Pending: {firstName} {lastName}</Text>
        )
    }

   renderGreeting(){
        if(this.props.chair.id === this.props.id){
            return(
                <View style = {{alignItems: "center"}}>
                <Text style={{color: "white", fontSize: 16}}>Welcome to Your Committee!</Text>
                </View>
        )

    }

        else
        return (
            <View style = {{alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 16}}>Welcome to the {this.props.committeeTitle} Committee!</Text>
            </View>
        )
   }

   renderLinks(){
        if (this.props.links=== null || this.props.links === undefined) {
            return (<Text style={{color: "white", fontSize: 16}}>No Current Links</Text>)
        }

        return(
            <View>
                {Object.keys(this.props.links).map(item => (
                    <View></View>
                ))}
            </View>
        )
   }


   getFormattedEventList(eventList) {
    if (this.props.committeeEvents === null || this.props.committeeEvents === undefined){
        return {}
    }


    let events = {}
    Object.keys(this.props.committeeEvents).forEach(function(element){
      Object.assign(events, {[element]: eventList[element]})
    })

    var dates = {};

    for(props in events){ 
    
      if (events[props] === undefined) continue

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
        this.props.goToViewEvent(this.props.screen + "committeepage");
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
          <TouchableOpacity onPress={() => this.viewEvent(item)}>
              <View style={[itemContainer, {backgroundColor: this.props.dashColor}]}>
                <Text style={[{ fontWeight: 'bold'},textColor]}>{item.name}</Text>
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


}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
	greetingContainerStyle: {
		paddingLeft: "4%",
		justifyContent: "center",
		flex: .12,
		flexDirection: "row",
	},
	textColor:{
		color: '#e0e6ed',
	},
	contentContainerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	ContainerStyle: {
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: "#FECB00",
		width: dimension.height  * .07,
		height: dimension.height * .07,
		borderRadius: 15,
		paddingBottom: "7%",
		marginBottom: '2%',
		marginLeft: '2%',
		marginRight: '2%',
		borderWidth: 1,
		borderColor: "black"
	 },
	mainContentStyle: {
		backgroundColor: 'black',
		flexDirection: 'column',
		flex: 1
	},
	progress: {
		width: dimension.width * .2,
		justifyContent: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
	},
	webTitle: {
		fontSize: 18,
		fontWeight: '500',
	},
	touchLeaderboard: {
		flex: 1,
		flexDirection:'column',
		alignItems:'center',
		justifyContent: "space-evenly",
		borderColor: 'white',
	},
	modalContent: {
        height: dimension.height*.5,
        width: dimension.width*.8,
        padding: dimension.height*.008,
        backgroundColor: '#21252b',
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
	touchCommittee: {
		flexDirection:'column',
		alignItems:'center',
		backgroundColor: 'black',
	},
	index: {
		color: '#000',
		borderColor: '#FECB00',
		backgroundColor: "#FECB00",
		borderStyle: 'solid',
		borderRadius: dimension.height*.04*.5,
		justifyContent:'center',
		alignItems: 'center',
		height: dimension.height*.04,
		width: dimension.height*.04,
	},
	indexText: {
		fontWeight: "700",
		fontSize: 20,
		color: "black",
	},
	modalText: {
        textAlign: 'center',
        fontSize:16
    },
    modalTextInput: {
        height: 80,
        textAlign: 'center',
        width: dimension.width*.6,
        backgroundColor: '#e0e6ed22',
        borderColor: '#e0e6ed',
        borderRadius: 16,
        borderWidth: 3,
        borderStyle: 'solid',
        fontWeight: 'bold',
        fontSize: 60,
		color: '#E0E6ED'
    },
	eventsContainer: {
		flex: 1,
		flexDirection:'column',
	},
	containerTextStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingVertical: 10,
		paddingHorizontal: 15,
      },
      itemContainer: {
        flex: 1,
        backgroundColor: '#21252b',
        borderRadius: 5,
        padding: dimension.height *.020,
        marginRight: dimension.height *.010,
        marginTop: dimension.height *.02
      },
      emptyData: {
        height: dimension.height * .15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21252b',
        borderRadius: 5,
        marginTop: dimension.height *.017
      },
});

const mapStateToProps = ({ user, general, members, events, elect, committees }) => {
	const { firstName, id, dashColor, flag, userCommittees, privilege} = user;
	const { loading } = general;
	const { membersPoints, userList } = members;
	const { eventList } = events;
	const { election } = elect
	const { committeeTitle, committeeEvents, chair, description, pendingMembers, joinedMembers, links } = committees 
	return { firstName, id, loading, privilege, membersPoints, eventList, election, dashColor, flag, userCommittees, committeeEvents, committeeTitle, chair, description, pendingMembers, joinedMembers, links, committeeTitle,  userList};
};

 const mapDispatchToProps = {
	loadUser,
	pageLoad,
	fetchMembersPoints,
	fetchMemberProfile,
	fetchEvents,
	getPrivilege,
	updateElection,
	typeChanged,
	nameChanged,
	descriptionChanged,
	dateChanged,
	startTimeChanged,
	endTimeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
	goToViewEvent,
	getCommittees,
	setDashColor,
	setFlag,
	fetchAllUsers,
    getUserCommittees,
    committeeChanged,
    goToCreateEvent,
};

 export default connect(mapStateToProps, mapDispatchToProps)(CommitteePage);
