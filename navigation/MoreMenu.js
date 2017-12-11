import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class MoreMenu extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text>Job Board</Text>
        <Text>Leaderboard</Text>
        <Text>Check In</Text>
        <Text>Resources</Text>
        <Text>About</Text>
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
