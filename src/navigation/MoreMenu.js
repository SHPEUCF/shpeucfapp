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
  WebPage1:{
    screen: WebPage1,
    navigationOptions: {
      headerBackTitle:'Back',
      header: null,
    },
  },
  WebPage2:{
    screen: WebPage2,
    navigationOptions: {
      headerBackTitle:'Back',
      header: null,
    },
  },
});

export default MoreMenu;
