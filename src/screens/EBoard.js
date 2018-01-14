import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

class EBoard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>E-Board</Text>
        <Text>Coming Soon</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export { EBoard };
