import React, { Component} from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import TabNavigator from './navigation/TabNavigator';

export default class App extends Component {
  render() {
      return (
        <View>
          <Text>
            Hello there
          </Text>
<<<<<<< HEAD
          <TabNavigator />
=======
          <TabNavigator/>
>>>>>>> 82b477feccaecb458b28f1f28ddf4ecf64497f4d
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
