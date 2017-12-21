import React, { Component} from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import RootTab from './navigation/RootTab';
import { StyledStatusBar, Spinner } from './components/general';
import { LoginForm, RegistrationForm } from './components/auth';

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyA_XfvvcvuAXanbBASf_ZOlWOAnieIvWKs',
    authDomain: 'authentication-d9d53.firebaseapp.com',
    databaseURL: 'https://authentication-d9d53.firebaseio.com',
    projectId: 'authentication-d9d53',
    storageBucket: 'authentication-d9d53.appspot.com',
    messagingSenderId: '60634673791'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  createAccount(e) {

    return (
      <View style={styles.loginViewStyle}>
        <View style={styles.logoContainerStyle}>
          <Text style={styles.textLogoStyle}>
            SHPE UCF
          </Text>
        </View>
        <View style={styles.loginFormContainerStyle}>
          <RegistrationForm />
        </View>
        <View style={styles.createAccountContainerStyle}>
          <TouchableOpacity>
            <Text style={styles.createAccountTextStyle}>
              -> back to Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.contentStyle}>
            <RootTab />
          </View>
        );
      case false:
        return (
          <View style={styles.loginViewStyle}>
            <View style={styles.logoContainerStyle}>
              <Text style={styles.textLogoStyle}>
                SHPE UCF
              </Text>
            </View>
            <View style={styles.loginFormContainerStyle}>
              <LoginForm />
            </View>
            <View style={styles.createAccountContainerStyle}>
              <TouchableOpacity>
                <Text style={styles.createAccountTextStyle}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.spinnerStyle}>
              <Spinner size='large' />
          </View>
        );
    }
  }

  render() {
      return (

        <View style={styles.containerStyle}>
          <StyledStatusBar
            backgroundColor='rgba(0,0,0,0.6)'
            barStyle='light-content'/>
          
          {this.renderContent()}

        </View>

      );
  }
}

const styles = StyleSheet.create({
  // Root Styles
  containerStyle: {
    flex: 1,
  },
  contentStyle: {
    flex: 1,
  },
  spinnerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Login Screen Styles
  loginViewStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  logoContainerStyle: {
    flex: 3,
    justifyContent: 'center'
  },
  textLogoStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  loginFormContainerStyle: {
    flex: 2,
  },
  createAccountContainerStyle: {
    flex: 1,
  },
  createAccountTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#007AFF',
    paddingBottom: 5,
  },
});
