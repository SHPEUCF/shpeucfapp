import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, resetPassword, goToLogIn } from '../../ducks';
import { Card, CardSection, Button, Spinner } from '../general';
import { Input } from '../general'

const dimension = Dimensions.get('window');
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
      <Button 
        title = "RESET"
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  LogInButton() {
    return (
      <View style={styles.resetPasswordContainer}>
        <TouchableOpacity
          onPress={this.props.goToLogIn}>
          <Text style={styles.loginButton}>Log In </Text>
        </TouchableOpacity>
        <Text style={styles.insteadButton}> instead?</Text>
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
            <View style={styles.headerStyle}>
              <Text style={styles.headerTextStyle}>Reset Password</Text>
              <Text style={styles.headerSubtitleStyle}>Enter your email below</Text>
            </View>
            <View style = {{height: dimension.height *.1}}>
            <Input
              placeholder="Email"
              value={this.props.email}
              autoCapitalize="none"
              maxLength={45}
              onChangeText={this.onEmailChange.bind(this)}
              />
            <View style = {{height: dimension.height * .02}}></View>
            </View>
            {this.renderError()}
            {this.renderButtons()}
          </View>
        </View>
      );
    }
  }

  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0b0b',
    justifyContent: 'center',
  },
  formContainerStyle: {
    marginLeft: 20,
    marginRight: 20,
  },
  headerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 30,
  },
  headerTextStyle: {
		color: 'white',
    fontSize: 22,
  },
	headerSubtitleStyle: {
		color: 'gray',
		marginTop: 10,
		marginBottom: 10,
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
    color: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
		color: 'white',
  },
	insteadButton:{
		color: 'gray',
		marginBottom: 20,
	}
});

const mapStateToProps = ({ user }) => {
  const { email, error } = user;

  return { email, error };
};

const mapDispatchToProps = {
  emailChanged,
  resetPassword,
  goToLogIn };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
