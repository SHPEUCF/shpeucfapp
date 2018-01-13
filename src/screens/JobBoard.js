import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';
import { SegmentBtn } from '../components/general';

class JobBoard extends Component {

  render() {
    return (
      <View style={styles.container}>
          <SegmentBtn
            leftText={"Month"}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});

export { JobBoard };
