import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import Router from "./config/Router";
import AppInfo from "../app.json";
import { View } from "react-native";
import { goToLogIn, registrationError } from "./ducks";

class App extends Component {
	componentDidMount() {
		// Initialize firebase
		const config = {
			apiKey: "AIzaSyCeX5lUZUmQxXsWNO8gNXVHqfJs-kQmSaY",
				authDomain: "shpe-ucf.firebaseapp.com",
				databaseURL: "https://shpe-ucf.firebaseio.com",
				projectId: "shpe-ucf",
				storageBucket: "shpe-ucf.appspot.com",
				messagingSenderId: "974032317047",
				appId: "1:974032317047:web:0a4a2ad01ac705b90ff472"
			};
		firebase.initializeApp(config);

		// firebase.auth().signOut();
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
							alert("Please update your app");
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