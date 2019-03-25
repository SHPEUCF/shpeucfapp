import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Input, NavBar } from '../components/general';
import { RkAvoidKeyboard } from 'react-native-ui-kitten';

import { Avatar } from 'react-native-elements';
import {
  getPositions,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  addApplication,
  editCandidates,
  candidateFNameChanged,
  candidateLNameChanged,
  candidatePlanChanged,
  candidatePositionChanged,
  goToCandidateForm,
  vote,
  editApplication
} from '../actions';
import _ from 'lodash';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput
  } from 'react-native';

  // adding a random comment

const dimension = Dimensions.get('window');

class Election extends Component {
  

  renderButtons(){

  }

  render() {
    const {
      page,
      content,
      textStyle,
      textColor
      } = styles;

    return (

      <View style={page}>
        <NavBar title="Election Candidates" back onBack={() => Actions.pop()} />
        <View style={content}>
          <View style={{flex: .6, paddingTop: 30}}>
            <Text style={[textStyle, {fontWeight: 'bold'},textColor]}>"Don't Boo, Vote"</Text>
            <Text style={[textStyle, {fontWeight: 'bold', alignSelf: 'center'},textColor]}>                     - Barrack Obama</Text>
          </View>
        </View>
          {/* <Text style={[textStyle, textColor]}>Your vote today is having a huge impact on the path that SHPE UCF is paving for the future</Text> */}
        <Button
           title="Run For Office"
           onPress = {() => {Actions.ElectionApplication()}}
           />
        <Button
         title="Vote"
         onPress = {() => {
           if (!this.props.voted) Actions.ElectionBallot();
          else alert("You already voted!");
          }}
         />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page:{
    flex: 1,
    backgroundColor: '#2C3239',
    paddingBottom: 10
  },
  textStyle: {
    flex: .2,
    fontSize: 20,

  },
  textColor: {
    color: '#e0e6ed'
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

const mapStateToProps = ({ elect, auth }) => {
  const { election, positions, candidatePlan, apply } = elect;
  const { firstName, lastName, id, voted, applied} = auth

  return { election, positions, candidatePlan, firstName, lastName, id, voted, apply, applied};
};

const mapDispatchToProps = {
  getPositions,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  addApplication,
  goToCandidateForm,
  candidateFNameChanged,
  candidateLNameChanged,
  candidatePlanChanged,
  candidatePositionChanged,
  vote,
  editApplication
};

export default connect(mapStateToProps, mapDispatchToProps)(Election);
