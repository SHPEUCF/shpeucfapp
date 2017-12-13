import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView } from 'react-native';

import Header from '../src/components/Header';

export default class HomeScreen extends Component {
  render() {
    return (
      <Header headerTitle={'Home'} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2E9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
