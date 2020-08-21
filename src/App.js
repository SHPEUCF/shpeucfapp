import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import Router from "./config/Router";
import AppInfo from "../app.json";
import { View } from "react-native";
import { Alert } from "./components";
import { loadUser, getAllMemberAccounts, getEvents, getCommittees, getAllMemberPoints, updateElection } from "./ducks";
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } from "react-native-dotenv";

console.ignoredYellowBox = ["Setting a timer"];

class App extends Component {
	componentDidMount() {
		const config = { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId };

		if (!firebase.apps.length)
			firebase.initializeApp(config);

		this.verifyLogIn();
	}

	verifyLogIn() {
		const { getCommittees, getAllMemberAccounts, getEvents, loadUser, getAllMemberPoints, updateElection } = this.props;

		firebase.auth().onAuthStateChanged(user => {
			firebase.database().ref("/version").once("value", snapshot => {
				let correctVersion = snapshot.val() === AppInfo.version;

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
					if (!correctVersion) Alert.alert("Please update your app");
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