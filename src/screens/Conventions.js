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
} from '../ducks';
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

class Conventions extends Component {



    render() {

      const {
        page,
        mainContentStyle,
        greetingContainerStyle,
        ContainerStyle,
        title,
        touchLeaderboard,
        eventsContainer,
        textColor
      } = styles;


        return (
          <View style={page}>
             <Text style={[{fontWeight:'bold'}, {color: '#e0e6ed'}]}> LIT </Text>
          </View>
        );
      }

}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
	greetingContainerStyle: {
		padding: '5%'
	},
	textColor:{
		color: '#e0e6ed'
	},
	contentContainerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: '5%',
	},
	ContainerStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#21252b',
		borderRadius: 10,
		paddingTop: '2%',
		paddingBottom: '2%',
		paddingLeft: '3%',
		paddingRight: '3%',
		marginTop: '2%',
		marginLeft: '3%',
		marginRight: '3%',
		marginBottom: '2%',
		elevation: 1,
	 },
	mainContentStyle: {
		color: '#000'
	},
	progress: {
		width: dimension.width * .32,
		justifyContent: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		paddingBottom: '5%',
	},
	touchLeaderboard: {
		flex: 1,
		flexDirection:'column',
		alignItems:'center',
		paddingRight: '3%'
	},
	index: {
		color: '#000',
		borderColor: '#e0e6ed',
		borderStyle: 'solid',
		borderWidth: 1.5,
		borderRadius: 11,
		marginRight: '4%',
		justifyContent:'center',
		height: 22,
		width: 22,
		elevation: 1
	},
	indexText: {
		alignSelf: 'center',
		fontWeight: "700",
		fontSize: 11,
		color: "#e0e6ed"
	},
	eventsContainer: {
		flex: 1,
		flexDirection:'column',
		alignItems:'center'
	}
});

const mapStateToProps = ({ elect, user }) => {
  const { election, positions, candidatePlan, apply } = elect;
  const { firstName, lastName, id, voted, applied} = user

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

export default connect(mapStateToProps, mapDispatchToProps)(Conventions); 