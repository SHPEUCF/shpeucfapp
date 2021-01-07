import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Router from './config/Router';
import { appVersion } from '../package.json';
import { View } from 'react-native';
import { Alert } from './components';
import { loadUser, getAllMemberAccounts, getEvents, getCommittees, getAllMemberPoints, updateElection } from './ducks';

console.ignoredYellowBox = ['Setting a timer'];

class App extends Component {
	componentDidMount() {
		const config = {
			apiKey: 'AIzaSyCeX5lUZUmQxXsWNO8gNXVHqfJs-kQmSaY',
			authDomain: 'shpe-ucf.firebaseapp.com',
			databaseURL: 'https://shpe-ucf.firebaseio.com',
			projectId: 'shpe-ucf',
			storageBucket: 'shpe-ucf.appspot.com',
			messagingSenderId: '974032317047',
			appId: '1:974032317047:web:0a4a2ad01ac705b90ff472'
		};

		if (!firebase.apps.length)
			firebase.initializeApp(config);

		this.verifyLogIn();
	}

	verifyLogIn() {
		const { getCommittees, getAllMemberAccounts, getEvents, loadUser, getAllMemberPoints, updateElection } = this.props;

		firebase.auth().onAuthStateChanged(user => {
			firebase.database().ref('/version').once('value', snapshot => {
				let correctVersion = snapshot.val() === appVersion;

				if (correctVersion && user) {
					Actions.main();
					loadUser();
					getEvents();
					getCommittees();
					getAllMemberAccounts();
					updateElection();
					getAllMemberPoints();
				}
				else {
					Actions.login();
					if (!correctVersion) Alert.alert('Please update your app');
					if (user) firebase.auth().signOut();
				}
				// Actions.splash({ correctVersion, user, signOut: () => firebase.auth.signOut() });
			});
		});
	}

	render() {
		return (
			<View style = {{ flex: 1 }}>
				<Router />
				<Alert.AlertBox />
			</View>
		);
	}
}

const mapDispatchToProps = {
	loadUser,
	getAllMemberPoints,
	getEvents,
	getCommittees,
	getAllMemberAccounts,
	updateElection
};

export default connect(() => ({}), mapDispatchToProps)(App);