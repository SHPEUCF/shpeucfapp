import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from './config/NewRouter';
import { View } from 'react-native';
import { Alert } from './components';
import {
	initializeFirebase,
	logOutUser,
	verifyAppVersion,
	userStatus,
	loadUser,
	getAllMemberAccounts,
	getEvents,
	getCommittees,
	getAllMemberPoints,
	updateElection
} from './ducks';

class App extends Component {
	componentDidMount() {
		const { verifyAppVersion, userStatus } = this.props;

		initializeFirebase();
		userStatus();
		verifyAppVersion().then(() => this.verifyLogin());
	}

	verifyLogin() {
		const {
			isLoggedIn,
			hasCorrectVersion,
			loadUser,
			getEvents,
			getCommittees,
			updateElection,
			getAllMemberPoints,
			getAllMemberAccounts
		} = this.props;

		if (isLoggedIn && hasCorrectVersion) {
			loadUser();
			getEvents();
			getCommittees();
			updateElection();
			getAllMemberPoints();
			getAllMemberAccounts();
		}
		else {
			if (!hasCorrectVersion) Alert.alert('Please update your app');
			if (isLoggedIn) logOutUser();
		}
	}

	render() {
		return (
			<View style = {{ flex: 1 }}>
				<Router isLoggedIn = { this.props.isLoggedIn } />
				<Alert.AlertBox />
			</View>
		);
	}
}

const mapStateToProps = ({ app: { hasCorrectVersion, isLoggedIn } }) => ({ hasCorrectVersion, isLoggedIn });
const mapDispatchToProps = {
	userStatus,
	verifyAppVersion,
	loadUser,
	getAllMemberAccounts,
	getEvents,
	getCommittees,
	getAllMemberPoints,
	updateElection
};

export default connect(mapStateToProps, mapDispatchToProps)(App);