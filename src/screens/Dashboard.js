import firebase from 'firebase';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, Linking, Modal, SafeAreaView} from 'react-native';
import * as Progress from 'react-native-progress';
import _ from 'lodash';
import { Spinner, NavBar, Input } from '../components/general'
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
	timeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
	goToViewEvent,
	getCommittees,
	setDashColor,
	setFlag
}
from '../ducks';
import Flag from 'react-native-flags'
import {ColorPicker} from 'react-native-color-picker'

const dimension = Dimensions.get('window');

const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

const iterateesC = ['level'];
const orderC = ['asc'];

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {colorPicker: false}
	  }

	componentDidMount() {
		this.props.pageLoad();
		this.props.getCommittees();
		this.props.updateElection();
		this.props.fetchMembersPoints();
		this.props.fetchEvents();
		this.props.getPrivilege();
		this.props.loadUser();
	}

	colorPicked(color) {
		this.props.setDashColor(color)
		this.setState({colorPicker: false})
	}

	flag(){

		if (this.props.flag === ''){
			return(
			<View style={{justifyContent: "center"}}>
			<FontAwesomeIcon style={{color: 'white'}} name="chevron-down" onPress={()=> this.setState({colorPicker:true})} size={15}/>
			</View>)
		}

		return(		
			<View style={{justifyContent: "center"}}>
				<TouchableOpacity onPress={()=> this.setState({colorPicker:true})} >
				<Flag
					type="flat"
					code={this.props.flag}
					size={32}
				/>
				</TouchableOpacity>
			  </View>
		)

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
		  index
	  } = styles;

	  const flagHeight = dimension.height - (.24 * dimension.height)
	  const committeesArray = _.orderBy(this.props.committeesList, iterateesC, orderC).splice(3, 20)

	  countriesL = ["AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ"]
	  countriesR = ["GT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "UY", "VE"]
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

	  return (
		  <SafeAreaView style={page}>
			  <Modal visible={this.state.colorPicker}  transparent={true}>
					<View style={styles.modalBackground}>
						<ColorPicker
						defaultColor="#B83227"
						oldColor={this.props.dashColor}
						onColorSelected={color => this.colorPicked(color)}
						style={styles.modalContent}
						/>
					</View>
	  			</Modal>
					  <View style={mainContentStyle}>
						  <View style={[greetingContainerStyle, {backgroundColor: this.props.dashColor, justifyContent: "center"}]}>
							  {this.greeting()}
							  {this.flag()}
							  
						  </View>
						  <View style= {{flex: .9, flexDirection: 'row', justifyContent: 'space-evenly'}}>				
							<View style= {{flex: 1, justifyContent:'space-evenly'}}>
								<View style={{flex: .65}}>
								<View style={eventsContainer}>
										<View style={{alignItems: "center", flex: .4, justifyContent: "center"}}>
											<Text style={[title, textColor]}>Upcoming Events</Text>
										</View>
										<View style={{flex: 1}}>
											{this.getFormattedEventList()}
										</View>
									</View>
									<View style={{flex: .2, flexDirection: "row"}}>
										<View style={{flex: 1, alignItems: 'center', justifyContent: "flex-end", paddingLeft: "10%"}}>
											<Text style={[title, textColor]}>Leaderboard</Text>
										</View>
										<View style={{flex:.1}}></View>
										<View style={{flex: 1, alignItems: 'center', justifyContent: "flex-end", paddingRight: "10%"}}>
											<Text style={[title, textColor]}>Committees</Text>
										</View>
									</View>
									<View style={{flexDirection: "row", alignItems: 'flex-start', flex: 1, borderColor: "white"}}>
										<TouchableOpacity style={{backgroundColor: '#21252b', flex: 1, paddingLeft: "10%"}} onPress={() => Actions.LeaderboardD()}>
										<View style={touchLeaderboard}>
												<View >
													<Text style={[title, textColor]}>Top Member</Text>
												</View>
												<View style={{justifyContent: "center", alignItems: "flex-start"}}>
													<Text style={{color: 'white'}}>{sortedMembers[0].firstName} {sortedMembers[0].lastName}</Text>
												</View>	
										</View>
										<View style={{flex: .1, backgroundColor: "black"}}></View>
										<View style={touchLeaderboard}>
												<View >
													<Text style={[title, textColor]}>Your Ranking</Text>
												</View>
												<View style={{justifyContent: "center", alignItems: "center"}}>
													<View style={[index, {borderColor: '#FFC107', }]}>
														<Text style={[indexText, {color: 'white'}]}>{currentMember.index}</Text>
													</View>
												</View>
										</View>
										</TouchableOpacity>
										<View style={{flex:.1}}></View>
										<View style={[touchCommittee, {flex: 1, height: "100%"}]}>
										{Object.values(committeesArray).map(item => (
											<View style={{justifyContent: "space-between"}}>
												<Text style={textColor}>{item.title}</Text>
												<View style={{flex: .1, backgroundColor: "black"}}></View>
											</View>
										))}
										</View>
									</View>
								</View>
							{/*<View style={ContainerStyle}>
								<Text style={[title, textColor]}>Committees</Text>
								<Text style={textColor}>Coming soon!</Text>
							</View>*/}
							<View style={{flex: .3, alignItems: 'center'}}>
								<View style={{flex:.6}}></View>
								<View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
									<TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://shpeucf2018-2019.slack.com/')}>
										<FontAwesomeIcon style={{color: '#000"'}} name="slack" size={25}/>
									</TouchableOpacity>
									<TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://www.facebook.com/shpeucfchapter/')}>
										<FontAwesomeIcon style={{color: '#000"'}} name="facebook" size={25}/>
									</TouchableOpacity>
									<TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://www.shpeucf.com/')}>
										<FontAwesomeIcon style={{color: '#000"'}} name="globe" size={25}/>
									</TouchableOpacity>
									<TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://www.instagram.com/shpeucf/?hl=en')}>
										<FontAwesomeIcon style={{color: '"#000"'}} name="instagram" size={25}/>
									</TouchableOpacity>
								</View>
								<View style={{flex:.7}}></View>
							</View>
						</View>
							<View style={{position: "absolute", flexDirection: "row", width: dimension.width, height: flagHeight, justifyContent: "space-between"}}>
							<View style={{justifyContent:'space-evenly',borderColor: "white",}}>
								{countriesL.map(item => (
								<TouchableOpacity onPress={() => this.props.setFlag(item)}>
									<Flag
									type="flat"
									code={item}
									size={24}
								/>
								</TouchableOpacity>
								))}
							</View>		
							<View style={{justifyContent:'space-evenly',borderColor: "white"}}>
								{countriesR.map(item => (
								<TouchableOpacity onPress={() => this.props.setFlag(item)}>
									<Flag
									type="flat"
									code={item}
									size={24}
								/>
								</TouchableOpacity>
								))}
							</View>
							</View>
						</View>
					  </View>
				  
		  </SafeAreaView>
	  );
   }

  renderCommittees(item){
	const {
		contentContainerStyle,
		progress,
		index,
		indexText,
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
		return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}, ${temp_date[0]}`;
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
		this.props.nameChanged(item.name)
		this.props.descriptionChanged(item.description)
		this.props.dateChanged(item.date)
		this.props.timeChanged(item.time)
		this.props.locationChanged(item.location)
		this.props.epointsChanged(item.points)
		this.props.eventIDChanged(item.eventID)
		this.props.goToViewEvent();
	  }

	getFormattedEventList() {
		const {
			textColor
		} = styles;
		

		if (this.props.eventList !== null && this.props.eventList !== undefined) {
			let events = Object.values(this.props.eventList);
			let event = events[events.length - 1];
			const {
				name,
				date,
				description,
				committee
			} = event;
	
			if (description !== undefined && description.length > 75) {
				description = description.slice(0, 75);
				description += '...';
			}

			var viewName = name;
			if (committee !== ''){
			viewName = committee + ": "  + name;
			}

			return (
				<TouchableOpacity style={{alignItems:'center', flex: 1, backgroundColor: '#21252b', borderColor: "white", justifyContent: "space-evenly"}} onPress={() => this.viewEvent(event)}>
					<Text style={[{fontStyle: 'italic', fontSize: 16}, textColor]}>{viewName}</Text>
					<Text style={{color: "#FFC107"}}>{this.convertNumToDate(date)}</Text>
					<Text style={[{marginLeft: '10%', marginRight: '10%'}, textColor]}>{description}</Text>
				</TouchableOpacity>
			)
		}
		else {
			return (
				<View style={{alignItems:'center'}}>
					<Text style={[{fontStyle: 'italic', fontSize: 16}, textColor]}>No events coming soon</Text>
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
		paddingRight: "2%",
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
		backgroundColor: '#FECB00',
		width: '15%',
		borderRadius: 10,
		elevation: 1,
		paddingBottom: "10%",
		marginBottom: '2%',
		marginLeft: '2%',
		marginRight: '2%',
		borderWidth: 1,
		borderColor: "#0000"
	 },
	mainContentStyle: {
		color: '#000',
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
		paddingBottom: "3%",
		borderColor: 'white'
	},
	touchCommittee: {
		flexDirection:'column',
		alignItems:'center',
		backgroundColor: '#21252b',
		justifyContent: "space-evenly",
		paddingRight: "10%"
	},
	index: {
		color: '#000',
		borderColor: '#e0e6ed',
		borderStyle: 'solid',
		borderWidth: 1.5,
		borderRadius: 15,
		justifyContent:'center',
		alignItems: 'center',
		height: 30,
		width: 30,
		elevation: 1
	},
	modalBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        height: dimension.height,
        width: dimension.width,
        backgroundColor: 'transparent'
    },
	indexText: {
		fontWeight: "700",
		fontSize: 20,
		color: "#e0e6ed"
	},
	modalContent: {
        height: dimension.height*.6,
        width: dimension.width*.9,
        padding: 12,
        backgroundColor: '#21252b',
        borderRadius: 12,
    },
	eventsContainer: {
		flex: .6,
		flexDirection:'column',
	}
});

const mapStateToProps = ({ user, general, members, events, elect, committees }) => {
	const { firstName, id, dashColor, flag} = user;
	const { loading } = general;
	const { membersPoints } = members;
	const { eventList } = events;
	const { election } = elect
	const { committeesList} = committees 
	return { firstName, id, loading, membersPoints, eventList, election, dashColor, committeesList, flag};
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
	timeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
	goToViewEvent,
	getCommittees,
	setDashColor,
	setFlag
};

 export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
