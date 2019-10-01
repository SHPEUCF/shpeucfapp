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

  render() {
    const {
      page,
      tabBar,
      tabBarText,
      contentStyle
     } = styles;

    const {
      positions,
      isApplyShow,
      applyPos,
      isListShow
    } = this.props;

    const positionsArray =  _.orderBy(positions, iterateesPos, orderPos)

    //alert(positions.title);
    return (

      <View style={page}>
        {this.renderNavBar()}
        <View style={contentStyle}>
          {this.showListPosition(positionsArray)}
          {this.showApplyPosition()}
        </View>
        {this.renderButtons()}
      </View>
    )
  }

  showApplyPosition(){

    const {
      applyTitle,
      applyInput,
      textColor,
      textStyle
    } = styles;


    if(this.state.isApplyShow == false){
      return (null);
    }

    return(
      <View style={{flex: 1}}>
        <View style={{flex:1, margin: 8}}>
          <Text style={[applyTitle, textColor]}>{this.state.applyPos}</Text>
        <View style={{marginTop:10, marginBottom:8}}>
          <Text style={[textStyle, textColor]}>Name: {this.props.firstName} {this.props.lastName}</Text>
        </View>
        <Text style={[textStyle, textColor]}>Plan:</Text>
        {this.renderError()}
        <View style={{flex:1}}>
        <Input style={applyInput}
          blurOnSubmit={true}
          multiline = {true}
          placeholder="Please write your plan for members to read."
          value={this.props.candidatePlan}
          onChangeText={this.onPlanChange.bind(this)}
          />
          </View>
        </View>
      </View>
      )
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

   _keyExtractor = (item, index) => index;

  showListPosition(positionsArray){
    const {containerStyle, inputApply, tab} = styles;
    if(this.state.isListShow == false){
      return (null);}

    return(
        <View>
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
    const {
      button,
      textStyle,
      textColor
    } = styles;
    this.state.application = 'Submit';

    return(
      <View style={{flex:1, margin: 8, borderBottomWidth:1, borderColor:'grey'}}>
          <View style={{marginBottom:10}}>
             <Text style={[textStyle, textColor]}>Position: {item.title}</Text>
           </View>
           <View style={{marginLeft: 12, marginRight: 10, marginBottom:8}}>
             <Text style={[textStyle, textColor]}>Role: {item.description}</Text>
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
    const {
      textStyle,
      textColor
    } = styles;
    return(
      <View style={{flex:1, margin: 8, borderBottomWidth:1, borderColor:'grey'}}>
          <View style={{marginBottom:10}}>
            <Text style={[textStyle, textColor]}>Position:  {`${item.title}`}</Text>
          </View>
          <View style={{marginLeft: 12, marginRight: 10, marginBottom:8}}>
            <Text style={[textStyle, textColor]}>Role:  {`${item.description}`}</Text>
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

    if (query !== null && query.approved !== true ){
      return(
           <View style={button} >
              <Button
               title={`Edit Application`}
               onPress={()=>{
                 this.setState({isListShow: false, isApplyShow: true, applyPos: item.title});
                 this.props.candidatePlanChanged(query.plan);
              }}/>
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

  onPlanChange(text){
    this.props.candidatePlanChanged(text);
  }

  renderButtons(){

    const{
      firstName,
      lastName,
      candidatePlan,
      id,
      addApplication,
      buttonContainer,
      picture
    } = this.props

    const {
      application,
      applyPos,
      isListShow
    } = this.state

    if(!isListShow)
    var p1 = (<Button
          title={application}
          onPress={()=>{
          if (application === "Submit"){
            addApplication(firstName, lastName, candidatePlan, applyPos, picture);}
          else {
            editApplication( candidatePlan,applyPos);
          }
          this.setState({isApplyShow: false, isListShow: true});
        }}
        />)
    return (
      <View style={buttonContainer}>
        {p1}
        <Button
          title="Cancel"
          onPress={()=>{
            if(isListShow){
              Actions.pop()
            }
            else{
              this.setState({isApplyShow: false, isListShow: true, applyPos: null});
            }
          }}
        />
      </View>
    )
  }

  renderNavBar(){
    const {
      isListShow
    } = this.state
    return <NavBar title="Positions" back onBack={() =>
        {
          if(isListShow){
              Actions.pop()
            }
            else{
              this.setState({isApplyShow: false, isListShow: true, applyPos: null});
            }
        }}
      />
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
  tabBarText : {
    color: '#000',
    fontSize: 20,
    margin: 20,
    alignSelf: "center"
  },
  applyTitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  contentStyle: {
    flex: 1
  },
  textStyle: {
    fontSize: 18
  },
  textColor: {
    color: '#e0e6ed'
  },
  button: {
    paddingTop: dimension.height * .015,
    paddingBottom: dimension.height * .015,
    marginBottom: 8
  },
  buttonContainer: {
    flex: .4
  },
  page: {
    backgroundColor: '#2C3239',
    flex: 1
  },
  applyInput: {
    flex: .4,
    textAlignVertical: "top",
    height: dimension.height * .3
  }
});

const mapStateToProps = ({ elect, user }) => {
  const { election, positions, candidatePlan, apply } = elect;
  const { firstName, lastName, id, voted, applied, picture} = user;

  return { election, positions, candidatePlan, firstName, lastName, id, voted, apply, applied, picture};
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
