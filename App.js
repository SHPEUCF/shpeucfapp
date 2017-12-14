import React, { Component} from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import RootTab from './navigation/RootTab';
import StyledStatusBar from './src/components/MyStatusBar';

export default class App extends Component {
  render() {
      return (
        <View style={styles.container}>
          <StyledStatusBar
            backgroundColor='rgba(0,0,0,0.6)'
            barStyle='light-content'/>
          <RootTab />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
