import React, { Component} from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  registrationError,
  createUser,
  goToLogIn } from '../../actions';
import { Card, CardSection, Input, Spinner } from '../general';
import {RkAvoidKeyboard, RkTextInput, RkButton} from 'react-native-ui-kitten';

class RegistrationForm extends Component {

  onFirstNameChange(text) {
    this.props.firstNameChanged(text);
  }
  onLastNameChange(text) {
    this.props.lastNameChanged(text);
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onConfirmPasswordChange(text) {
    this.props.confirmPasswordChanged(text);
  }

  onButtonPress() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      registrationError,
      createUser } = this.props;

    if (password === '') {
      registrationError('Please enter password');
    } else if (confirmPassword === '') {
      registrationError('Please confirm password');
    } else if (password !== confirmPassword) {
      registrationError('Passwords do not match, please try again');
    } else if (password === confirmPassword) {
      createUser({ firstName, lastName, email, password });
    }
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderSignUpButton() {
    return (
      <RkButton rkType='rounded stretch'
        style={{backgroundColor: '#FECB00', marginTop: 10, marginBottom: 10}}
        contentStyle={{color: 'white', fontWeight: 'bold'}}
        onPress={this.onButtonPress.bind(this)}>
        SIGN UP
      </RkButton>
    );
  }

  renderLogInButton() {
    return (
      <View>
        <View style={styles.logInContainer}>
          <View>
            <Text>Already have an account? </Text>
          </View>
        <TouchableOpacity
          onPress={this.props.goToLogIn}>
          <Text style={styles.logInButton}>Log In</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderButtons() {
    if (this.props.loading) {
      return (
        <View style={{ marginTop: 40, marginBottom: 20}}>
          <Spinner size="large" />
        </View>
      );
    };
    return (
      <View>
        {this.renderSignUpButton()}
        {this.renderLogInButton()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainerStyle}>
          <RkAvoidKeyboard>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>SHPE @ UCF</Text>
            <Text style={styles.headerSubtitleStyle}>Registration</Text>
          </View>

            <RkTextInput
              rkType='rounded'
              placeholder="First Name"
              value={this.props.firstName}
              autoCapitalize="words"
              maxLength={45}
              onChangeText={this.onFirstNameChange.bind(this)}
              />
            <RkTextInput
              rkType='rounded'
              placeholder="Last Name"
              value={this.props.lastName}
              autoCapitalize="words"
              maxLength={45}
              onChangeText={this.onLastNameChange.bind(this)}
              />
            <RkTextInput
              rkType='rounded'
              placeholder="School Email"
              value={this.props.email}
              autoCapitalize="none"
              maxLength={45}
              onChangeText={this.onEmailChange.bind(this)}
              />
            <RkTextInput
              rkType='rounded'
              secureTextEntry
              placeholder="Password"
              value={this.props.password}
              maxLength={30}
              onChangeText={this.onPasswordChange.bind(this)}
              />
            <RkTextInput
              rkType='rounded'
              secureTextEntry
              placeholder="Confirm Password"
              value={this.props.confirmPassword}
              maxLength={30}
              onChangeText={this.onConfirmPasswordChange.bind(this)}
              />
          {this.renderError()}
          {this.renderButtons()}
        </RkAvoidKeyboard>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E1E1',
    justifyContent: 'flex-end',
  },
  formContainerStyle: {
    marginLeft: 20,
    marginRight: 20,
    bottom: 70,
  },
  headerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10,
  },
  headerTextStyle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
    padding: 10,
  },
  formButton: {
    marginTop: 10,
    marginBottom: 10
  },
  logInButton: {
    fontWeight: 'bold',
    color: '#000'
  },
  logInContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  }
});

const mapStateToProps = ({ auth }) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    error,
    loading } = auth;

  return { firstName, lastName, email, password, confirmPassword, error, loading };
};

const mapDispatchToProps = {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  registrationError,
  createUser,
  goToLogIn }

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
