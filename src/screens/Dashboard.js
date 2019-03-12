import {connect } from 'react-redux';
import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from '../components/general'

const dimension = Dimensions.get('window');


class Dashboard extends Component {
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

export { Dashboard };
