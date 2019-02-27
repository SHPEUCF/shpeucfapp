import React, { Component } from 'react';
import {Text, View, StyleSheet, ScrollView } from 'react-native';
import { PostList } from '../components/post';

class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PostList/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  }
});

export { Feed };
