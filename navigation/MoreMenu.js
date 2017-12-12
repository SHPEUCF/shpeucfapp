import React, { Component } from 'react';
import { AppRegistry }from 'react-native';
import { StackNavigator } from 'react-navigation';
import More from '../screens/More';
import JobBoard from '../screens/JobBoard';
import Leaderboard from '../screens/Leaderboard';
import Resources from '../screens/Resources';
import CheckIn from '../screens/CheckIn';
import About from '../screens/About';

const StackNav = StackNavigator({
  More:{
    screen: More
  },
  JobBoard:{
    screen: JobBoard
  },
  Leaderboard:{
    screen: Leaderboard,
    navigationOptions: {
      headerTitle: 'Leader Board',
    },
  },
  Resources:{
    screen: Resources,
    navigationOptions: {
      headerTitle: 'Resources',
    },
  },
  CheckIn:{
    screen: CheckIn,
    navigationOptions: {
      headerTitle: 'Check In',
    },
  },
  About:{
    screen: About,
    navigationOptions: {
      headerTitle: 'About',
    },
  },
});

export default StackNav;
