import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

export default class ResourcesScreen extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text>Resources Screen </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF7A6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
