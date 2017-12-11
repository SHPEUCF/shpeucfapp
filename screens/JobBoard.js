import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

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
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
