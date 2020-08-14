import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Router from "./config/Router";
import AppInfo from "../app.json";
import { View } from "react-native";
import { Alert } from "./components";
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } from "react-native-dotenv";
import {
	loadUser,
	fetchMembersPoints,
	getEvents,
	getCommittees,
	fetchAllUsers,
	updateElection
} from "./ducks";

console.ignoredYellowBox = ["Setting a timer"];

class App extends Component {
	componentDidMount() {
		const config = { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId };

		if (!firebase.apps.length)
			firebase.initializeApp(config);

		this.verifyLogIn();
	}

	verifyLogIn() {
		const {
			getCommittees,
			fetchMembersPoints,
			getEvents,
			loadUser,
			fetchAllUsers,
			updateElection
		} = this.props;

		firebase.auth().onAuthStateChanged(user => {
			let correctVersion = false;

			firebase.database().ref("/version").once("value", snapshot => {
				correctVersion = snapshot.val() === AppInfo.version;

				if (correctVersion && user) {
					Actions.main();
					getCommittees();
					fetchMembersPoints();
					getEvents();
					loadUser();
					fetchAllUsers();
					updateElection();
				}
				else {
					Actions.login();
					if (!correctVersion) Alert.alert("Please update your app");
					if (user) firebase.auth().signOut();
				}
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

const mapStateToProps = () => { return {} };

const mapDispatchToProps = {
	loadUser,
	fetchMembersPoints,
	getEvents,
	getCommittees,
	fetchAllUsers,
	updateElection
};

export default connect(mapStateToProps, mapDispatchToProps)(App);