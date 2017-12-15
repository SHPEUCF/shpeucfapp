import React, { Component } from 'react';
import {Text, View, StyleSheet, Button }from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class JobBoard extends Component {

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
});
