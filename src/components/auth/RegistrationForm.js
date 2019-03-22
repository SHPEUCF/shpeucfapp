import React, { Component} from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Card,
  Input,
  Button,
  Spinner,
  PickerInput,
  DatePicker
} from '../general';
import {RkAvoidKeyboard, RkTextInput, RkPicker, RkText} from 'react-native-ui-kitten';
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
  nationality_changed, 
  dateBirthChanged,
  confirmPasswordChanged,
  registrationError,
  createUser,
  goToLogIn,
  quoteChanged } from '../../actions';

const collegeNames = [];
data.map(college => {collegeNames.push(college.collegeName)});
var majorNames =  {};
data.map(college => {majorNames[college.collegeName] = college.degrees});

const iconName= Platform.OS === 'ios'?'ios-arrow-dropdown':'md-arrow-dropdown';

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
  onnationality_changed(text) {
    this.props.nationality_changed(text);
  }
  onDateBirthChanged(text) {
    this.props.dateBirthChanged(text);
  }
  onQuoteChange(text) {
    this.props.quoteChanged(text);
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
      password,
      confirmPassword,
      registrationError,
      createUser,
      nationality,
      birthday,
      goToLogIn,
      quote } = this.props;

    const ucfStudentEmail = new RegExp(/^[A-Za-z0-9._%+-]+@(knights.|)ucf.edu$/i);

    if (firstName === '') {
      registrationError('Please enter your first name');
    } else if (lastName === '') {
      registrationError('Please enter your last name');
    } else if (email === '') {
      registrationError('Please enter your school email');
    } else if (!ucfStudentEmail.test(email)) {
       registrationError('Please use a "knights.ucf.edu", or "ucf.edu" email for registration');
    } else if (college === '') {
      registrationError('Please enter college');
    } else if (major === '') {
      registrationError('Please enter major');
    } else if (password === '') {
      registrationError('Please enter password');
    } else if (confirmPassword === '') {
      registrationError('Please confirm password');
    } else if (password !== confirmPassword) {
      registrationError('Passwords do not match, please try again');
    } else if(nationality == '') {
      registrationError('Please enter your country of origin');
    } else if(birthday == ''){
      registrationError('Please enter your date of birth');
    } else if (password === confirmPassword) {
      this.onPointsChange(0);
      createUser({ firstName, lastName, email, college, major, points, picture, password, quote , nationality, birthday});
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
            data={majorNames[college]}
            placeholder={"Select College"}
            onSelect={(text) => majorChanged(text)}/>) : (<View></View>)

        return(
        <View>
          <PickerInput
            title={"Colleges"}
            data={collegeNames}
            placeholder={"Select College"}
            onSelect={(text) => collegeChanged(text)}/>
          {p1}
          
        </View>
      )
  }

  renderSignUpButton() {
    return (
      <Button 
        title = "SIGN UP"
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  renderLogInButton() {
    return (
      <View style={styles.logInContainer}>
        <Text style={styles.Alreadyaccount}>Already have an account? </Text>
        <TouchableOpacity
          onPress={this.props.goToLogIn}>
          <Text style={styles.logInButton}> Log In</Text>
        </TouchableOpacity>
      </View>
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
        {this.renderSignUpButton()}
        {this.renderLogInButton()}
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainerStyle}>

          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>SHPE UCF</Text>
            <Text style={styles.headerSubtitleStyle}>Registration</Text>
						<Text style={styles.underheaderSubtitleStyle}> </Text>
          </View>

          <ScrollView
          ref={'scrollView'}
          decelerationRate={0}
          snapToAInterval={300}
          snapToAlignment={"center"}
          style={styles.scrollView}>

          <RkAvoidKeyboard>
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

            <Input
              secureTextEntry
              placeholder="Password"
              value={this.props.password}
              maxLength={30}
              onChangeText={this.onPasswordChange.bind(this)}
              />
            <Input
              secureTextEntry
              placeholder="Confirm Password"
              value={this.props.confirmPassword}
              maxLength={30}
              onChangeText={this.onConfirmPasswordChange.bind(this)}
              />

            {/* <Input
              placeholder="Country of Origin"
              value={this.props.nationality}
              onChangeText={this.onnationality_changed.bind(this)}
              /> */}
            <DatePicker
              placeholder={"Birthday"}
              onSelect={(text) => this.onDateBirthChanged(text)}
              />
            {this.renderPickers()}
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
    backgroundColor: 'gray',
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
		color: 'white',
  },
	headerSubtitleStyle:{
		marginTop: 3,
		color: 'white',
	},
	underheaderSubtitleStyle:{
		marginTop: 4,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		width: '100%'
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
    color: 'white',
  },
  logInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
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
  },
	Alreadyaccount: {
		color: 'black',
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
    password,
    nationality,
    birthday,
    confirmPassword,
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
    password,
    nationality,
    birthday,
    confirmPassword,
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
  pointsChanged,
  privilegeChanged,
  pictureChanged,
  passwordChanged,
  nationality_changed,
  dateBirthChanged,
  confirmPasswordChanged,
  registrationError,
  createUser,
  goToLogIn,
  quoteChanged }

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
