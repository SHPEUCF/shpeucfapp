import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity,TextInput, Image, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { PickerInput, Input, Button, Spinner, DatePicker } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import Ionicons from 'react-native-vector-icons/Ionicons';
import collegesJson from '../../data/Colleges.json';
import countriesJson from '../../data/Countries.json';
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
  continentChanged,
  nationalityChanged, 
  genderChanged,
  birthDateChanged,
  confirmPasswordChanged,
  registrationError,
  quoteChanged,
  goToLogIn,
  editUser,
  goToProfile,
  } from '../../ducks';

const collegeNames = [];
collegesJson.map(college => {collegeNames.push(college.collegeName)});
var majorNames =  {};
collegesJson.map(college => {majorNames[college.collegeName] = college.degrees});
const continents = Object.keys(countriesJson);
var countries =  {};
continents.map(continent => {countries[continent] = countriesJson[continent]});


const iconName = Platform.OS === 'ios'?'ios-arrow-dropdown':'md-arrow-dropdown';

class EditProfileForm extends Component {

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
      password,
      confirmPassword,
      registrationError,
      continent,
      nationality,
      gender,
      birthday,
      goToProfile,
      quote,
      continentChanged,
      nationalityChanged,
      genderChanged,
      collegeChanged,
      majorChanged,
      birthDateChanged
      } = this.props;

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
      } else if (nationality === '') {
        registrationError('Please enter your country of origin');
      } else if (birthday === '') {
        registrationError('Please enter your date of birth');
      } else if (college === '') {
        registrationError('Please enter college');
      } else if (major === '') {
        registrationError('Please enter major');
      }
      else {
        editUser( firstName, lastName, email, college, major, quote, continent, nationality, gender, birthday );
        Actions.replace('profile')
      }
    } else if (college === '') {
      registrationError('Please enter college');
    } else if (major === '') {
      registrationError('Please enter major');
    }  else {
      editUser( firstName, lastName, email, college, major, quote, continent, nationality, gender, birthday );
      Actions.replace('profile')
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
  renderCollegePickers() {
    const {
      college,
      collegeChanged,
      major,
      majorChanged
    } = this.props

    const p1 = (college !== undefined && college !== null && college !== "") ?
      (<PickerInput
            title={"Major"}
            value={major}
            data={majorNames[college]}
            placeholder={"Select major"}
            onSelect={(text) => majorChanged(text)}/>) : (<View></View>)

        return(
        <View>
          <PickerInput
            title={"Colleges"}
            value={college}
            data={collegeNames}
            placeholder={"Select college"}
            onSelect={(text) => collegeChanged(text)}/>
          {p1}
          
        </View>
      )
  }

  renderCountryPickers() {
    const {
      continent,
      continentChanged,
      nationalityChanged,
      nationality
    } = this.props

    const p1 = (continent !== undefined && continent !== null && continent !== "") ?
      (<PickerInput
            title={"Nationality"}
            value={nationality}
            data={countries[continent]}
            placeholder={"Select country of origin"}
            onSelect={(text) => nationalityChanged(text)}/>) : (<View></View>)

        return(
        <View>
          <PickerInput
            title={"Continent"}
            value={continent}
            data={continents}
            placeholder={"Select continent of origin"}
            onSelect={(text) => continentChanged(text)}/>
          {p1}
          
        </View>
      )
  }

  renderIfEboard(){
    const {
      firstName,
      firstNameChanged,
      lastName,
      lastNameChanged,
      email,
      emailChanged,
      gender,
      genderChanged,
      birthday,
      birthDateChanged,
    } = this.props
    if (this.checkPrivilege('eboard')) {
      return (
        <View>
          <Input
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => firstNameChanged(text)}
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => lastNameChanged(text)}
            />
            <Input
              placeholder="School Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => emailChanged(text)}
            />
            <PickerInput
              title={"Gender"}
              value={gender}
              data={["Female","Male","Other","Do not wish to disclose"]}
              placeholder={"Select your gender"}
              onSelect={(text) => genderChanged(text)}
            />            
            {this.renderCountryPickers()}
            {this.renderCollegePickers()}

            <DatePicker
              placeholder={"Birthday"}
              value={birthday}
              onSelect={(text) => birthDateChanged(text)}
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
    var content = this.renderPickers();
    if (this.checkPrivilege('eboard')) content = this.renderIfEboard(); 
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
            {content}
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
    backgroundColor: '#2C3239',
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
    color: '#e0e6ed'
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

const mapStateToProps = ({ user }) => {
  const {
    firstName,
    lastName,
    email,
    college,
    major,
    continent,
    nationality,
    gender,
    birthday,
    picture,
    points,
    privilege,
    error,
    loading,
    quote } = user;

  return {
    firstName,
    lastName,
    email,
    college,
    major,
    continent,
    nationality,
    gender,
    birthday,
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
  continentChanged,
  nationalityChanged,
  genderChanged,
  birthDateChanged,
  confirmPasswordChanged,
  registrationError,
  quoteChanged,
  goToLogIn,
  editUser,
  goToProfile,
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);
