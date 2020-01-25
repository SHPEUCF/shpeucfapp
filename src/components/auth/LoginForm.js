import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  goToResetPassword,
  goToRegistration,
  registrationError
} from '../../ducks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner, Button, Input } from '../general';
const dimension = Dimensions.get('window');

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

    if(email === null || email === undefined ||  email === ''){
      this.props.registrationError('Please enter your knights email')
    } 
    else if ( password === null || password === undefined || password === ''){
      this.props.registrationError('Please enter your password')
    } 
    else{
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
          style={[bottomContainer, {flex: .4,  alignItems: "flex-start"}]}
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
        <View style={{flexDirection: "row", flex: 1, alignItems: "center"}}> 
          <View style={{flex: .3}}></View>
            <View style={{flex: 1}}>
            <View style={{flex: .5,justifyContent: "center"}}>
            <Button
              title = "Log in"
              onPress={this.onButtonPress.bind(this)}
            />
            </View>
            {this.renderResetPassword()}
            </View>
          <View style={{flex: .3}}></View>
        </View>
        
              
              
           
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
      <KeyboardAwareScrollView
      style={{backgroundColor:  "#0c0b0b"}}
      resetScrollToCoords={{ x: 0, y: 0}}
      contentContainerStyle={{flexGrow: 1}}
      scrollEnabled={true}
      enableOnAndroid={true}
      >
      <SafeAreaView style={formContainerStyle}>
        <View style={{flex: 1, backgroundColor: "#FECB00"}}>
          <View style={{flex: .1}}></View>
            <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
              <Image
                 source={require('../../assets/images/SHPE_UCF_Logo.png')}
                 style={{alignSelf: 'center'}}
                 height = {dimension.height * .5}
                 resizeMode="contain"
              /> 
            </View>
            <View style={headerContainer}>
              <View style={headerTitle}>
                <Text style={headerTextStyle}>S H P E  </Text>
                <Text style={[headerTextStyle, {color: 'white'}]}>U C F</Text>
              </View>
              <Text style={headerSubtitleStyle}>Society of Hispanic Professional Engineers</Text>
            </View>
            <View style={{flex: .2}}></View>
          </View>
          <View style={{flex: .18}}></View>
          <View style= {{flex: .5, paddingLeft: "5%", paddingRight: "5%", justifyContent: "space-evenly"}}>
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
          </View>
        {this.renderError()}
        {this.renderButtons()}
      </SafeAreaView>
      </KeyboardAwareScrollView>
    );

  }

  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  formContainerStyle: {
    backgroundColor: '#0c0b0b',
    height: dimension.height
  },
  headerContainer:{
    flex: .6,
    alignItems: 'center',
    justifyContent: "space-evenly",
  },
  headerTextStyle: {
		color: 'black',
    fontSize: 40,
    alignSelf: 'center'
  },
	headerTitle: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
	},
	headerSubtitleStyle: {
		color: 'gray',
    fontWeight: 'bold',
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
    flex: .7,
  },
  resetPasswordText: {
    fontWeight: 'bold',
    color: 'white',
  },
  signUpText: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    // paddingTop: 10,
  },
  bottomContainer: {
    flex: .6,
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
