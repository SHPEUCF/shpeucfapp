import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  goToResetPassword,
  goToRegistration,
  registrationError
} from '../../ducks';

import { Spinner, Button, Input } from '../general';
import { RkAvoidKeyboard } from 'react-native-ui-kitten';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
      const {
        email,
        password
      } = this.props;

    if(email === null || email === undefined){
      this.props.registrationError('Please enter your knights email')
      return
    } else if ( password === null || password === undefined){
      this.props.registrationError('Please enter your password')
      return
    } else{
      this.props.loginUser({ email, password });
    }
  }

  renderError() {
    if (this.props.error) {
      return (
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      );
    }
  }
  renderResetPassword() {
    const {
      resetPasswordText,
      bottomContainer
    } = styles
    return (
        <TouchableOpacity
          style={bottomContainer}
          onPress={this.props.goToResetPassword}
        >
          <Text style={resetPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
    );
  }
  renderSignUpButton() {
    const {
      signUpText,
      bottomContainer
    } = styles
    return (
      <View style={bottomContainer}>
        <Text style={{color: '#bbb', fontWeight: 'bold'}}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={this.props.goToRegistration}>
          <Text style={signUpText}> Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderButtons() {

    return (
      <View style={styles.buttonContainer}>
        <Button
          title = "LOG IN"
          onPress={this.onButtonPress.bind(this)}
        />
        {this.renderResetPassword()}
        {this.renderSignUpButton()}
      </View>
    );
  }

  renderContent() {
    const {
      formContainerStyle,
      headerContainer,
      headerTitle,
      headerTextStyle,
      headerSubtitleStyle,
    } = styles
    return (
      <View style={formContainerStyle}>
        <ScrollView style={{ flex: 1.5, paddingTop: 10 }}>
            <Image
              source={require('../../assets/images/SHPE_UCF_Logo.png')}
              style={{alignSelf: 'center'}}
            /> 
            <View style={headerContainer}>
              <View style={headerTitle}>
                <Text style={headerTextStyle}>S H P E  </Text>
                <Text style={[headerTextStyle, {color: '#FFC107'}]}>U C F </Text>
              </View>
            </View>
            <Text style={headerSubtitleStyle}>Society of Hispanic Professional Engineers</Text>
          </ScrollView>
          <ScrollView style= {{flex: 1}}>
            <Input
              placeholder="Knights Email"
              value={this.props.email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={this.onEmailChange.bind(this)}
            />
            <Input
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
            />
          </ScrollView>
        {this.renderError()}
        {this.renderButtons()}
      </View>
    );

  }

  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  formContainerStyle: {
    padding: 10,
    backgroundColor: '#0c0b0b',
    flex: 1,
  },
  headerContainer:{
    flex: 1.5,
    alignItems: 'center',
    paddingTop: 10
  },
  headerTextStyle: {
		color: 'white',
    fontSize: 40,
    alignSelf: 'center'
  },
	headerTitle: {
    flex: 1,
    flexDirection: 'row',
	},
	headerSubtitleStyle: {
		color: 'gray',
    fontWeight: 'bold',
    flex: 1,
	},
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  formButton: {
    flex: 1,
  },
  buttonContainer: {
    flex: .8,

  },
  resetPasswordText: {
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  signUpText: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    // paddingTop: 10,
  },
  bottomContainer: {
    flex:.3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ user }) => {
  const { email, password, error, loading, loggedIn } = user;

  return { email, password, error, loading, loggedIn };
};

const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  loginUser,
  goToResetPassword,
  goToRegistration,
  registrationError
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
