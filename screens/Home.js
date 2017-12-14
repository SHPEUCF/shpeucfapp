import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView } from 'react-native';

import Header from '../src/components/Header';
import PostList from '../src/components/PostList';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerTitle={'Home'} />
        <PostList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
  }
});
