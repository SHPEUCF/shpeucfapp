import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  ScrollView,
  StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';

  const menuItems = [
    {
      title: 'Leaderboard',
      icon: 'format-align-left',
      screen: 'Leaderboard'
    },
    {
      title: 'Job Board',
      icon: 'card-travel',
      screen: 'JobBoard'
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
      title: 'Forms',
      icon: 'assignment',
      screen: 'Forms'
    },
    {
      title: 'About',
      icon: 'info',
      screen: 'About'
    }
    ];

class More extends Component {

  render() {
    return (
      <ScrollView>
        <List>
          {
            menuItems.map((menuItem, i) => (
              <ListItem
                key={i}
                title={menuItem.title}
                leftIcon={{name: menuItem.icon}}
                onPress={() => Actions[menuItem.screen]()}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  };
}

export { More };
