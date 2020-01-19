import firebase from 'firebase';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Dimensions, TouchableOpacity, Linking, Modal, SafeAreaView, StatusBar} from 'react-native';
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
	committeeChanged,
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
	loadCommittee
}
from '../ducks';
import Flag from 'react-native-flags'
import {ColorPicker} from 'react-native-color-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';


const dimension = Dimensions.get('window');

const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

const iterateesC = ['level'];
const orderC = ['asc'];

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {colorPicker: false, flags: false, newFlag: false}
	  }

	componentDidMount() {
		this.props.pageLoad();
		this.props.getCommittees();
		this.props.updateElection();
		this.props.fetchMembersPoints();
		this.props.fetchEvents();
		this.props.getPrivilege();
		this.props.loadUser();
		this.props.fetchAllUsers();
	}

	didBlurSubscription = this.props.navigation.addListener(
		'didBlur',
		() => {
		  this.setState({refresh: true});
		}
	  );

	colorPicked(color) {
		this.props.setDashColor(color)
		this.setState({colorPicker: false})
	}

	flag(){
		return(		
			<View style={{justifyContent: "center"}}>
				<TouchableOpacity onPress={()=> this.setState({flags:!this.state.flags})} >
				<Flag
					type="flat"
					code={this.props.flag}
					size={32}
				/>
				</TouchableOpacity>
			  </View>
		)
	}

	flagPicked(flag){
		if (flag === '') this.setState({flags: false, newFlag: true})
		else {
		this.props.setFlag(flag)
		this.setState({flags: false})
		}
	}

	viewCommittee(item){
		this.props.loadCommittee(item)
		Actions["CommitteePageD"]({screen: "dashboard"});
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
		  title,
		  textColor
	  } = styles;

	  return (
		<SafeAreaView style={page}>
			<StatusBar backgroundColor="#0c0b0b" barStyle="light-content" />
			{this.renderColorPicker()}
					<View style={mainContentStyle}>
						<View style= {{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>				
						<ScrollView style= {{flex: 1}}>
						<View style = {{flex: 1, height: dimension.height *1.3}}>
						{this.renderHeader()}
							<View style={{flex: 1, paddingLeft: "5%", paddingRight: "5%"}}>
							<View style={{flex: .2, flexDirection: "row"}}></View>
							<View style={{alignItems: "center", flex: .2, justifyContent: "center"}}>
								<Text style={[title, textColor]}>Upcoming Events</Text>
							</View>
							{this.getFormattedEventList()}
								<View style={{flex: .03, flexDirection: "row"}}></View>
								<View style={{flexDirection: "row", alignItems: 'flex-start', flex: .9, borderColor: "white"}}>
									{this.renderLeaderboard()}
									<View style={{flex:.05}}></View>
									{this.renderCommitteePanel()}
								</View>
							</View>
						{/*<View style={ContainerStyle}>
							<Text style={[title, textColor]}>Committees</Text>
							<Text style={textColor}>Coming soon!</Text>
						</View>*/}
							{this.renderButtonLinks()}
						</View>
					</ScrollView>
					{this.renderFlags()}
					</View>
					{this.renderNewFlag()}
					</View>
		</SafeAreaView>
	  );
   }

  renderColorPicker(){

	return(
	<Modal visible={this.state.colorPicker}  transparent={true}>
		<View style={[styles.modalBackground, {backgroundColor: "transparent"}]}>
			<ColorPicker
			defaultColor="#21252b"
			oldColor={this.props.dashColor}
			onColorSelected={color => this.colorPicked(color)}
			style={[styles.modalContent, {backgroundColor: "black"}]}
			/>
		</View>
  	</Modal>
	) 
  }

  renderHeader(){
	const {
		greetingContainerStyle,
	} = styles;

	return(
	<View style={[greetingContainerStyle, {backgroundColor: this.props.dashColor, justifyContent: "center"}]}>
		{this.greeting()}
		<View style={{justifyContent: "space-evenly",  alignItems: "center", paddingLeft: "2%", paddingRight: "2%"}}>
		{this.flag()}
		<View style={{justifyContent: "center", alignItems: "center"}}>
			<FontAwesomeIcon style={{color: 'white'}} name="chevron-down" onPress={()=> this.setState({colorPicker:true})} size={15}/>
		</View>
		</View>
	</View>
	)
  }

  renderEvents(){
	const {
		title,
		eventsContainer,
		textColor,
	} = styles;

	return(
		<View>
			{this.getFormattedEventList()}
		</View>
	)
  }

  renderLeaderboard(){
	const {
		title,
		touchLeaderboard,
		textColor,
		indexText,
		index,
	} = styles;

	const { currentUser } = firebase.auth();

	  let sortedMembers = _.orderBy(this.props.membersPoints, iteratees, order);
	  var currentMember;
	  var pastPoints = 0;
	  var pastIndex = 1;
	  sortedMembers.forEach((x, index) => {
		  x.index = (x.points !== 0) ? index + 1 : sortedMembers.length;
		  if(x.points === pastPoints){
			  x.index = pastIndex
		  }
		  if (x.id === currentUser.uid) {
			  currentMember =  x;
		  };
		  pastPoints = x.points;
		  pastIndex = x.index;
	  });
	  sortedMembers.splice(2);
	  if (this.isDefined(currentMember) && this.isDefined(sortedMembers) && sortedMembers[0].id !== currentMember.id && sortedMembers[1].id !== currentMember.id)
		  sortedMembers[1] = currentMember;

	  if (currentMember === undefined) return null

	return(
	<TouchableOpacity style={{backgroundColor: '#21252b', flex: 1}} onPress={() => Actions.LeaderboardD()}>
		<View style={touchLeaderboard}>
				<View >
					<Text style={[title, textColor]}>Top Member</Text>
				</View>
				<View style={{justifyContent: "center", alignItems: "flex-start"}}>
					<Text style={{color: 'white'}}>{sortedMembers[0].firstName} {sortedMembers[0].lastName}</Text>
				</View>	
		</View>
		<View style={{flex: .3, alignSelf: "center", width: "80%", flexDirection: "row", alignItems: "center"}}>
			<View style={{flex: 1, height: dimension.height * .003, backgroundColor: "black"}}></View>
			<View style = {{flex: .6}}>
				<Ionicons name="ios-arrow-dropright" size={dimension.height * .025} style={{color: '#FECB00', backgroundColor: "transparent", alignSelf: "center"}}/>
			</View>
			<View style={{flex: 1, height: dimension.height * .003, backgroundColor: "black"}}></View>
		</View>
		<View style={touchLeaderboard}>
				<View >
					<Text style={[title, textColor]}>Your Ranking</Text>
				</View>
				<View style={{justifyContent: "center", alignItems: "center"}}>
					<View style={[index, {borderColor: '#FFC107', }]}>
						<Text style={[indexText, {color: 'black'}]}>{currentMember.index}</Text>
					</View>
				</View>
		</View>
	</TouchableOpacity>
	)
  }

  renderCommitteePanel(){
	const {
		touchCommittee,
		textColor,
	} = styles;

	const committeesArray = (this.props.userCommittees !== null &&  this.props.userCommittees !== undefined) ? Object.entries(this.props.userCommittees) : ["Add your main committees!"]

	return(
	<View style = {{flexDirection: "row", flex: 1, height: "100%", backgroundColor: "#21252b", alignItems: "center"}}>
		<View style ={{height: "100%", justifyContent: "flex-start", alignItems: "center", flex: .25, paddingTop: "5%"}}>
			<Ionicons name="ios-information-circle" size={dimension.height * .028} onPress = {() => Actions["CommitteesD"]({screen: 'dashboard'})} style={{color: '#FECB00'}}/>	
		</View>
		<View style = {{flex: 1, backgroundColor: "#21252b",justifyContent: "space-evenly", height: "80%"}}>
		{Object.values(committeesArray).map(item => (
			<TouchableOpacity style={[touchCommittee, {flex: .5, backgroundColor: "#21252b"}]} onPress={() => {this.viewCommittee(this.props.committeesList[item[0]])}}>
				<View style={{justifyContent: "center", width: "100%", alignItems: "center", flex: 1, flexDirection: "row", backgroundColor: "#21252b"}}>
					<View style = {{flex: .8, alignItems: "flex-start", justifyContent: "space-evenly"}}>
						<View style = {{}}>
							<Text style={[textColor, {fontSize: dimension.width * .03}]}>{item[0]}</Text>
						</View>
					</View>
					<View style = {{flex: .2}}></View>
					<View style = {{flex: .3}}>
						<View style= {{alignItems: "flex-end", justifyContent: "center", flex: 1, paddingRight: dimension.width * .03}}>
							<Ionicons name="ios-arrow-dropright" size={dimension.height * .025} style={{color: '#FECB00'}}/>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		))}
		</View>
	</View>
	)
  }

  renderButtonLinks(){
	const {
		ContainerStyle,
	} = styles;

	return(
	<View style={{flex: .35, alignItems: 'center'}}>
		<View style={{flex:.1}}></View>
		<View style={{flexDirection: 'row', justifyContent: 'center', flex: 1, alignItems: "center"}}>
			<TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://shpeucf2018-2019.slack.com/')}>
				<FontAwesomeIcon style={{color: 'black'}} name="slack" size={dimension.height*.04}/>
			</TouchableOpacity>
			<TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://www.facebook.com/shpeucfchapter/')}>
				<FontAwesomeIcon style={{color: 'black'}} name="facebook" size={dimension.height*.04}/>
			</TouchableOpacity>
			<TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://www.shpeucf.com/')}>
				<FontAwesomeIcon style={{color: 'black'}} name="globe" size={dimension.height*.04}/>
			</TouchableOpacity>
			<TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://www.instagram.com/shpeucf/?hl=en')}>
				<FontAwesomeIcon style={{color: 'black'}} name="instagram" size={dimension.height*.04}/>
			</TouchableOpacity>
		</View>
		<View style={{flex:.6}}></View>
		{this.renderFooter()}
	</View>
	)
  }

  renderFooter(){
	return(
	<View style={{flex:.3, justifyContent: "center", backgroundColor: "#FECB00", width: "100%"}}>
		<View style={{flexDirection: "row", justifyContent: "center"}}>
			<Text style={{color: "black"}}>SHPE </Text>
			<Text style={{color: "white"}}>UCF</Text>
		</View>
	</View>
	)
  }

  renderFlags(){
	const flagHeight = dimension.height - (.3 * dimension.height)
	countriesL = ["AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN"]
	countriesR = ["MX", "NI", "PA", "PY", "PE", "PR", "RO", "ES", "TT", "US", "UY", "VE", '']

	return(
		<Modal visible={this.state.flags} transparent={true}>
			<SafeAreaView style={{position: "absolute", flexDirection: "row", width: dimension.width, height: flagHeight, justifyContent: "space-between", top: dimension.height * .15, paddingLeft: "2%", paddingRight: "2%"}}>
				<View style={{justifyContent:'space-evenly',borderColor: "white"}}>
					{countriesL.map(item => (
					<TouchableOpacity onPress={() => this.flagPicked(item)}>
						<Flag
						type="flat"
						code={item}
						size={32}
					/>
					</TouchableOpacity>
					))}
				</View>		
				<View style={{justifyContent:'space-evenly',borderColor: "white"}}>
					{countriesR.map(item => (
					<TouchableOpacity onPress={() => this.flagPicked(item)}>
						<Flag
						type="flat"
						code={item}
						size={32}
					/>
					</TouchableOpacity>
					))}
				</View>
			</SafeAreaView>
		</Modal>
	)
  }

  renderNewFlag(){
	const {
		textColor,
		modalText
	} = styles;

	return(
	<Modal visible={this.state.newFlag} transparent={true}>
		<View style={styles.modalBackground}>
			<View style={styles.modalContent}>
				<View style={{justifyContent: "center", flex: 1}}>
					<Text style={[modalText, textColor]}>Look up your two digit country ISO code and enter it!</Text>
				</View>
				<View style={{flex: 1, alignItems: "center"}}>
					<TextInput
					style={styles.modalTextInput}
					onChangeText={(text) => this.setState({text: text})}
					value={this.state.text}
					autoCapitalize={'characters'}
					autoCorrect={false}
					maxLength={2}
					/>
				</View>
				<View style={{flex: .6, justifyContent: "flex-start"}}>
					<View style={{flexDirection: "row"}}>
						<View style={{flex: 1}}>
							<Button 
							title = "Done"
							onPress={() => {this.flagPicked(this.state.text)
								this.setState({newFlag: false})}}
							/>
						</View>
						<View style={{flex:.2}}></View>
						<View style={{flex: 1}}>
							<Button 
							title = "Cancel"
							onPress={() => this.setState({newFlag: false})}
							/>
						</View>
					</View>
				</View>
			</View>
		</View>
	</Modal>
	)
  }

  renderCommittees(item){
	const {
		textColor
	} = styles;

	return (
		<View style= {{alignItems: "flex-start", backgroundColor: "white"}}>
			<Text style={textColor}>{item.title}</Text>
		</View>
	)
	
  }

  renderComponent(item, sortedMembers) {
	const {
		contentContainerStyle,
		progress,
		index,
		indexText,
		textColor
	} = styles;

	const color = (item.id === this.props.id) ? '#ffd700' : "white"
	return (
		<View style={contentContainerStyle}>
			<View style={[index, {borderColor: color}]}>
				<Text style={[indexText, {color: color}]}>{item.index}</Text>
			</View>

			<View>
				<Text style={textColor}>{item.firstName}</Text>
				<Text style={textColor}>{item.lastName === undefined ? '' : item.lastName}</Text>
				<Text style={textColor}>Points: {item.points}</Text>
				<Progress.Bar
					style={progress}
					progress={item.points / Math.max(sortedMembers[0].points, 1)}
					indeterminate={false}
					color={'#ffd700'}
				/>
			</View>
		</View>
	)
	}

	callUser(id){
		this.props.pageLoad();
		this.props.fetchMemberProfile(id);
	}

	convertNumToDate(date) {
		var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		temp_date = date.split("-");
		return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}`;
	}

	greeting() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
							 'August', 'September', 'October', 'November', 'December'];
		const date = new Date();
		let time = date.getHours();
		let day = date.getDate();
		let month = date.getMonth();
		let greeting = (time >= 12) ? "Good evening" : "Good morning";
		const {
			textColor
		} = styles
		return (
			<View style={{flex: 1, justifyContent: "center"}}>
				<Text style={[textColor,{fontSize: 20}]}>{greeting}, {this.props.firstName}.</Text>
				<Text style={textColor}>Today is {months[month]} {day}</Text>
			</View>
		)
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
		this.props.goToViewEvent("dashboard");
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
	
	sortEvents(eventList){
	let thisdate = new Date()
	let month = (thisdate.getMonth() + 1)
	let year = thisdate.getFullYear()
	let day = (thisdate.getDate())
	let hour = (thisdate.getHours())
	let min = (thisdate.getMinutes())

	let events = {}
	Object.keys(eventList).forEach(function(element){
		eventObj = eventList[element]
		endTime = eventObj.endTime.split(":")

		temp_date = eventObj.date.split("-");

		if (temp_date[0] < year) return
    	if (temp_date[1] < month) return
		if (temp_date[2] < day) return
		if (temp_date[2] == day){
			if (endTime[0] < hour) return
			else if (endTime[0] == hour){
				if (endTime[1] < min) return
			}
		}
		Object.assign(eventObj, {eventID: element})
		Object.assign(events, {[element]: eventObj})
	})
	
	let sortedEvents = _.orderBy(events, ['date', 'startTime',  'endTime'], ['asc', 'asc', 'asc']);

	return sortedEvents
	}

	showEvents(event){
		const {
			textColor
		} = styles;

		if(event === null){
			return(
				<View></View>
			)
		}

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

		var viewType = type 

		if (committee !== ''){
		viewType = committee 
		}

		var realStart = this.convertHour(startTime)
		var realEnd = this.convertHour(endTime)


		return (
		<View style={{flexDirection: "row", flex: 1}}>
			<View style = {{flex: .1}}></View>
			<View style={{alignItems:'center', flexDirection: "row", borderColor: "white", flex: 1}}>
				<View style={{flex: 1, alignItems: "flex-start"}}>
					<View style={{alignItems: "flex-start"}}>
						<Text style={{color: "white", fontSize: dimension.width * .035}}>{viewType}: {name}</Text>
						<Text style={{color: "white", fontSize: dimension.width * .035}}>{this.convertNumToDate(date)} - {realStart} - {realEnd} </Text>
					</View>
				</View>
				<View style ={{flex:.08, height: "60%"}}></View>
			</View>
			<View style = {{flex: .1}}>
				<View style= {{alignItems: "flex-end", justifyContent: "center", flex: 1, paddingRight: dimension.width * .03}}>
					<Ionicons name="ios-arrow-dropright" size={dimension.height * .025} style={{color: '#FECB00'}}/>
				</View>
			</View>
		</View>
		)

	}

	getFormattedEventList() {
		const {
			textColor
		} = styles;
		
		let recentEvents = []
		if (this.props.eventList !== null && this.props.eventList !== undefined) {
			let events = this.sortEvents(this.props.eventList);
			recentEvents = events.slice(0,3);

			if(events.length === 0){
				recentEvents.push(null)
				recentEvents.push(null)
				recentEvents.push(null)

				return (
					<View style={{backgroundColor: '#21252b', flex: 1, borderColor: "white", justifyContent: "space-evenly"}}>
						{recentEvents.map(item => (
							<View style={{backgroundColor: '#21252b', flex: 1}}>
								<TouchableOpacity onPress={() => {if (item !== null) {this.viewEvent(item)}}} style={{flex: 1}}>
									{this.showEvents(item)}
								</TouchableOpacity>
								<View style ={{height: dimension.height * .002, backgroundColor: "black", width: "100%", alignSelf: "center"}}></View>
							</View>
						))}
					</View>
				)
			}

			if(events.length === 1){
				recentEvents.push(null)
				recentEvents.push(null)

				return (
					<View style={{backgroundColor: '#21252b', flex: 1, borderColor: "white", justifyContent: "space-evenly"}}>
						{recentEvents.map(item => (
							<View style={{backgroundColor: '#21252b', flex: 1}}>
								<TouchableOpacity onPress={() => this.viewEvent(item)} style={{flex: 1}}>
									{this.showEvents(item)}
								</TouchableOpacity>
								<View style ={{height: dimension.height * .002, backgroundColor: "black", width: "100%", alignSelf: "center"}}></View>
							</View>
						))}
					</View>
				)
			}

			if(events.length === 2){
				recentEvents.push(null)

				return (
					<View style={{backgroundColor: '#21252b', flex: 1, borderColor: "white", justifyContent: "space-evenly"}}>
						{recentEvents.map(item => (
							<View style={{backgroundColor: '#21252b', flex: 1}}>
								<TouchableOpacity onPress={() => this.viewEvent(item)} style={{flex: 1}}>
									{this.showEvents(item)}
								</TouchableOpacity>
								<View style ={{height: dimension.height * .002, backgroundColor: "black", width: "100%", alignSelf: "center"}}></View>
							</View>
						))}
					</View>
				)
			}



			return (
				<View style={{backgroundColor: '#21252b', flex: 1, borderColor: "white", justifyContent: "space-evenly"}}>
					{recentEvents.map(item => (
						<View style={{backgroundColor: '#21252b', flex: 1}}>
							<TouchableOpacity onPress={() => this.viewEvent(item)} style={{flex: 1}}>
								{this.showEvents(item)}
							</TouchableOpacity>
							<View style ={{height: dimension.height * .002, backgroundColor: "black", width: "100%", alignSelf: "center"}}></View>
						</View>
					))}
				</View>
			)
		}
		else {
			recentEvents.push(null)
				recentEvents.push(null)
				recentEvents.push(null)

				return (
					<View style={{backgroundColor: '#21252b', flex: 1, borderColor: "white", justifyContent: "space-evenly"}}>
						{recentEvents.map(item => (
							<View style={{backgroundColor: '#21252b', flex: 1}}>
								<TouchableOpacity onPress={() => this.viewEvent(item)} style={{flex: 1}}>
									{this.showEvents(item)}
								</TouchableOpacity>
								<View style ={{height: dimension.height * .002, backgroundColor: "black", width: "100%", alignSelf: "center"}}></View>
							</View>
						))}
					</View>
				)
		}

	}

	isDefined(obj) {
		return !(obj === undefined || obj == null || obj.length < 2)
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
		flex: .16,
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
		paddingBottom: "2%",
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
		borderRadius: dimension.height*.05*.5,
		justifyContent:'center',
		alignItems: 'center',
		height: dimension.height*.05,
		width: dimension.height*.05,
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
});

const mapStateToProps = ({ user, general, members, events, elect, committees }) => {
	const { firstName, id, dashColor, flag, userCommittees} = user;
	const { loading } = general;
	const { membersPoints } = members;
	const { eventList } = events;
	const { election } = elect
	const { committeesList} = committees 
	return { firstName, id, loading, membersPoints, eventList, election, dashColor, committeesList, flag, userCommittees};
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
	committeeChanged,
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
	loadCommittee
};

 export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
