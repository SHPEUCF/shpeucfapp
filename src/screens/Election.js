import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {Button, Spinner} from '../components/general';
import { getPositions, goToOtherProfile, pageLoad, getPrivilege, addApplication, goToCandidateForm} from '../actions';
import _ from 'lodash';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName','picture', 'plan'];
const order = ['desc','asc','asc'];
const vColor = '#00ff7f';

this.state = {president:null, eVP:null, iVP:null, treasurer:null, secretaty:null, gradAmb:null};

      /* Color idea doesnt work
         the color is annoying maybe a check box  */



class Election extends Component {

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
      <View style={{flex:1, marginBottom:10}}>
        {this.renderFlatlist(positionsArray)}
        <Button/>
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
  },
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
