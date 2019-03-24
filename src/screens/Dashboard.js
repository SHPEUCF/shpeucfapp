import {connect } from 'react-redux';
import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from '../components/general'

const dimension = Dimensions.get('window');

import {
  updateElection
} from "../actions"


class Dashboard extends Component {

  componentWillMount() {
      this.props.updateElection();
  }

  render() {
    const {
      buttonsContainerStyle,
      container1,
      container2 } = styles

    return (
      <View style={{flex: 1}}>

        <View style={container1}>

        </View>

        <View style={container2}>

      </View>


      </View>

    );
  }
}

const styles = StyleSheet.create({
  buttonsContainerStyle: {
    marginRight: 10,
    marginLeft: 10,
  },
  container1: {
    backgroundColor: 'blue',
    flex: 1
  },
  container2: {
    backgroundColor: 'red',
    flex: 2
  },

});

const mapStateToProps = ({elect}) => {
  const { election } = elect;

  return { election };
};

const mapDispatchToProps = {
  updateElection
 };


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
