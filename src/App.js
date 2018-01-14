import React, { Component} from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Spinner } from './components/general';
import { goToLogIn } from './actions';
import Router from './config/Router';


class App extends Component {

  componentWillMount() {
    // Initialize firebase
    const config = {
      apiKey: 'AIzaSyA_XfvvcvuAXanbBASf_ZOlWOAnieIvWKs',
      authDomain: 'authentication-d9d53.firebaseapp.com',
      databaseURL: 'https://authentication-d9d53.firebaseio.com',
      projectId: 'authentication-d9d53',
      storageBucket: 'authentication-d9d53.appspot.com',
      messagingSenderId: '60634673791'
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.loggedIn = true;
        Actions.main();
      } else {
        this.props.loggedIn = false;
        Actions.login();
      }
    });
  }

  render() {
    return <Router />;
  }
}

const mapStateToProps = ({ auth }) => {
  const { loggedIn } = auth;
  return { loggedIn };
};

const mapDispatchToProps = { goToLogIn };

export default connect(mapStateToProps, mapDispatchToProps)(App);
