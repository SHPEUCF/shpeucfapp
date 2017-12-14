import React, { Component } from 'react';
import { Platform }from 'react-native';
import { StackNavigator } from 'react-navigation';
import More from '../screens/More';
import JobBoard from '../screens/JobBoard';
import Leaderboard from '../screens/Leaderboard';
import Resources from '../screens/Resources';
import CheckIn from '../screens/CheckIn';
import About from '../screens/About';

const StackNav = StackNavigator({

  More:{
    screen: More,
    navigationOptions: {
      headerBackTitle:'Back',
      headerTitle: 'More Menu',
      headerStyle:{
        shadowColor: '#000',
        shadowOffset:{ width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
      },
    },
  },
  JobBoard:{
    screen: JobBoard,
    navigationOptions: {
      headerTitle: 'Job Board',
      headerStyle:{
        shadowColor: '#000',
        shadowOffset:{ width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
      },
    },
  },
  Leaderboard:{
    screen: Leaderboard,
    navigationOptions: {
      headerTitle: 'Leaderboard',
      headerStyle:{ shadowColor: '#000',
      shadowOffset:{ width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      },
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
      headerStyle:{ shadowColor: '#000',
      shadowOffset:{ width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      },
    },
  },
  About:{
    screen: About,
    navigationOptions: {
      headerTitle: 'About Us',
      headerStyle:{ shadowColor: '#000',
      shadowOffset:{ width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      },
    },
  },
});

export default StackNav;
