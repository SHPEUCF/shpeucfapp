import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';

class CheckIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Check In</Text>
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

export { CheckIn };
