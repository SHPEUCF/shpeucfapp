import React, { Component } from 'react';
import { Platform, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header } from '../components/general';


// Screens
import {
  JobBoard,
  Leaderboard,
  More,
  Resources,
  CheckIn,
  About,
  WebPage1,
  WebPage2 } from '../screens';

const MoreMenu = StackNavigator({

  More: {
    screen: More,
    navigationOptions: {
      headerBackTitle:'Back',
      header: 'OK',
    },
  },
  JobBoard: {
    screen: JobBoard,
    navigationOptions: {
      headerBackTitle:'Back',
      header:null,
    },
  },
  Leaderboard: {
    screen: Leaderboard,
    navigationOptions: {
      headerBackTitle:'Back',
      header: null,
    },
  },
  Resources: {
    screen: Resources,
    navigationOptions: {
      headerBackTitle:'Back',
      header:null
    },
  },
  CheckIn: {
    screen: CheckIn,
    navigationOptions: {
      headerBackTitle:'Back',
      header: null
    },
  },
  About: {
    screen: About,
    navigationOptions: {
      headerBackTitle:'Back',
      header:null
    },
  },
  WebPage1: {
    screen: WebPage1,
    navigationOptions: {
      headerBackTitle:'Back',
      header: null,
    },
  },
  WebPage2: {
    screen: WebPage2,
    navigationOptions: {
      headerBackTitle:'Back',
      header: null,
    },
  },
});

export default MoreMenu;
