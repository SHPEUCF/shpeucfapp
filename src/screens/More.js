import React, { Component } from 'react';
import {
  View,
  StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';

// screens
import {
  JobBoard,
  Leaderboard,
  Resources,
  CheckIn,
  About } from './';

  const menuItems = [
      {
        title: 'Job Board',
        icon: 'home',
        screen: 'JobBoard'
      },
      {
        title: 'Leaderboard',
        icon: 'home',
        screen: 'Leaderboard'
      },
      {
        title: 'Resources',
        icon: 'home',
        screen: 'Resources'
      },
      {
        title: 'Check In',
        icon: 'home',
        screen: 'CheckIn'
      },
      {
        title: 'About',
        icon: 'home',
        screen: 'About'
      }
    ];

class More extends Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <List>
          {
            menuItems.map((menuItem, i) => (
              <ListItem
                key={i}
                title={menuItem.title}
                leftIcon={{name: menuItem.icon}}
                onPress={() => navigate(menuItem.screen)}
              />
            ))
          }
        </List>
      </View>
    );
  };
}


export { More };
