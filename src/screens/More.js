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
        icon: 'card-travel',
        screen: 'JobBoard'
      },
      {
        title: 'Leaderboard',
        icon: 'format-align-left',
        screen: 'Leaderboard'
      },
      {
        title: 'Resources',
        icon: 'layers',
        screen: 'Resources'
      },
      {
        title: 'Check In',
        icon: 'done',
        screen: 'CheckIn'
      },
      {
        title: 'About',
        icon: 'info',
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
