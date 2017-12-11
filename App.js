import React, { Component} from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';

export default class App extends Component {
  render() {
      return (
        <View>
          <Text>
            Hello there
          </Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
