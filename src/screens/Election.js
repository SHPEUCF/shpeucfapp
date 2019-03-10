 import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {Button, Spinner} from '../components/general';
import { ListItem } from 'react-native-elements';
import { getPositions, goToOtherProfile, pageLoad, getPrivilege, addApplication, goToCandidateForm} from '../actions';
import _ from 'lodash';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput} from 'react-native';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName','picture', 'plan'];
const order = ['desc','asc','asc'];
const vColor = '#00ff7f';



      /* Color idea doesnt work
         the color is annoying maybe a check box  */



class Election extends Component {
state = {president:null, eVP:null, iVP:null, treasurer:null,
  secretaty:null, gradAmb:null, isApplyShow: false,
  isListShow: false, applyPos: null};

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



  renderComponent(item) {
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;

      return (
      <TouchableOpacity onPress = {this.apply.bind(this, item.candidates)}>
        <View style={contentContainerStyle}>
            <View style={containerStyle}>
              <Text>{`${item.title}`}</Text>
              <Text>{`${item.description}`}</Text>
                <View style={styles.button}>
                <Button
                  title = "Apply"
                  onPress={this.apply.bind(this, item.title)}
                />
      				</View>
            </View>
              <View style={{flex:1}}>
                <View style={contentContainerStyle}>
                    <View style={containerStyle}>

                      <Text style={{fontSize:14}}>Plan: {`${item.plan}`}</Text>
                    </View>
                  </View>
              </View>
            </View>
        </TouchableOpacity>
      )

  }


   _keyExtractor = (item, index) => index;

 renderFlatlist(positionsArray){
   return(
     <FlatList
         data={positionsArray}
         extraData={this.state}
         keyExtractor={this._keyExtractor}
         renderItem={({item, separators}) => (
         this.renderComponent(item)
       )}
     />
   )
 }

 loadNextPositions(){
   /*
   Checks if a candidate has been chosen if
   not confirm that no vote for position.
   This function gets the next position
   (e.g. External Vice President) and passed
   to the renderFlatlist function.
    */
 }

 optionButtons(){
   return (
     <View>
       <Text>Write an aspiring message for member to run for office</Text>
       {/* open a modal page whre the person can apply for a position */}
       <Button
         title="Run For Office"
         onPress = {() => {this.changeModalState(1);}}
         />
       <Text>Write a message to tell the importance of voting for the chapter</Text>
      { /* open a modal page whre the person can vote for the candidates */}
       <Button
         title="Vote"

         />
     </View>
   )
 }

 changeModalState(which){
   if(which==1){
     this.setState((prevState) => { return { isListShow: !prevState.isListShow }});
   }
   if(which==2){
     this.setState((prevState) => { return { isApplyShow: !prevState.isApplyShow }});
   }
 }

 showApplyPosition(){
   const {modalTopStyle} = styles;
   return(
     <Modal
       transparent = {false}
       visible={this.state.isApplyShow}
       animationType = "none"
       >
       <View style={modalTopStyle}>
         <View style={{flex:1, alignItems:'flex-start', marginLeft:8, justifyContent:'center'}}>
           <Text onPress = {()=>{this.changeModalState(2); this.changeModalState(1);}} style={{fontSize:16}}>Back</Text>
         </View>
           <View style={{flex:1.5, alignItems:'flex-start', justifyContent:'center'}}>
             <Text style={{fontWeight:'bold', fontSize:18}}>{this.state.applyPos}</Text>
           </View>
       </View>

       <View>
         <TextInput/>
       </View>

     </Modal>
   )
 }

 showListPosition(positionsArray){
   const {modalTopStyle} = styles;
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
         renderItem={({item, separators}) => (
         this.renderListPositionComponent(item)
       )}
       />
   </Modal>

   )
 }

 renderListPositionComponent(item){
   const {button} = styles;
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

  render() {
    const {
      containerStyle,
      contentContainerStyle } = styles;

    const {
      positions,
    } = this.props;

    const positionsArray = _.toArray(positions)

    //alert(positions.title);
    return (
      /*


      <View style={{flex:1, marginBottom:10}}>
        {this.renderFlatlist(positionsArray)}
        <Button/>
      </View>*/

      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        {this.state.isApplyShow && this.showApplyPosition()}

        {this.state.isListShow && this.showListPosition(positionsArray)}

        {!this.state.isListShow && !this.state.isApplyShow && this.optionButtons()}
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
    backgroundColor: '#abc',
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
  }
});

const mapStateToProps = ({ elect, auth }) => {
  const { positions } = elect;
  const { firstName, lastName, id} = auth

  return { positions, firstName, lastName, id};
};

const mapDispatchToProps = {
  getPositions,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  addApplication,
  goToCandidateForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Election);
