import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser, goToRegistration } from '../../actions';
import { Button, Card, CardSection, Input, Spinner } from '../general';

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
        <View style={{ backgroundColor: 'white'}}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderLogInButton() {
    if (this.props.loading) {
      return <Spinner size="small" />
    };

    return (
      <Button
        onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  renderSignUpButton() {
    if (!this.props.loading) {
      return (
        <TouchableOpacity
          onPress={this.props.goToRegistration}>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={styles.formContainerStyle}>

        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>Welcome! Please Log In or Sign Up</Text>
        </View>

        <View style={styles.formFieldsContainer}>
          <View style={styles.formField}>
            <Input
              label="Email"
              placeholder="user@knights.ucf.com"
              value={this.props.email}
              autoCapitalize="none"
              maxLength={45}
              onChangeText={this.onEmailChange.bind(this)}
              />
          </View>

          <View style={styles.formField}>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              value={this.props.password}
              maxLength={45}
              onChangeText={this.onPasswordChange.bind(this)}
              />
          </View>
        </View>

        <View>
          {this.renderError()}
        </View>

        <View style={styles.formButton}>
          {this.renderLogInButton()}
        </View>

        <View style={styles.signUpContainer}>
          <View>
            <Text>Don't have an account? </Text>
          </View>
          <View>
            {this.renderSignUpButton()}
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainerStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 100,
  },
  headerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  headerTextStyle: {
    fontSize: 14,
  },
  formFieldsContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 5,
  },
  formField: {
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
  },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red',
    padding: 10,
  },
  formButton: {
    flexDirection: 'row',
    marginRight: 70,
    marginLeft: 70,
    marginTop: 10,
    marginBottom: 10
  },
  signUpButton: {
    fontWeight: 'bold',
    color: '#007aff'
  },
  signUpContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, } = auth;

  return { email, password, error, loading };
};
const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  loginUser,
  goToRegistration }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
