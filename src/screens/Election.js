import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getPositions, goToOtherProfile, pageLoad, getPrivilege} from '../actions';
import _ from 'lodash';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

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

  }

  

  renderComponent(item) {
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;

      return (
      <TouchableOpacity onPress = {this.getCandidates.bind(this, item.title)}>
        <View style={contentContainerStyle}>
            <View style={containerStyle}>
              <Text>{`${item.title}`}</Text>
              <Text>{`${item.description}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )

  }


   _keyExtractor = (item, index) => index;


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
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  contentContainerStyle: {
    margin: 1,
    backgroundColor: '#abc',
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
