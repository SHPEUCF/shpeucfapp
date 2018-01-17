import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';
import { Actions } from 'react-native-router-flux';

class JobBoard extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Coming Soon</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export { JobBoard };
