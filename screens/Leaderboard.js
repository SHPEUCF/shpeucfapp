import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Leaderboard extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text>Leaderboard</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
