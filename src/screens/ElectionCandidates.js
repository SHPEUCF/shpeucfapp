import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';
import { Button, NavBar } from '../components/general'
import {
    openElection,
    closeElection,
    deleteCandidates,
    goToCandidateForm,
    getPositions,
    approveApplication,
    deleteApplication,
    candidatePlanChanged,
    candidateIdChanged
} from '../ducks'

const dimension = Dimensions.get('window');
const iteratees = ['level'];
const order = ['asc'];

class ElectionCandidates extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
      this.props.getPositions();
  }

  render() {
    const {
        tabBar,
        tabBarText,
        content,
        page,
    } = styles;

    const {
      positions,
    } = this.props;

    const positionsArray = _.orderBy(positions, iteratees, order)

    //alert(positions.title);
    return (
     <View style={page}>
        <NavBar title="Candidates" back onBack={() => Actions.pop()} />
        <View style={content}>
          {this.renderFlatlist(positionsArray)}
        </View>
    </View>
    );
  }

  renderPositions(item) {
    const {
      containerStyle,
      contentContainerStyle,
      textColor
    } = styles;

    const candidatesArray = _.toArray(item.candidates)

    return (
      <View>
      <View style={contentContainerStyle}>
          <View style={containerStyle}>
            <Text style={textColor}>{item.title}</Text>
          </View>
      </View>
      <FlatList
          data={candidatesArray}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          this.renderCandidates(item)
        )}
      />
      </View>
    )
  }

  renderCandidates(item){

    const {
      textColor,
      containerTextStyle,
    } = styles;

    const color = (item.approved) ? {backgroundColor: '#ffd70088'} : {backgroundColor: '#2C323988'}

    return (
      <View style={[styles.candidateContainer, color]}>
          <View style={containerTextStyle}>
            <Text style={textColor}>{item.firstName + ' ' + item.lastName}</Text>
          </View>
          {this.renderbuttons(item)}
        </View>
    )
  }

  renderbuttons(item){

    const {
      position,
      id,
      firstName,
      lastName
    } = item

    const{
      deleteApplication,
      approveApplication
    } = this.props

    const {
      buttonContainerStyle
    } = styles;

    if(!item.approved){
      return (
        <View style = {[{flexDirection: 'row', flex: 1}]}>
            <View style= {buttonContainerStyle}>
              <TouchableOpacity
              onPress={() => approveApplication( position, id, firstName, lastName)}>
                <Ionicons name="md-checkmark-circle" size={40} color='#e0e6ed'/>
              </TouchableOpacity>
            </View>
            <View style= {buttonContainerStyle}>
              <TouchableOpacity
              onPress={() => deleteApplication( position, id)}>
                <Ionicons name="md-close-circle" size={40} color='#e0e6ed'/>
              </TouchableOpacity>
            </View>
          </View>
      )
    }

    else{
      return (
        <View style = {[{flexDirection: 'row', flex: 1}]}>
          <View style= {buttonContainerStyle}>
          <TouchableOpacity onPress={() => this.viewCandidate(item)}>
            <Ionicons name="md-create" size={40} color='#e0e6ed'/>
          </TouchableOpacity>
          </View>
          <View style= {buttonContainerStyle}>
            <TouchableOpacity
            onPress={() => deleteApplication( position, id)}>
              <Ionicons name="md-remove-circle" size={40} color='#e0e6ed'/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  viewCandidate(item){
    this.props.candidateIdChanged(item.id);
    this.props.candidatePlanChanged(item.plan);
    this.props.goToCandidateForm("EDIT", item.position);
  }


  _keyExtractor = (item, index) => index;

  renderFlatlist(positions){
    return(
      <FlatList
          data={positions}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          this.renderPositions(item)
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  tabBar : {
    height: dimension.height * .1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0005",
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#2C3239',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  containerTextStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textColor: {
    color: '#e0e6ed'
  },
  contentContainerStyle: {
    margin: 1,
    backgroundColor: '#abc',
    height: dimension.height * .09,
  },
  tabBarText : {
    color: '#000',
    fontSize: 20,
    margin: 20,
    alignSelf: "center"
  },
  content: {
    flex: .98,
  },
  buttonContainerStyle: {
    flex: .5,
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: '#0c0b0b',
  },
  candidateContainer: {
    flex: .5,
    marginTop: dimension.height * .002,
    flexDirection: 'row',
    justifyContent: 'center',
    height: dimension.height * .09,
  },
});

const mapStateToProps = ({ elect }) => {
    const { election, positions } = elect

    return { election, positions };
};

const mapDispatchToProps = {
    openElection,
    closeElection,
    deleteCandidates,
    goToCandidateForm,
    getPositions,
    approveApplication,
    deleteApplication,
    candidatePlanChanged,
    candidateIdChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionCandidates);
