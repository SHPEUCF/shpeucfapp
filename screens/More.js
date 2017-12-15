import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

// screens
import JobBoard from '../screens/JobBoard';
import Leaderboard from '../screens/Leaderboard';
import Resources from '../screens/Resources';
import CheckIn from '../screens/CheckIn';
import About from '../screens/About';

export default class More extends Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style = {styles.container}>
       <Button
          onPress={() => navigate('JobBoard')}
          raised
          title="Job Board"/>
       <Button
         onPress={() => navigate('Leaderboard')}
         title="Leaderboard"/>
       <Button
         onPress={() => navigate('Resources')}
         title="Resources"/>
       <Button
          onPress={() => navigate('CheckIn')}
          title="Check In"/>
       <Button
          onPress={() => navigate('About')}
          title="About"/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
