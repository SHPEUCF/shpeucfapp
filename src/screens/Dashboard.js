import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { loadUser, pageLoad, fetchMembersPoints, fetchMemberProfile, fetchEvents,
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
	goToViewEvent } from '../actions';
import * as Progress from 'react-native-progress';
import _ from 'lodash';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'November', 'December'];

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: ''
		};
	}

	componentDidMount() {
	 }

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
			fields.push(`${events[key].name}  ${events[key].date}`)			
		}

		if(fields.length > 0)
			field = fields.pop();
		else{
			field = "No events coming soon"
		}

		return <Text>{field}</Text>
	

		
	}

	viewEvent(item) {
	this.props.nameChanged(item.name);
   	this.props.descriptionChanged(item.description);
   	this.props.dateChanged(item.date);
   	this.props.timeChanged(item.time);
   	this.props.locationChanged(item.location);
   	this.props.epointsChanged(item.points);
   	this.props.eventIDChanged(item.eventID);
   	this.props.goToViewEvent();
	}
	isDefined(obj){
		return !(obj === undefined || obj == null || obj.length < 2)
	}

	renderEvent(item) {
		return (
		  <TouchableOpacity onPress={this.props.bind.viewEvent(this, item)}>
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
	renderComponent(item, sortedMembers) {
		const {
		  containerStyle,
		  contentContainerStyle,
		  progress
		} = styles;
		if (item.points !== 0) {
		  return (
			 <View style={contentContainerStyle}>
			 		<Text style={{alignSelf: 'center', fontWeight: "700", margin: 3}}>{item.index}</Text>
					<View style={containerStyle}>
						<Text>{item.firstName} {item.lastName === undefined ? '' : item.lastName}</Text>
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
			leaderboardTitle } = styles;
			
		let sortedMembers = _.orderBy(this.props.membersPoints, iteratees, order);
		var currentMember
		sortedMembers.forEach((x, index) => {
			x.index = (x.points !== 0) ? index + 1 : sortedMembers.length
			alert(this.props.id)
			if(x.id === this.props.id) {
				currentMember =  x
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
				<View style={mainContentStyle}>
					<View style={greetingContainerStyle}>
						{this.greeting()}
					</View>
					<View style={firstContainerStyle}>
						<View style={{flex: 1, flexDirection:'column', alignItems:'center', paddingRight: 10}}>
							<Text style={leaderboardTitle}>Leaderboard</Text>
							<FlatList
								data={sortedMembers}
								extraData={this.state}
								keyExtractor={this._keyExtractor}
								renderItem={({item}) => (
								this.renderComponent(item, sortedMembers))}
							/>
						</View>
						<View style={{flex: 1, flexDirection:'column', alignItems:'center'}}>
							<Text style={{fontSize: 20, paddingBottom: 10}}>Upcoming Events</Text>
							{this.getFormattedEventList()}
						</View>
					</View>
					<View style={{paddingLeft: 10}}>
						<Text>
							To be added:{'\n'}
							- Committees{'\n'}
							- Join our Slack!{'\n'}
							- Visit our website!{'\n'}
						</Text>
					</View>
				</View>
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
		height: dimension.height * .1
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
		flexDirection: 'row'
	},
	buttonsContainerStyle: {
		marginRight: 10,
		marginLeft: 10,
	},
	firstContainerStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: '3%',
		margin: '3%'
	 },
	mainContentStyle: {
		color: '#000'
	},
	progress: {
		flex: .1,
		justifyContent: 'center',
	},
	leaderboardTitle: {
		fontSize: 16,
		fontWeight: '700'
	}
});

const mapStateToProps = ({ auth, general, members, events }) => {
	const { firstName, id} = auth;
	const { loading } = general;
	const { membersPoints } = members;
	const { eventList } = events;
	return { firstName, id, loading, membersPoints, eventList };
};
 
 const mapDispatchToProps = {	loadUser, pageLoad, fetchMembersPoints, fetchMemberProfile, fetchEvents,
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
	goToViewEvent };
 
 export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
