import React, { Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, createUser, goToLogIn } from '../../actions';
import { Card, CardSection, Input, Spinner } from '../general';
import {RkAvoidKeyboard, RkTextInput, RkButton} from 'react-native-ui-kitten';

class RegistrationForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.createUser({ email, password });
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
    if (this.props.loading) {
      return <Spinner size="small" />
    };

    return (
      <RkButton rkType='rounded stretch'
        style={{backgroundColor: '#FECB00'}}
        contentStyle={{color: 'white', fontWeight: 'bold'}}
        onPress={this.onButtonPress.bind(this)}>
        SIGN UP
      </RkButton>
    );
  }
  renderLogInButton() {
    if (!this.props.loading) {
      return (
        <TouchableOpacity
          onPress={this.props.goToLogIn}>
          <Text style={styles.logInButton}>Log In</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainerStyle}>
          <RkAvoidKeyboard>
            <View style={{flexDirection: 'row', justifyContent: 'center', bottom: 10}}>
              <Image
                source={require('../../assets/images/Icon_SHPE_UCF_152x152.png')}
                style={{width: 100, height: 100}}/>
            </View>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>SHPE @ UCF</Text>
            <Text style={styles.headerSubtitleStyle}>Registration</Text>
          </View>

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

          <View>
            {this.renderError()}
          </View>

          <View style={styles.formButton}>
            {this.renderSignUpButton()}
          </View>

          <View style={styles.logInContainer}>
            <View>
              <Text>Already have an account? </Text>
            </View>
            <View>
              {this.renderLogInButton()}
            </View>
          </View>
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
    marginBottom: 50,
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
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  createUser,
  goToLogIn }

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
