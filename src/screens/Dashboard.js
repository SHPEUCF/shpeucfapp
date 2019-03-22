import firebase from 'firebase';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, WebView, Linking } from 'react-native';
import * as Progress from 'react-native-progress';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
	loadUser,
	pageLoad,
	fetchMembersPoints,
	fetchMemberProfile,
	fetchEvents,
	getPrivilege } from '../actions';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class Dashboard extends Component {
	componentWillMount() {
		this.props.pageLoad();
		this.props.fetchMembersPoints();
		this.props.fetchEvents();
		this.props.loadUser();
	}
  
	callUser(id){
		this.props.pageLoad();
		this.props.fetchMemberProfile(id);
	}

	greeting() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
							 'August', 'September', 'October', 'November', 'December'];
		const date = new Date();
		let time = date.getHours();
		let day = date.getDate();
		let month = date.getMonth();
		let greeting = (time >= 12) ? "Good evening" : "Good morning";

		return (
			<View>
				<Text style={{fontSize: 20}}>{greeting}, {this.props.firstName}.</Text>
				<Text>Today is {months[month]} {day}</Text>
			</View>
		)
	}

	getFormattedEventList() {
		let events = this.props.eventList;
		let fields = [];

		for (key in events) {
			fields.push([`${events[key].name}`, `${events[key].date}`, `${events[key].description}`]);
		}

		if (fields.length > 0)
			field = fields.pop();
		else
			field = "No events coming soon"
		
		let eventName = field[0], eventDate = field[1], eventDesc = field[2];
		if (eventDesc !== undefined && eventDesc.length > 75) {
			eventDesc = eventDesc.slice(0, 75);
			eventDesc += '...'
		}

		return(
			<View style={{alignItems:'center'}}>
				<Text style={{fontStyle: 'italic', fontSize: 16}}>{eventName}</Text>
				<Text style={{paddingBottom: '5%'}}>{eventDate}</Text>
				<Text style={{marginLeft: '10%', marginRight: '10%'}}>{eventDesc}</Text>
			</View>
		)
	}

	isDefined(obj) {
		return !(obj === undefined || obj == null || obj.length < 2)
	}

	renderComponent(item, sortedMembers) {
		const {
			contentContainerStyle,
			progress,
			index,
			indexText
		} = styles;

		return (
			<View style={contentContainerStyle}>
				<View style={index}>
					<Text style={indexText}>{item.index}</Text>
				</View>
				
				<View>
					<Text>{item.firstName} {item.lastName === undefined ? '' : item.lastName}</Text>
					<Text>Points: {item.points}</Text>
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

	_keyExtractor = (item, index) => index;

   render() {
      const {
			page,
			tabBar,
			tabBarText,
			mainContentStyle,
			greetingContainerStyle,
			firstContainerStyle,
			title,
			touchLeaderboard,
			eventsContainer
		} = styles;
		
		const { currentUser } = firebase.auth();

		let sortedMembers = _.orderBy(this.props.membersPoints, iteratees, order);
		var currentMember;
		sortedMembers.forEach((x, index) => {
			x.index = (x.points !== 0) ? index + 1 : sortedMembers.length;
			if (x.id === currentUser.uid) {
				currentMember =  x;
			};
		});
		sortedMembers.splice(2);
		if (this.isDefined(currentMember) && this.isDefined(sortedMembers) && sortedMembers[0].id !== currentMember.id && sortedMembers[1].id !== currentMember.id)
			sortedMembers = sortedMembers.concat(currentMember);

      return (
         <View style={page}>
				<View style={tabBar}>
					<Text style={tabBarText}>Dashboard</Text>
				</View>
				<ScrollView>
					<View style={mainContentStyle}>
						<View style={greetingContainerStyle}>
							{this.greeting()}
						</View>
						<View style={firstContainerStyle}>
							<View style={{flexDirection: 'row'}}>
								<TouchableOpacity style={touchLeaderboard} onPress={() => Actions.Leaderboard()}>
									<Text style={title}>Leaderboard</Text>
									<FlatList
										data={sortedMembers}
										extraData={this.state}
										keyExtractor={this._keyExtractor}
										renderItem={({item}) => (this.renderComponent(item, sortedMembers))}
									/>
								</TouchableOpacity>
								<TouchableOpacity style={eventsContainer} onPress={() => alert('Coming soon!')}>
									<Text style={title}>Upcoming Events</Text>
									<View style={{alignSelf: 'center'}}>
										{this.getFormattedEventList()}
									</View>
								</TouchableOpacity>
							</View>
						</View>
						<View style={firstContainerStyle}>
							<Text style={title}>Committees</Text>
							<Text>Coming soon!</Text>
						</View>
						<View style={firstContainerStyle}>
							<Text style={title}>Join our Slack!</Text>
							<FontAwesomeIcon name="slack" size={30} onPress={() => Linking.openURL('https://shpeucf2018-2019.slack.com/')}/>
						</View>
						<TouchableOpacity style={firstContainerStyle} onPress={() => Linking.openURL('https://www.shpeucf.com/')}>
							<Text style={[title, {paddingBottom: 0}]}>Visit our website!</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
         </View>
      );
	}
}

const styles = StyleSheet.create({
	page: {
		flex: 1
	},
	tabBar: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems:'center',
		height: dimension.height * 0.1
	},
	tabBarText: {
		color: '#000',
		fontSize: 20,
		fontWeight:'bold',
		paddingLeft: '3%'
	},
	greetingContainerStyle: {
		padding: '3%'
	},
	contentContainerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: '5%'
	},
	firstContainerStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingTop: '2%',
		paddingBottom: '2%',
		paddingLeft: '3%',
		paddingRight: '3%',
		marginTop: '2%',
		marginLeft: '3%',
		marginRight: '3%',
		marginBottom: '2%',
		elevation: 1
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
		paddingBottom: '5%'
	},
	touchLeaderboard: {
		flex: 1,
		flexDirection:'column',
		alignItems:'center',
		paddingRight: '3%'
	},
	index: {
		borderColor: 'black',
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
		fontSize: 11
	},
	eventsContainer: {
		flex: 1,
		flexDirection:'column',
		alignItems:'center'
	}
});

const mapStateToProps = ({ auth, general, members, events }) => {
	const { firstName, id } = auth;
	const { loading } = general;
	const { membersPoints } = members;
	const { eventList } = events;
	return { firstName, id, loading, membersPoints, eventList };
};
 
 const mapDispatchToProps = {	
	loadUser,
	pageLoad,
	fetchMembersPoints,
	fetchMemberProfile,
	fetchEvents,
	getPrivilege
};
 
 export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
