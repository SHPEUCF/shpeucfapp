import React, { Component} from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { goToLogIn, registrationError } from './ducks';
import Router from './config/Router';
import AppInfo from '../app.json'
import { SafeAreaView, StatusBar, View} from 'react-native'


class App extends Component {

  componentDidMount() {
    // Initialize firebase
    const config = {
    apiKey: "AIzaSyBjuggUaZwZEj0FYMK3x-O7FflhdsOUsx0",
    authDomain: "shpe-app-test.firebaseapp.com",
    databaseURL: "https://shpe-app-test.firebaseio.com",
    projectId: "shpe-app-test",
    storageBucket: "shpe-app-test.appspot.com",
    messagingSenderId: "343434443699",
    appId: "1:343434443699:web:430ce49ccf542aec2fe9c6",
      };
    firebase.initializeApp(config)
    
    // firebase.auth().signOut();
    firebase.auth().onAuthStateChanged((user) => {
      var correctVersion = false;
      firebase.database().ref('/version').once('value', snapshot => {
        if (snapshot.val() === AppInfo.version) {
          correctVersion = true;
        }
        else {
          correctVersion = false;
        }
      }).then(() => {
          if (user) { // This means the user is logged in
            if (firebase.auth().currentUser.emailVerified && correctVersion) {
              this.props.loggedIn = true
              Actions.main();
            } else {
              alert("Please update your app")
              firebase.auth().signOut();
              this.props.loggedIn = false

              // Actions.login();
            }
          } else {
            this.props.loggedIn = false
            Actions.login();
          }
      })
    });
  }

  render() {
    return (
    <View style={{flex: 1}}>
      <Router />
    </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { loggedIn } = user;
  return { loggedIn };
};

const mapDispatchToProps = { goToLogIn, registrationError };

export default connect(mapStateToProps, mapDispatchToProps)(App);
