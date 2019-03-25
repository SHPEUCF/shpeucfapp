import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Input } from '../components/general';
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
const iterateesPos = ['level'];
const orderPos = ['asc'];

const iterateesCan = ['lastName','firstName'];
const orderCan = ['asc','asc'];

const vColor = '#00ff7f';



      /* Color idea doesnt work
         the color is annoying maybe a check box  */

var dict = [];

class Election extends Component {

  componentWillMount() {
      this.props.getPositions();

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

 optionButtons(){
   return (
     <View>
       {this.applyButton()}
       <Text>Write a message to tell the importance of voting for the chapter</Text>
      { /* open a modal page whre the person can vote for the candidates */}
       <Button
         title="Vote"
         onPress = {() => {
           if (!this.props.voted)
           Actions.ElectionBallot();
          else {
            alert("You already voted!");
          }}}
         />
     </View>
   )
 }

 applyButton(){
   if (this.props.apply){
     return (
       <View>
         <Text>Write an aspiring message for member to run for office</Text>
         {/* open a modal page whre the person can apply for a position */}
         <Button
           title="Run For Office"
           onPress = {() => {Actions.ElectionApplication()}}
           />
       </View>
     )
   }
 }

  render() {
    const {
      containerStyle,
      contentContainerStyle } = styles;

    return (

      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        {this.optionButtons()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  contentContainerStyle: {
    margin: 1,
  },
  button: {
  //  backgroundColor: '#8b95a5',
    paddingTop: dimension.height * .015,
    paddingBottom: dimension.height * .015,
    marginBottom: 8
  },
  modalTopStyle:{
    flexDirection:'row',
    marginTop:24,
    paddingBottom:12,
    elevation:1,
    borderBottomWidth: 2,
    borderColor:'lightgrey'
  },
  inputApply: {
    borderWidth:5,
    borderRadius:10,
    borderColor:"grey",
    textAlignVertical: "top"
  }
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
