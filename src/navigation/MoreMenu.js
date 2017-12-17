import React, { Component } from 'react';
import { Platform, TouchableOpacity, View, Text, StyleSheet }from 'react-native';
import { StackNavigator } from 'react-navigation';


import More from '../screens/More';
import JobBoard from '../screens/JobBoard';
import Leaderboard from '../screens/Leaderboard';
import Resources from '../screens/Resources';
import CheckIn from '../screens/CheckIn';
import About from '../screens/About';
import { Header } from '../components/general';

const StackNav = StackNavigator({

  More:{
    screen: More,
    navigationOptions: {
      headerBackTitle:'Back',
      header: null,
    },
  },
  JobBoard:{
    screen: JobBoard,
    navigationOptions: {
      header:null,
    },
  },
  Leaderboard:{
    screen: Leaderboard,
    navigationOptions: {
      header: null,
    },
  },
  Resources:{
    screen: Resources,
    navigationOptions: {
      header:null
    },
  },
  CheckIn:{
    screen: CheckIn,
    navigationOptions: {
      header: null
    },
  },
  About:{
    screen: About,
    navigationOptions: {
      header:null
    },
  },
});

export default StackNav;
