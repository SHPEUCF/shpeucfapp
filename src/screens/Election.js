import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getPositions, goToOtherProfile, pageLoad, getPrivilege} from '../actions';
import { Avatar, Divider } from 'react-native-elements';
import { Card, CardSection, Button } from '../components/general';
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

  getCandidates(title){


  /*return {<FlatList
      data={positionsArray}
      extraData={this.state}
      keyExtractor={this._keyExtractor}
      renderItem={({item, separators}) => (
      this.renderComponent(item)
    )}
  />};*/

  }


  selectCandidate(){

  }



  renderCandidates(){
    /*const {
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
      )*/

  }



  renderComponent(item) {
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;

      return (
      <TouchableOpacity onPress = {this.getCandidates.bind(this, item.title)
        }>
        <Card>
          <CardSection>
            <View>
              <View style={{margin:10, flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                <Avatar
                  large
                  rounded
                  source={{uri: `${item.picture}`}}
                  activeOpacity={0.7}
                  />
                <View>
                  <Text style={{marginLeft:5, fontWeight:'bold', fontSize: 16}}>Candidate: {`${item.firstName}${item.lastName}`}</Text>
                  <Text style={{margin:8, fontSize:14}}>Position: {`${item.title}`}</Text>
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
          </CardSection>
        </Card>




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

  }
});

const mapStateToProps = ({ elect }) => {
  const { positions } = elect;

  return { positions };
};

const mapDispatchToProps = {
  getPositions,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
};

export default connect(mapStateToProps, mapDispatchToProps)(Election);
