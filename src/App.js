import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Router from "./config/Router";
import AppInfo from "../app.json";
import { View } from "react-native";
import { goToLogIn, registrationError } from "./ducks";
import { Alert } from "./components";
import {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId,
	appId
} from "react-native-dotenv";

console.ignoredYellowBox = ["Setting a timer"];

class App extends Component {
	componentDidMount() {
		const config = {
			apiKey: apiKey,
			authDomain: authDomain,
			databaseURL: databaseURL,
			projectId: projectId,
			storageBucket: storageBucket,
			messagingSenderId: messagingSenderId,
			appId: appId
		};

		if (!firebase.apps.length)
			firebase.initializeApp(config);
		else if (!this.props.loggedIn)
			Actions.login();
		else
			Actions.main();

		this.verifyLogIn();
	}

	verifyLogIn() {
		firebase.auth().onAuthStateChanged((user) => {
			let correctVersion = false;

			firebase.database().ref("/version").once("value", snapshot => {
				correctVersion = snapshot.val() === AppInfo.version;
			}).then(() => {
				if (user) { // This means the user is logged in
					if (correctVersion && firebase.auth().currentUser.emailVerified) {
						this.props.loggedIn = true;
						Actions.main();
					}
					else {
						if (!correctVersion && firebase.auth().currentUser.emailVerified)
							Alert.alert("Please update your app");
						firebase.auth().signOut();
						this.props.loggedIn = false;
						// Actions.login();
					}
				}
				else {
					this.props.loggedIn = false;
					Actions.login();
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

const mapStateToProps = ({ user }) => {
	const {
		loggedIn
	} = user;

	return { loggedIn };
};

const mapDispatchToProps = { goToLogIn, registrationError };

export default connect(mapStateToProps, mapDispatchToProps)(App);