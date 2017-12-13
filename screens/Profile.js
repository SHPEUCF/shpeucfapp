import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

import Header from '../src/components/Header';

export default class ProfileScreen extends Component {
  render() {
    return (
      <Header headerTitle={'Profile'} />
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
