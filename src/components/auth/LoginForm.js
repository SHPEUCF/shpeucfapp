import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, goToResetPassword, goToRegistration } from '../../actions';
import { Card, CardSection, Spinner } from '../general';
import {RkTheme, RkAvoidKeyboard, RkTextInput, RkButton} from 'react-native-ui-kitten';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
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

  renderLogInButton() {
    return (
      <RkButton rkType='rounded stretch'
        style={{backgroundColor: '#FECB00', marginTop: 10, marginBottom: 10}}
        contentStyle={{color: 'white', fontWeight: 'bold'}}
        onPress={this.onButtonPress.bind(this)}>
        LOGIN
      </RkButton>
    );
  }

  renderResetPassword() {
    return (
      <View style={styles.resetPasswordContainer}>
        <TouchableOpacity
          onPress={this.props.goToResetPassword}>
          <Text style={styles.resetPasswordButton}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderSignUpButton() {
    return (
      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={this.props.goToRegistration}>
          <Text style={styles.signUpButton}>Sign up now</Text>
        </TouchableOpacity>
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
        {this.renderLogInButton()}
        {this.renderResetPassword()}
        {this.renderSignUpButton()}
      </View>
    );
  }

  renderContent() {
    if (this.props.loggedIn) {
      return <Spinner />;
    } else {
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
              <Text style={styles.headerSubtitleStyle}>Please Log In or Sign Up</Text>
            </View>

            <RkTextInput
              rkType='rounded'
              placeholder="Knights Email"
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
              maxLength={45}
              onChangeText={this.onPasswordChange.bind(this)}
              />

            {this.renderError()}
            {this.renderButtons()}

            </RkAvoidKeyboard>
          </View>
        </View>
      );
    }
  }

  render() {
    return this.renderContent();
  }
}

RkTheme.setType('RkTextInput','rounded', {
  input: {
    borderRadius: 5
  },
  color: 'gray',
  container: {
    borderWidth: 2,
    backgroundColor: '#FFF'
  }
});

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
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  resetPasswordButton: {
    fontWeight: 'bold',
    color: '#0099ff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpButton: {
    fontWeight: 'bold',
    color: '#000'
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedIn } = auth;

  return { email, password, error, loading, loggedIn };
};

const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  loginUser,
  goToResetPassword,
  goToRegistration};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
