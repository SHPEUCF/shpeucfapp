import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';

class Leaderboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginTop: Dimensions.get('window').height/3}}>Leaderboard</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backTextStyle: {
    fontSize: 15,
    color: '#007AFF'
  },
});

export { Leaderboard };
