import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity,TextInput, Image, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { PickerInput, Input, Button, Spinner } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import Ionicons from 'react-native-vector-icons/Ionicons';
import data from '../../data/Colleges.json';
import {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  collegeChanged,
  majorChanged,
  passwordChanged,
  pointsChanged,
  privilegeChanged,
  pictureChanged,
  nationalityChanged, 
  birthDateChanged,
  confirmPasswordChanged,
  registrationError,
  quoteChanged,
  goToLogIn,
  editUser,
  goToProfile,
  } from '../../actions';

const collegeNames = [];
data.map(college => {collegeNames.push(college.collegeName)});
var majorNames =  {};
data.map(college => {majorNames[college.collegeName] = college.degrees});


const iconName = Platform.OS === 'ios'?'ios-arrow-dropdown':'md-arrow-dropdown';

class EditProfileForm extends Component {

    onFirstNameChange(text) {
      this.props.firstNameChanged(text);
    }
    onLastNameChange(text) {
      this.props.lastNameChanged(text);
    }
    onEmailChange(text) {
      this.props.emailChanged(text);
    }
    onCollegeChange(text) {
      this.props.collegeChanged(text);
    }
    onMajorChange(text) {
      this.props.majorChanged(text);
    }
    onPointsChange(text) {
      this.props.pointsChanged(text);
    }
    onPrivilegeChange(text) {
      this.props.privilegeChanged(text);
    }
    onPictureChange(text) {
      this.props.pictureChanged(text);
    }
    onPasswordChange(text) {
      this.props.passwordChanged(text);
    }
    onConfirmPasswordChange(text) {
      this.props.confirmPasswordChanged(text);
    }
    onNationalityChanged(text) {
      this.props.nationalityChanged(text);
    }
    onBirthDateChanged(text) {
      this.props.birthDateChanged(text);
    }
    onQuoteChange(text) {
      this.props.quoteChanged(text);
    }

    checkPrivilege(level){
      return (this.props.privilege !== undefined && this.props.privilege[level])
    }

  onButtonPress() {
    const {
      firstName,
      lastName,
      email,
      college,
      points,
      picture,
      major,
      registrationError,
      editUser,
      goToLogIn,
      goToProfile,
      quote } = this.props;

    const ucfStudentEmail = new RegExp(/^[A-Za-z0-9._%+-]+@(knights.|)ucf.edu$/i);


    
    if(this.checkPrivilege('eboard')) {
      if (firstName === '') {
        registrationError('Please enter your first name');
      } else if (lastName === '') {
        registrationError('Please enter your last name');
      } else if (email === '') {
        registrationError('Please enter your school email');
      } else if (!ucfStudentEmail.test(email)) {
        registrationError('Please use a "knights.ucf.edu", or "ucf.edu" email for registration');
      } else if (password === '') {
        registrationError('Please enter password');
      } else if (confirmPassword === '') {
        registrationError('Please confirm password');
      } else if (password !== confirmPassword) {
        registrationError('Passwords do not match, please try again');
      } else if (nationality == '') {
        registrationError('Please enter your country of origin');
      } else if (birthday == '') {
        registrationError('Please enter your date of birth');
      }
    } else if (college === '') {
      registrationError('Please enter college');
    } else if (major === '') {
      registrationError('Please enter major');
    }  else {
      this.onPointsChange(0);
      editUser( firstName, lastName, email, college, major, points, quote );
      goToProfile();
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

  renderConfirmButton() {
    return (
      <Button
        title={"Confirm"}
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  renderCancelButton() {
    return (
      <Button
        title={"Cancel"}
        onPress={this.props.goToProfile.bind(this)}
      />
    );
  }

  renderButtons() {
    if (this.props.loading) {
      return (
        <View style={{ marginTop: 40, marginBottom: 20}}>
          <Spinner/>
        </View>
      );
    };
    return (
      <View>
        {this.renderConfirmButton()}
        {this.renderCancelButton()}
      </View>
    );
  }

  renderIfEboard(){
    if (this.checkPrivilege('eboard')) {
      return (
        <View>
          <Input
              placeholder="First Name"
              value={this.props.firstName}
              onChangeText={this.onFirstNameChange.bind(this)}
            />
            <Input
              placeholder="Last Name"
              value={this.props.lastName}
              onChangeText={this.onLastNameChange.bind(this)}
            />
            <Input
              placeholder="School Email"
              keyboardType="email-address"
              value={this.props.email}
              onChangeText={this.onEmailChange.bind(this)}
            />

        </View>
      )
    }
  }

  renderPickers() {
    const {
      college,
      collegeChanged,
      major,
      majorChanged
    } = this.props

    const p1 = (college !== undefined && college !== null && college !== "") ?
      (<PickerInput
            title={"Colleges"}
            value={this.props.major}
            data={majorNames[college]}
            placeholder={"Select College"}
            onSelect={(text) => majorChanged(text)}/>) : (<View></View>)

        return(
        <View>
          <PickerInput
            title={"Colleges"}
            value={this.props.college}
            data={collegeNames}
            placeholder={"Select College"}
            onSelect={(text) => collegeChanged(text)}/>
          {p1}
          
        </View>
      )
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainerStyle}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>Edit Profile</Text>

          </View>

          <ScrollView
          ref={'scrollView'}
          decelerationRate={0}
          snapToAInterval={300}
          snapToAlignment={"center"}
          style={styles.scrollView}>

          <RkAvoidKeyboard>
            {this.renderIfEboard()}
            {this.renderPickers()}
            {/* <Input
              placeholder='Quote'
              autoCapitalize='sentences'
              maxLength={175}
              numberOfLines={5}
              multiline={true}
              value={this.props.quote}
              onChangeText={this.onQuoteChange.bind(this)}
              textAlignVertical='top'
            /> */}
          </RkAvoidKeyboard>
          </ScrollView>

          {this.renderError()}
          {this.renderButtons()}


        </View>
      </View>
    );
  }
}

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E1E1',
    justifyContent: 'flex-end',
  },
  formContainerStyle: {
    flex:1,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 30,
    paddingBottom:10,
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  blackText: {
    color: 'black'
  },
  quoteBox: {
    height: 100,
    padding: 15,
    color:'gray',
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 25
  },
  pickerTextInput:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  }
});

const mapStateToProps = ({ auth }) => {
  const {
    firstName,
    lastName,
    email,
    college,
    major,
    picture,
    points,
    privilege,
    error,
    loading,
    quote } = auth;

  return {
    firstName,
    lastName,
    email,
    college,
    major,
    picture,
    points,
    privilege,
    error,
    loading,
    quote };
};

const mapDispatchToProps = {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  collegeChanged,
  majorChanged,
  passwordChanged,
  pointsChanged,
  privilegeChanged,
  pictureChanged,
  nationalityChanged, 
  birthDateChanged,
  confirmPasswordChanged,
  registrationError,
  quoteChanged,
  goToLogIn,
  editUser,
  goToProfile,
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);
