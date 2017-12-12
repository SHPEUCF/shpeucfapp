import React, { Component } from 'react';
import {Text, View, StyleSheet, Button }from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class JobBoard extends Component {
  static navigationOptions = {
    title: 'Job Board',
  };
  render() {
    return (
      <View style = {styles.container}>
        <Text>JobBoard</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5DBDB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
