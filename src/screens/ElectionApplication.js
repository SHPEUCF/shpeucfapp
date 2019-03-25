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

const dimension = Dimensions.get('window');
const iterateesPos = ['level'];
const orderPos = ['asc'];

const iterateesCan = ['lastName','firstName'];
const orderCan = ['asc','asc'];

var dict = [];

class ElectionApplication extends Component {
  constructor(props) {
    super(props);
  }

state = { isApplyShow: false, index: null,
  isListShow: true, applyPos: null, application: 'Submit'};

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

  onPlanChange(text){
    this.props.candidatePlanChanged(text);
  }

  showApplyPosition(){

    const {containerStyle, inputApply, tab} = styles;

    if(this.state.isApplyShow == false){
      return (null);
    }

    return(
      <View>
        <View style={tab}>
          <View style={{flex:1, alignItems:'flex-start', marginLeft:8, justifyContent:'center'}}>
            <Text onPress = {()=>{ this.setState({isApplyShow: false}); this.setState({isListShow: true}); }} style={{fontSize:16}}>Back</Text>
          </View>
          <View style={{flex:3, alignItems:'flex-start', justifyContent:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:18}}>Candidate Application</Text>
          </View>
        </View>
        <View style={{flex:1, margin: 8}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:20}}> {`${this.state.applyPos}`}</Text>
          </View>
        <View style={{marginTop:10, marginBottom:8}}>
          <Text style={{fontSize:18}}>Name:</Text>
          <View style={{marginTop:8, marginLeft:16}}><Text>{`${this.props.firstName} ${this.props.lastName}`}</Text></View>
        </View>

       <Text style={{fontSize:18}}>Plan:</Text>
       {this.renderError()}
       <View style={{flex:1, margin:16 }}>
        <RkAvoidKeyboard>
        <TextInput style={{borderWidth:5,
        borderRadius:10,
        borderColor:"lightgrey",
        textAlignVertical: "top", height: dimension.height * 0.50} }
          multiline = {true}
          placeholder="Please write your plan for members to read."
          value={this.props.candidatePlan}
          onChangeText={this.onPlanChange.bind(this)}
          />
          </RkAvoidKeyboard>
          </View>
          <View>
            <Button
              title={this.state.application}
              onPress={()=>{
              if (this.state.application == "Submit"){
                this.props.addApplication(this.props.firstName,this.props.lastName,this.props.candidatePlan, this.state.applyPos, this.props.id );}
              else {
                this.props.editApplication(this.state.applyPos, this.props.candidatePlan, this.props.id);
              }
              this.setState({isApplyShow: false}); this.setState({isListShow: true}); }}
              />
            <Button
              title="Cancel"
              onPress={()=>{
                this.setState({isApplyShow: false}); this.setState({isListShow: true});
                this.setState({applyPos:null});}}
                />
          </View>
        </View>
      </View>
      )
    }

   _keyExtractor = (item, index) => index;

  showListPosition(positionsArray){
    const {containerStyle, inputApply, tab} = styles;
    if(this.state.isListShow == false){
      return (null);}

    return(
        <View>
          <View style={tab}>
            <View style={{flex:1, alignItems:'flex-start', marginLeft:8, justifyContent:'center'}}>
              <Text onPress = {()=>{Actions.popTo("Election")}} style={{fontSize:16}}>Cancel</Text>
            </View>
            <View style={{flex:1.5, alignItems:'flex-start', justifyContent:'center'}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>Positions</Text>
            </View>
          </View>
          <FlatList
            data={positionsArray}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({item, separators}) => {
                if (this.props.applied){
                  return (this.renderListPositionApplied(item));
                }
                else {
                  return (this.renderListPositionComponent(item));}
            }}
          />
        </View>
    )
  }

  renderListPositionComponent(item){
    const {button} = styles;
    this.state.application = 'Submit';

    return(
      <View style={{flex:1, margin: 8, borderBottomWidth:1, borderColor:'grey'}}>
          <View style={{marginBottom:10}}>
             <Text style={{fontSize:18, fontWeight:'500'}}>Position:  {`${item.title}`}</Text>
           </View>
           <View style={{marginLeft: 12, marginRight: 10, marginBottom:8}}>
             <Text style={{fontSize:16, fontWeight:'400', lineHeight: 25}}>Role:  {`${item.description}`}</Text>
           </View>
           <View style={button} >
             <Button
               title={`Apply for ${item.title}`}
               onPress={()=>{this.setState({isListShow: false}); this.setState({isApplyShow: true}); this.setState({applyPos:item.title});}}/>
           </View>
      </View>
    )

  }

  renderListPositionApplied(item){
    const {button} = styles;
    return(
      <View style={{flex:1, margin: 8, borderBottomWidth:1, borderColor:'grey'}}>
          <View style={{marginBottom:10}}>
            <Text style={{fontSize:18, fontWeight:'500'}}>Position:  {`${item.title}`}</Text>
          </View>
          <View style={{marginLeft: 12, marginRight: 10, marginBottom:8}}>
            <Text style={{fontSize:16, fontWeight:'400', lineHeight: 25}}>Role:  {`${item.description}`}</Text>
          </View>
           {this.renderEditButton(item)}
      </View>
    )
  }

  renderEditButton(item){
    const {button} = styles;
    const {
    id
    } = this.props;

    var query = _.get(item, ['candidates',id], null);

    this.state.application = 'Edit';

    if (query != null && query.approved != true ){
      return(
           <View style={button} >
             <Button
               title={`Edit Application`}
               onPress={()=>{this.setState({isListShow: false}); this.setState({isApplyShow: true}); this.setState({applyPos:item.title}); this.props.candidatePlanChanged(query.plan);}}/>
           </View>
      )}

     else if ( query != null && query.approved == true ){
       return(
         <View style={{marginLeft: 12, marginRight: 10, marginBottom:8}}>
           <Text style={{fontSize:16, fontWeight:'400', lineHeight: 25}}>You've been approved! Good Luck!</Text>
         </View>
       )
     }
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
          {this.showListPosition(positionsArray)}
          {this.showApplyPosition()}
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
    justifyContent: 'flex-start'
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

export default connect(mapStateToProps, mapDispatchToProps)(ElectionApplication);
