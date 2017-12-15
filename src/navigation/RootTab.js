'use strict';

import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home';
import EventsScreen from '../screens/Events';
import ProfileScreen from '../screens/Profile';
import MoreMenu from '../navigation/MoreMenu';
import JobBoard from '../screens/JobBoard';
import Leaderboard from '../screens/Leaderboard';
import ResourcesScreen from '../screens/Resources';
import CheckIn from '../screens/CheckIn';
import About from '../screens/About';


const RootTab = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
          />
      ),
    },
  },
  Events: {
    screen: EventsScreen,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
          size ={26}
          style={{ color: tintColor }}
          />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
          />
      ),
    },
  },
  MoreMenu: {
    screen: MoreMenu,
    navigationOptions: {
      tabBarLabel: 'More',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-list' : 'ios-list-outline'}
          size ={26}
          style={{ color: tintColor }}
          />
      ),
    },
  },
},
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom'
  }
);

export default RootTab;
