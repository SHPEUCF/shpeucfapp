import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, resetPassword, goToLogIn } from '../../actions';
import { Card, CardSection, Spinner } from '../general';
import {RkTheme, RkAvoidKeyboard, RkTextInput, RkButton} from 'react-native-ui-kitten';

class ResetPasswordForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onButtonPress() {
    const { email, resetPassword } = this.props;
    resetPassword({ email })
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

  ResetPasswordButton() {
    return (
      <RkButton rkType='rounded stretch'
        style={{backgroundColor: '#FECB00', marginTop: 10, marginBottom: 10}}
        contentStyle={{color: 'white', fontWeight: 'bold'}}
        onPress={this.onButtonPress.bind(this)}>
        RESET
      </RkButton>
    );
  }

  LogInButton() {
    return (
      <View style={styles.resetPasswordContainer}>
        <TouchableOpacity
          onPress={this.props.goToLogIn}>
          <Text style={styles.loginButton}>Log In </Text>
        </TouchableOpacity>
        <Text>instead?</Text>
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
        {this.ResetPasswordButton()}
        {this.LogInButton()}
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
              <Text style={styles.headerTextStyle}>Reset Password</Text>
              <Text style={styles.headerSubtitleStyle}>Enter your email below</Text>
            </View>

            <RkTextInput
              rkType='rounded'
              placeholder="Email"
              value={this.props.email}
              autoCapitalize="none"
              maxLength={45}
              onChangeText={this.onEmailChange.bind(this)}
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
  loginButton: {
    fontWeight: 'bold',
    color: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, error } = auth;

  return { email, error };
};

const mapDispatchToProps = {
  emailChanged,
  resetPassword,
  goToLogIn };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
