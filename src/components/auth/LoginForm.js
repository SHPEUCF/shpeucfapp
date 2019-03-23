import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, goToResetPassword, goToRegistration } from '../../actions';
import { Card, CardSection, Spinner, Button, Input } from '../general';
import {RkTheme, RkAvoidKeyboard, RkButton} from 'react-native-ui-kitten';

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
      <Button 
        title = "LOG IN"
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  renderResetPassword() {
    return (
      <View style={styles.resetPasswordContainer}>
        <TouchableOpacity
          onPress={this.props.goToResetPassword}>
          <Text style={styles.resetPasswordButton}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderSignUpButton() {
    return (
      <View style={styles.signUpContainer}>
        <Text style={styles.question}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={this.props.goToRegistration}>
          <Text style={styles.signUpButton}> Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderButtons() {
    if (this.props.loading) {
      return (
        <View style={{ marginTop: 40, marginBottom: 200}}>
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
          <ScrollView style={styles.formContainerStyle}> 
            <View style={{flex: .2}}></View>

              <View style={styles.headerContainer}>
                <View style={styles.container}>
                  <Image
                    source={require('../../assets/images/Icon_SHPE_UCF_152x152.png')}
                    style={{alignSelf: 'center'}}/>
                </View>
                <View style= {styles.headercolumn}>
                  <View style={styles.headerStyle}>
                    <Text style={styles.headerTextStyle}>S H P E  </Text>
                    <Text style={styles.headerlowerTextStyle}>U C F </Text>
                  </View>
                  <Text style={styles.headerSubtitleStyle}>Society of Hispanic Professional Engineers</Text>
                </View>
                </View>
                <RkAvoidKeyboard>
                <ScrollView>
                <View style={styles.input}>
                  <Input       
                  placeholder="Knights Email"
                  value={this.props.email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={this.onEmailChange.bind(this)}
                />
                <Input
                  color="black"
                  secureTextEntry={true}
                  placeholder="Password"
                  value={this.props.password}
                  onChangeText={this.onPasswordChange.bind(this)}
                />
                </View>
              </ScrollView>
              </RkAvoidKeyboard>
            
            <View style={styles.buttonContainer}>
                <View>
                  {this.renderError()}
                </View>
                <View>
                  {this.renderButtons()}
                </View>
              </View>
          </ScrollView>
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
    paddingTop: 40,
  },
  formContainerStyle: {
    backgroundColor: '#0c0b0b',
    flexDirection: 'column',
    flex: 1,
  },
  headerStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: .2,
  },
  headerContainer:{
    flex: 2,
    paddingTop: 40,
  },
  headerTextStyle: {
		color: 'white',
    fontSize: 40,
    flex: .45,
  },
	headercolumn: {
   flexDirection: 'column',
	 alignItems: 'center',
	 justifyContent: 'center',
   flex: .8,
	},
	headerlowerTextStyle: {
		color: '#FFC107',
    fontSize: 40,
  },
	headerSubtitleStyle: {
		color: 'gray',
    fontWeight: 'bold',
    flex: .5,
    paddingTop: 10,
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
    flex: 1,
    paddingTop: 10,
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  resetPasswordButton: {
    fontWeight: 'bold',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },
  signUpButton: {
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 10,
  },
	question: {
		fontWeight: 'bold',
    color: 'grey',
    paddingTop: 10,
	},
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
  input: {
    flex: 1,
    paddingTop: 50,
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
