import React from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoreMenu from '../navigation/MoreMenu';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import ResourcesScreen from '../screens/Resources';
import CheckIn from '../screens/CheckIn';
import JobBoard from '../screens/JobBoard';
import Leaderboard from '../screens/Leaderboard';
import About from '../screens/About';


const RootTab = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
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
  Resources: {
    screen: ResourcesScreen,
    navigationOptions: {
      tabBarLabel: 'Resources',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-archive' : 'ios-archive-outline'}
          size ={26}
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
