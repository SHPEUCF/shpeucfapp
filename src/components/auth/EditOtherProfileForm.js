import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity,TextInput, Image, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button, Spinner } from '../general';
import { RkAvoidKeyboard, RkButton, RkPicker } from 'react-native-ui-kitten';
import Ionicons from 'react-native-vector-icons/Ionicons';
import data from '../../data/Colleges.json';
import {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  collegeChanged,
  majorChanged,
  pointsChanged,
  privilegeChanged,
  pictureChanged,
  registrationError,
  editMember,
  goToOtherProfile,
  quoteChanged
} from '../../ducks';

const collegeNames = [];
data.map(college => {collegeNames.push({key:college.key, value:college.collegeName})});
var majorNames =  [];
majorNames.push(data[0].degrees);

const iconName = Platform.OS === 'ios'?'ios-arrow-dropdown':'md-arrow-dropdown';

class EditProfileForm extends Component {
  state = {collegeSelected: collegeNames.slice(0,1),
    majorSelected: majorNames.slice(0,1),
    pickerVisible: false,
    pickerVisible2: false};

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
      editMember,
      goToOtherProfile,
      quote,
      id } = this.props;

    const ucfStudentEmail = new RegExp(/^[A-Za-z0-9._%+-]+@(knights.|)ucf.edu$/i);
    const {goBack} = this.props.navigation;

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
    } else if (quote === '') {
      registrationError('Please enter a quote');
    }
    else {
      this.onPointsChange(0);
      editMember( firstName, lastName, email, college, major, points, quote,  );
      goBack();
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
    const {goBack} = this.props.navigation;
    return (
      <Button
        title={"Cancel"}
        onPress={() => goBack()}
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
    this.onCollegeChange(input[0].value);
    this.populateMajorArray(input);
    this.hidePicker1();
  };

  handlePickedValueMajor = (input2) =>{
    this.setState({majorSelected: input2});
    this.onMajorChange(input2[0]);
    this.hidePicker2();
  };
  populateMajorArray(cName){
      majorNames = [];
      majorNames.push('Select a Major');
      var i = 2;

      var temp = data.slice(cName[0].key-1, cName[0].key);
      temp[0].degrees.map((aDegree)=>{
        majorNames.push(aDegree);
      });
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

            <View style={styles.pickerTextInput}>
              <Input
                style={{flex: 1}}
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
              optionRkType={'medium'}
              selectedOptionRkType={'medium danger'}
              confirmButtonText={'Select'}
              title="Colleges"
              titleTextRkType={'large'}
              data={[collegeNames]}
              visible={this.state.pickerVisible}
              onConfirm={this.handlePickedValueCollege}
              onCancel={this.hidePicker1}
              selectedOptions={this.state.collegeSelected}
              />

            <View style={styles.pickerTextInput}>
              <Input
                style={{flex: 1}}
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
              optionRkType={'medium'}
              selectedOptionRkType={'medium danger'}
              confirmButtonText={'Select'}
              title="Degrees"
              titleTextRkType={'large'}
              data={[majorNames]}
              visible={this.state.pickerVisible2}
              onConfirm={this.handlePickedValueMajor}
              onCancel={this.hidePicker2}
              selectedOptions={this.state.majorSelected}
              />

              <Input
                placeholder='Quote'
                autoCapitalize='sentences'
                maxLength={175}
                numberOfLines={5}
                multiline={true}
                value={this.props.quote}
                onChangeText={this.onQuoteChange.bind(this)}
                textAlignVertical='top'
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

const mapStateToProps = ({ members }) => {
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
    quote,
    id } = members;

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
    quote,
    id };
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
  registrationError,
  quoteChanged,
  editMember,
  goToOtherProfile,
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);
