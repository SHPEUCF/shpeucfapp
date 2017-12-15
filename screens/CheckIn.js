import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

export default class CheckIn extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text>Check In</Text>
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
