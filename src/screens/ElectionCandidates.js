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
import { Button } from '../components/general'
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
} from '../actions'

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

  /*viewPosition(item) {
    this.props.candidateFNameChanged(item.firstName);
    this.props.candidateLNameChanged(item.lastName);
    this.props.candidatePlanChanged(iten.plan);
    this.props.goToCandidateForm("EDIT");
  }*/

  renderPositions(item) {
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;

    const candidatesArray = _.toArray(item.candidates)

    return (
      <View>
      <View style={contentContainerStyle}>
          <View style={containerStyle}>
            <Text>{`${item.title}`}</Text>
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
      containerStyle,
      contentContainerStyle,
      containerTextStyle,
      candidateContainer,
      containerCandidateTextStyle
    } = styles;

    const color = (item.approved) ? {backgroundColor: '#ffd700'} : {backgroundColor: '#ebebf1'}

    return (
      <View style={[styles.candidateContainer, color]}>
          <View style={containerTextStyle}>
            <Text>{item.firstName + ' ' + item.lastName}</Text>
          </View>
          {this.renderbuttons(item)}
        </View>
    )
  }

  renderbuttons(item){

    const {
      containerStyle,
      contentContainerStyle,
      containerTextStyle,
      candidateContainer,
      containerCandidateTextStyle
    } = styles;

    if(!item.approved){
      return (
        <View style = {[{flexDirection: 'row', flex: 1}]}>
            <View style= {styles.buttonContainerStyle}>
              <TouchableOpacity
              onPress={this.props.approveApplication.bind(this, item.position, item.id)}>
                <Ionicons name="md-checkmark-circle" size={40} color='#000000'/>
              </TouchableOpacity>
            </View>
            <View style= {styles.buttonContainerStyle}>
              <TouchableOpacity
              onPress={this.props.deleteApplication.bind(this, item.position, item.id)}>
                <Ionicons name="md-close-circle" size={40} color='#000000'/>
              </TouchableOpacity>
            </View>
          </View>
      )
    }

    else{
      return (
        <View style = {[{flexDirection: 'row', flex: 1}]}>
          <View style= {styles.buttonContainerStyle}>
          <TouchableOpacity onPress={() => this.viewCandidate(item)}>
            <Ionicons name="md-create" size={40} color='#000000'/>
          </TouchableOpacity>
          </View>
          <View style= {styles.buttonContainerStyle}>
            <TouchableOpacity
            onPress={this.props.deleteApplication.bind(this, item.position, item.id)}>
              <Ionicons name="md-remove-circle" size={40} color='#000000'/>
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

  render() {
    const {
        tabBar,
        tabBarText,
        content,
        buttonContainerStyling,
        page,
        containerStyle,
        contentContainerStyle,
    } = styles;

    const {
      positions,
    } = this.props;

    const positionsArray = _.orderBy(positions, iteratees, order)

    //alert(positions.title);
    return (
     <View style={page}>
        <View style={tabBar}>
            <Text style={tabBarText}>Candidates</Text>
        </View>

        {this.renderFlatlist(positionsArray)}

        <View style={buttonContainerStyling}>
            <Button
            onPress={() => Actions.ElectionBackEnd("")}
            title={"BACK"}
            >
            </Button>
        </View>
      </View>
    );
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
    backgroundColor: '#fff',

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
    flex: 1,
    margin: 10
  },
  buttonContainerStyle: {
    flex: .5,
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: '#ebebf1',
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
