import firebase from 'firebase';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, Linking } from 'react-native';
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
	getCommittees
}
from '../ducks';

const dimension = Dimensions.get('window');

const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class Dashboard extends Component {
	componentWillMount() {
		this.props.pageLoad();
		this.props.getCommittees();
		this.props.updateElection();
		this.props.fetchMembersPoints();
		this.props.fetchEvents();
		this.props.getPrivilege();
		this.props.loadUser();
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
		  eventsContainer,
		  textColor
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
		  sortedMembers = sortedMembers.concat(currentMember);

	  return (
		  <View style={page}>
			  <NavBar title="Dashboard" />
				  <ScrollView>
					  <View style={mainContentStyle}>
						  <View style={greetingContainerStyle}>
							  {this.greeting()}
						  </View>
						  <View style={ContainerStyle}>
							  <View style={{flexDirection: 'row'}}>
								  <TouchableOpacity style={touchLeaderboard} onPress={() => Actions.Leaderboard()}>
									  <Text style={[title, textColor]}>Leaderboard</Text>
									  <FlatList
										  data={sortedMembers}
										  extraData={this.state}
										  keyExtractor={this._keyExtractor}
										  renderItem={({item}) => (this.renderComponent(item, sortedMembers))}
									  />
								  </TouchableOpacity>
								  <View style={eventsContainer}>
									  <Text style={[title, textColor]}>Upcoming Events</Text>
									  <View style={{alignSelf: 'center'}}>
										  {this.getFormattedEventList()}
									  </View>
								  </View>
							  </View>
						  </View>
						  <View style={ContainerStyle}>
							  <Text style={[title, textColor]}>Committees</Text>
							  <Text style={textColor}>Coming soon!</Text>
						  </View>
						  <View style={ContainerStyle}>
							  <Text style={[title, textColor]}>Join our Slack!</Text>
							  <FontAwesomeIcon style={{color: '#FFC107'}} name="slack" size={30} onPress={() => Linking.openURL('https://shpeucf2018-2019.slack.com/')}/>
						  </View>
						  <TouchableOpacity style={ContainerStyle} onPress={() => Linking.openURL('https://www.shpeucf.com/')}>
							  <Text style={[webTitle, textColor ]}>Visit our website!</Text>
						  </TouchableOpacity>
					  </View>
				  </ScrollView>
		  </View>
	  );
   }

  renderComponent(item, sortedMembers) {
	const {
		contentContainerStyle,
		progress,
		index,
		indexText,
		textColor
	} = styles;

	return (
		<View style={contentContainerStyle}>
			<View style={index}>
				<Text style={textColor} style={indexText}>{item.index}</Text>
			</View>

			<View>
				<Text style={textColor}>{item.firstName} {item.lastName === undefined ? '' : item.lastName}</Text>
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
			<View>
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
				<TouchableOpacity style={{alignItems:'center'}} onPress={() => this.viewEvent(event)}>
					<Text style={[{fontStyle: 'italic', fontSize: 16}, textColor]}>{viewName}</Text>
					<Text style={[{paddingBottom: '5%'}, textColor]}>{this.convertNumToDate(date)}</Text>
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
		padding: '5%'
	},
	textColor:{
		color: '#e0e6ed'
	},
	contentContainerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: '5%',
	},
	ContainerStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#21252b',
		borderRadius: 10,
		paddingTop: '2%',
		paddingBottom: '2%',
		paddingLeft: '3%',
		paddingRight: '3%',
		marginTop: '2%',
		marginLeft: '3%',
		marginRight: '3%',
		marginBottom: '2%',
		elevation: 1,
	 },
	mainContentStyle: {
		color: '#000'
	},
	progress: {
		width: dimension.width * .32,
		justifyContent: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		paddingBottom: '3%',
	},
	webTitle: {
		fontSize: 18,
		fontWeight: '500',
		paddingBottom: '1%',
	},
	touchLeaderboard: {
		flex: 1,
		flexDirection:'column',
		alignItems:'center',
		paddingRight: '3%'
	},
	index: {
		color: '#000',
		borderColor: '#e0e6ed',
		borderStyle: 'solid',
		borderWidth: 1.5,
		borderRadius: 11,
		marginRight: '4%',
		justifyContent:'center',
		height: 22,
		width: 22,
		elevation: 1
	},
	indexText: {
		alignSelf: 'center',
		fontWeight: "700",
		fontSize: 11,
		color: "#e0e6ed"
	},
	eventsContainer: {
		flex: 1,
		flexDirection:'column',
		alignItems:'center'
	}
});

const mapStateToProps = ({ user, general, members, events, elect }) => {
	const { firstName, id } = user;
	const { loading } = general;
	const { membersPoints } = members;
	const { eventList } = events;
	const { election } = elect
	return { firstName, id, loading, membersPoints, eventList, election };
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
	getCommittees
};

 export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
