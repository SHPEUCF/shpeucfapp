import React, { Component} from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  majorChanged,
  passwordChanged,
  confirmPasswordChanged,
  registrationError,
  createUser,
  goToLogIn } from '../../actions';
import { Card, CardSection, Input, Spinner } from '../general';
import {RkAvoidKeyboard, RkTextInput, RkButton, RkPicker, RkText} from 'react-native-ui-kitten';
import Ionicons from 'react-native-vector-icons/Ionicons';
import data from '../../data/Colleges.json';

const collegeNames = [];
var majorNames =  [];
majorNames.push(data[0].degrees);
data.map((college) =>
{
  collegeNames.push({key:college.key, value:college.collegeName});
}
);
const iconName= Platform.OS === 'ios'?'ios-arrow-dropdown':'md-arrow-dropdown';
//collegeNames.slice(1, 2)
class RegistrationForm extends Component {
  state = {collegeSelected:collegeNames.slice(0,1),
    majorSelected:majorNames.slice(0,1),
    pickerVisible: false,
    pickerVisible2: false};

  componentWillMount(){
    console.log(collegeNames);
  }

  onFirstNameChange(text) {
    this.props.firstNameChanged(text);
  }
  onLastNameChange(text) {
    this.props.lastNameChanged(text);
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onMajorChange(text) {
    this.props.majorChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onConfirmPasswordChange(text) {
    this.props.confirmPasswordChanged(text);
  }

  onButtonPress() {
    const {
      firstName,
      lastName,
      email,
      major,
      password,
      confirmPassword,
      registrationError,
      createUser } = this.props;

    const ucfStudentEmail = new RegExp(/^[A-Za-z0-9._%+-]+@(knights.|)ucf.edu$/i);

    if (email === '') {
      registrationError('Please enter email');
    } else if (!ucfStudentEmail.test(email)) {
      registrationError('Please use a "knights.ucf.edu", or "ucf.edu" email for registration');
    } else if (major === '') {
      registrationError('Please enter major');
    } else if (password === '') {
      registrationError('Please enter password');
    } else if (confirmPassword === '') {
      registrationError('Please confirm password');
    } else if (password !== confirmPassword) {
      registrationError('Passwords do not match, please try again');
    } else if (password === confirmPassword) {
      createUser({ firstName, lastName, email, major, password });
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

  renderSignUpButton() {
    return (
      <RkButton rkType='rounded stretch'
        style={{backgroundColor: '#FECB00', marginTop: 10, marginBottom: 10}}
        contentStyle={{color: 'white', fontWeight: 'bold'}}
        onPress={this.onButtonPress.bind(this)}>
        SIGN UP
      </RkButton>
    );
  }

  renderLogInButton() {
    return (
      <View>
        <View style={styles.logInContainer}>
          <View>
            <Text>Already have an account? </Text>
          </View>
        <TouchableOpacity
          onPress={this.props.goToLogIn}>
          <Text style={styles.logInButton}>Log In</Text>
        </TouchableOpacity>
        </View>
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
        {this.renderSignUpButton()}
        {this.renderLogInButton()}
      </View>
    );
  }

  showPicker1 = () => {
    this.setState({pickerVisible: true})
  };

  hidePicker1 = () => {
    this.setState({pickerVisible: false});
  };

  showPicker2 = () => {
    this.setState({pickerVisible2: true})
  };

  hidePicker2 = () => {
    this.setState({pickerVisible2: false});
  };

  handlePickedValueCollege = (input) =>{
    this.setState({collegeSelected: input});
    this.populateMajorArray(input);
    this.hidePicker1();
  };

  handlePickedValueMajor = (input2) =>{
    this.setState({majorSelected: input2});
    console.log('state', input2);
    this.hidePicker2();
  };
  populateMajorArray(cName){
    console.log('cName', cName);
      majorNames = [];
      majorNames.push('Select a Major');
      var i = 2;

      var temp = data.slice(cName[0].key-1, cName[0].key);
      console.log('temp ', temp);
      temp[0].degrees.map((aDegree, k)=>{
        majorNames.push(aDegree);
      });
      console.log('majorNames ', majorNames);
  }



  render() {
    return (
      <View style={styles.container}>

       <View style={styles.formContainerStyle}>


          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>SHPE @ UCF</Text>
            <Text style={styles.headerSubtitleStyle}>Registration</Text>
          </View>


          <ScrollView
          ref={'scrollView'}
          style={{flex:0, paddingTop:10, paddingBottom:10}}>


          <RkAvoidKeyboard>
            <RkTextInput
              rkType='rounded'
              placeholder="First Name"
              value={this.props.firstName}
              autoCapitalize="words"
              maxLength={45}
              onChangeText={this.onFirstNameChange.bind(this)}
              />
            <RkTextInput
              rkType='rounded'
              placeholder="Last Name"
              value={this.props.lastName}
              autoCapitalize="words"
              maxLength={45}
              onChangeText={this.onLastNameChange.bind(this)}
              />

            <RkTextInput
              rkType='rounded'
              placeholder="School Email"
              keyboardType="email-address"
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
            <RkTextInput
              rkType='rounded'
              secureTextEntry
              placeholder="Confirm Password"
              value={this.props.confirmPassword}
              maxLength={30}
              onChangeText={this.onConfirmPasswordChange.bind(this)}
              />



  <View style={styles.pickerTextInput}>
      <RkTextInput style={{flex:1}}
        rkType='rounded'
        maxLength={45}
        editable={false}
        value={this.state.collegeSelected[0].value }/>
        <TouchableOpacity
          style={{alignItems:'flex-end', margin: 10}}
          onPress={this.showPicker1}>
          <Ionicons name={iconName} size={45}/>
        </TouchableOpacity>
    </View>

    <RkPicker
      rkType='rounded'
      optionHeight={80}
      optionRkType={'large'}
      selectedOptionRkType={'xlarge info'}
      confirmButtonText={'Select'}
      title="Colleges"
      titleTextRkType={'xxlarge'}
      data={[collegeNames]}
      visible={this.state.pickerVisible}
      onConfirm={this.handlePickedValueCollege}
      onCancel={this.hidePicker1}
      selectedOptions={this.state.collegeSelected}
      />

<View style={styles.pickerTextInput}>
  <RkTextInput style={{flex:1}}
    rkType='rounded'
    maxLength={45}
    editable={false}
    value={this.state.majorSelected[0] }/>
    <TouchableOpacity
      style={{alignItems:'flex-end', margin: 10}}
      onPress={this.showPicker2}>
      <Ionicons name={iconName} size={45}/>
    </TouchableOpacity>
</View>

<RkPicker
  rkType='rounded'
  optionHeight={80}
  optionRkType={'large'}
  selectedOptionRkType={'xlarge info'}
  confirmButtonText={'Select'}
  title="Degrees"
  titleTextRkType={'xxlarge'}
  data={[majorNames]}
  visible={this.state.pickerVisible2}
  onConfirm={(major) => {
    console.log('major ', major)
    this.setState({majorSelected: major})
    this.setState({pickerVisible2: false})
  }}
  onCancel={this.hidePicker2}
  selectedOptions={this.state.majorSelected}
  />


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
    flex: 1,
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
  }
});

const mapStateToProps = ({ auth }) => {
  const {
    firstName,
    lastName,
    email,
    major,
    password,
    confirmPassword,
    error,
    loading } = auth;

  return {
    firstName,
    lastName,
    email,
    major,
    password,
    confirmPassword,
    error,
    loading };
};

const mapDispatchToProps = {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  majorChanged,
  passwordChanged,
  confirmPasswordChanged,
  registrationError,
  createUser,
  goToLogIn }

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
