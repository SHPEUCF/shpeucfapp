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
state = { isApplyShow: false,
  isListShow: false, isBallotShow: false, isCand: false, applyPos: null, listCandidates: null, application: 'Submit'};







  componentWillMount() {
      this.props.getPositions();

  }


  apply(position){
      const {
      goToCandidateForm,
      firstName,
      lastName,
      id } = this.props;


      goToCandidateForm("ADD", position);
  }

  onButtonPress() {
      const {
          addApplication,
          firstName,
          lastName,
          candidatePlan,
          applyPosition,
          id
      } = this.props;
      //alert("Still need to implement this action")

      /*if (candidateName === '') {
          // this.EventCreationError('Please enter a Candidate Name');
      }*/ if (candidatePlan === '') {
          // this.EventCreationError('Please enter a Plan of action');
      } else{
          if(this.props.title === "ADD")
              this.props.addApplication(firstName, lastName, candidatePlan, applyPosition, id);
          /*else
              this.props.editCandidates(candidateName, candidatePlan, candidatePosition);*/
          //Actions.ElectionCandidates();
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

  onPlanChange(text){
    this.props.candidatePlanChanged(text);
  }
  /*getCandidates(candidates){

    const candidatesArray = _.toArray(candidates)

  return <FlatList
      data={candidatesArray}
      extraData={this.state}
      keyExtractor={this._keyExtractor}
      renderItem={({item, separators}) => (
      this.renderCandidates(item)
    )}
  />;
  }


  selectCandidate(){

  }*/



  /*renderCandidates(item){
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;


      return (
      <TouchableOpacity onPress = {this.selectCandidate.bind(this)}>
        <View style={contentContainerStyle}>
            <View style={containerStyle}>
              <Text>{`${Hello}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )

  }*/



  renderCadidatesComponent(item) {
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;

      return (
        <View style={{marginBottom:8, marginLeft:8, marginRight:8}}>
        <Card >

              <View>
                <TouchableOpacity
                  onPress={()=>{
                    if (!(dict.length == 0) && dict[(dict.length-1)].key == item.position){
                        dict[(dict.length-1)].value = item.id;
                    }
                    else {
                      dict.push({key:item.position , value:item.id});}
                    this.changeModalState(3); this.changeModalState(4);
                    }}>

                <View style={{margin:10, flex:1, alignItems:'center'}}>
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
renderCand(){
const {modalTopStyle, inputApply} = styles;
  if(this.state.isCand == false){
    neturn (null);
  }
  return(
    <Modal
      transparent = { false }
      visible = { this.state.isCand }
      animationType = "none"
      >
      <View style={modalTopStyle}>
        <View style={{flex:1.5, alignItems:'flex-start', marginLeft:8, justifyContent:'center'}}>
          <Text onPress = {()=>{ this.changeModalState(4); this.changeModalState(3);}} style={{fontSize:16}}>Back</Text>
        </View>
          <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:18}}>Ballot</Text>
          </View>
      </View>
      <View style={{flex:1}}>
  <FlatList
    data={this.state.listCandidates}
    extraData={this.state}
    keyExtractor={this._keyExtractor}
    renderItem={({item, separators}) => (
    this.renderCadidatesComponent(item)
  )}
    />
</View>
</Modal>
)
}

  renderCandidatesList(item){
    //this.setState({ listCandidates: _.toArray(item.candidates)});
    return(

        <View>
            <TouchableOpacity onPress={() => {this.changeModalState(3);this.changeModalState(4);this.setState({ listCandidates: _.orderBy(item.candidates, iterateesCan, orderCan)});
            }}>
        <View style={{
        margin:4,
        padding:8,
        backgroundColor:'lightgrey',
      flexDirection:'row'
    }}>
    <View style={{flex:1, alignItems:'flex-start'}}>
          <Text style={{fontSize:16}}>{`${item.title}`}</Text>
          </View>
          <View style={{flex:1, alignItems:'flex-end'}}>
            <Text >></Text>
          </View>
        </View>
</TouchableOpacity>

      </View>


    )
  }


   _keyExtractor = (item, index) => index;

 showBallot(positionsArray){
   const {modalTopStyle, inputApply} = styles;

   if(this.state.isBallotShow == false){
     return (null);
   }
   return(
     <Modal
       transparent = { false }
       visible = { this.state.isBallotShow }
       animationType = "none"
       >
       <View style={modalTopStyle}>
         <View style={{flex:1.5, alignItems:'flex-start', marginLeft:8, justifyContent:'center'}}>
           <Text onPress = {()=>{ this.changeModalState(3); }} style={{fontSize:16}}>Back</Text>
         </View>
           <View style={{flex:2, alignItems:'flex-start', justifyContent:'center'}}>
             <Text style={{fontWeight:'bold', fontSize:18}}>Ballot</Text>
           </View>
       </View>
       <View style={{flex:1}}>
         <FlatList
             data={positionsArray}
             extraData={this.state}
             keyExtractor={this._keyExtractor}
             renderItem={({item, separators}) => (
             this.renderCandidatesList(item)
           )}
         />
       <Button title="Submit" onPress={() => {this.props.vote(this.props.id, dict); this.changeModalState(3);}}/>
     </View>
   </Modal>
   )
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
           this.changeModalState(3);
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
           onPress = {() => {this.changeModalState(1);}}
           />
       </View>
     )
   }
 }

 changeModalState(which){
   if(which==1){
     this.setState((prevState) => { return { isListShow: !prevState.isListShow }});
   }
   if(which==2){
     this.setState((prevState) => { return { isApplyShow: !prevState.isApplyShow }});
   }
   if(which==3){
     this.setState((prevState) => { return { isBallotShow: !prevState.isBallotShow }});
   }
   if(which == 4){
     this.setState((prevState) => { return { isCand: !prevState.isCand}});
   }

 }

 showApplyPosition(){

   const {modalTopStyle, inputApply} = styles;

   if(this.state.isApplyShow == false){
     return (null);
   }
   return(
     <Modal
       transparent = {false}
       visible={this.state.isApplyShow}
       animationType = "none"
       >
       <View style={modalTopStyle}>
         <View style={{flex:1, alignItems:'flex-start', marginLeft:8, justifyContent:'center'}}>
           <Text onPress = {()=>{ this.changeModalState(2);}} style={{fontSize:16}}>Back</Text>
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
         <View >
           <Button
             title={this.state.application}
             onPress={()=>{
             if (this.state.application == "Submit"){
               this.props.addApplication(this.props.firstName,this.props.lastName,this.props.candidatePlan, this.state.applyPos, this.props.id );}
             else {
               this.props.editApplication(this.state.applyPos, this.props.candidatePlan, this.props.id);
             }

             this.changeModalState(2);
             this.changeModalState(1);}}
             />

           <Button
             title="Cancel"
             onPress={()=>{
               this.changeModalState(2);
               this.setState({applyPos:null});}}
               />
       </View>
       </View>
     </Modal>
   )
 }

 showListPosition(positionsArray){
   const {modalTopStyle, inputApply} = styles;
   if(this.state.isListShow == false){
     return (null);
   }
   return(
       <Modal
         transparent = {false}
         visible={this.state.isListShow}
         animationType = "none"
         >

     <View style={modalTopStyle}>
       <View style={{flex:1, alignItems:'flex-start', marginLeft:8, justifyContent:'center'}}>
         <Text onPress = {()=>{this.changeModalState(1)}} style={{fontSize:16}}>Cancel</Text>
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
   </Modal>
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
              onPress={()=>{this.changeModalState(1);this.changeModalState(2); this.setState({applyPos:item.title});}}/>
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
              onPress={()=>{this.changeModalState(1); this.changeModalState(2); this.setState({applyPos:item.title}); this.props.candidatePlanChanged(query.plan);}}/>
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

      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>

        {!this.state.isApplyShow && !this.state.isBallotShow && !this.isCand && this.state.isListShow && this.showListPosition(positionsArray)}
        {!this.state.isListShow && !this.state.isBallotShow && !this.isCand && this.state.isApplyShow && this.showApplyPosition()}
        {!this.state.isListShow && !this.state.isApplyShow && !this.isCand && this.state.isBallotShow && this.showBallot(positionsArray)}
        {!this.state.isListShow && !this.state.isApplyShow && !this.state.isBallotShow && this.state.isCand && this.renderCand()}

        {!this.state.isListShow && !this.state.isApplyShow && !this.state.isBallotShow && !this.isCand && this.optionButtons()}
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
