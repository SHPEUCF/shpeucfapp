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


var dict = [];

class ElectionBallot extends Component {
  constructor(props) {
    super(props);
    this.renderCand = this.renderCand.bind(this);
  }

  state = { index: null,
  isBallotShow: true, isCand: false, applyPos: null, listCandidates: null, application: 'Submit'};


  componentWillMount() {
      this.props.getPositions();
  }


  renderCandidatesComponent(item) {
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;
      if (item.approved){
      return (
        <View>
        <Card>
          <View>
            <TouchableOpacity
              onPress={()=>{
                dict[this.state.index] = {key:item.position , value:item.id, first:item.firstName, last:item.lastName};
                this.setState({isCand: false});
                this.setState({isBallotShow: true});
              }}>
              <View style={{alignItems:'center'}}>
                <Text style={{ fontWeight:'bold', fontSize: 20}}>{item.firstName+' '+item.lastName}</Text>
              </View>
              <View style={{flex:1}}>
                <View style={contentContainerStyle}>
                  <View style={containerStyle}>
                      <Text style={{fontSize:16}}>Plan: {item.plan}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
      )
    }
  }

renderCand(){
  const {containerStyle, inputApply, tab} = styles;
  if(this.state.isCand == false){
    return (null);
  }
  return(
    <View>
      <View style={tab}>
        <View style={{flex: 2, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:18}}>{`${this.state.applyPos}`}</Text>
        </View>
    </View>
    <FlatList
      data={this.state.listCandidates}
      extraData={this.state}
      keyExtractor={this._keyExtractor}
      renderItem={({item, separators}) => (
      this.renderCandidatesComponent(item)
      )}
      />
      {this.renderPositionVote()}
      <Button title="Ballot" onPress={() => {this.setState({isCand: false}); this.setState({isBallotShow: true});}}/>
      </View>
    )
  }

  renderPositionVote(){
    const {containerStyle, inputApply, tab} = styles;
    var vote = dict[this.state.index];
    if (!(vote == undefined)) {
      return(
        <View style={tab}>
        <View style={{flex: 2, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:18}}>{"You are voting for: "+ vote.first+" " + vote.last}</Text>
        </View>
        </View>
      )
    }
  }

  renderCandidatesList(item, index){
    return(
      <View>
          <TouchableOpacity onPress={() => {this.setState({isBallotShow: false}); this.setState({isCand: true}); this.setState({ listCandidates: _.orderBy(item.candidates, iterateesCan, orderCan)});
          this.renderCand(); this.setState({applyPos:item.title}); this.setState({index: index})}}>
      <View style={{
      margin:4,
      padding:8,
      backgroundColor:'lightgrey',
      flexDirection:'row'
      }}>
      <View style={{flex:2, alignItems:'center', flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={{fontSize:16}}>{`${item.title}`}</Text>
          {this.renderAllVotes(index)}
      </View>
      <View style={{flex:1, alignItems:'flex-end'}}>
        <Text >></Text>
      </View>
      </View>
    </TouchableOpacity>
    </View>
    )
  }

  renderAllVotes(index){
    const {containerStyle, inputApply, tab} = styles;
    var vote = dict[index];
    if (!(vote == undefined)) {
      return(
          <Text style={{fontWeight:'bold', fontSize:18}}>{" -> "+ vote.first+" " + vote.last}</Text>
      )
    }
  }

   _keyExtractor = (item, index) => index;

 showBallot(positionsArray){
   const {containerStyle, inputApply, tab} = styles;

   if(this.state.isBallotShow == false){
     return (null);
   }

   return(
       <View>
       <View style={tab}>
         <View style={{flex:1.5, alignItems:'flex-start', marginLeft:8, justifyContent:'center'}}>
           <Text onPress = {()=>{Actions.popTo("Election");}} style={{fontSize:16}}>Back</Text>
         </View>
           <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}}>
             <Text style={{fontWeight:'bold', fontSize:18}}>Ballot</Text>
           </View>
       </View>
         <FlatList
             data={positionsArray}
             extraData={this.state}
             keyExtractor={this._keyExtractor}
             renderItem={({item, separators, index}) => (
             this.renderCandidatesList(item, index)
           )}
         />
       <Button title="Submit" onPress={() => {this.props.vote(this.props.id, dict); Actions.popTo("Election");}}/>
     </View>
   )
 }

  render() {
    const {
      containerStyle,
      contentContainerStyle } = styles;

    const {
      positions,
    } = this.props;

    const positionsArray =  _.orderBy(positions, iterateesPos, orderPos)

    //alert(positions.title);
    return (

      <View style={{alignItems:'center', justifyContent:'center', flex: 1}}>
          {this.showBallot(positionsArray)}
          {this.renderCand()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    marginTop:24,
    paddingBottom:12,
    borderBottomWidth: 2,
    borderColor:'lightgrey',
    width: dimension.width *1,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    paddingTop: dimension.height * .015,
    paddingBottom: dimension.height * .015,
    marginBottom: 8
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

export default connect(mapStateToProps, mapDispatchToProps)(ElectionBallot);
