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

class More extends Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <List>
          <ListItem
            key={1}
            title={'Job Board'}
            leftIcon={{name: 'card-travel'}}
            onPress={() => navigate('JobBoard')}
          />
          <ListItem
            key={2}
            title={'Leaderboard'}
            leftIcon={{name: 'format-align-left'}}
            onPress={() => navigate('Leaderboard')}
          />
          <ListItem
            key={3}
            title={'Resources'}
            leftIcon={{name: 'layers'}}
            onPress={() => navigate('Resources')}
          />
          <ListItem
            key={4}
            title={'Check In'}
            leftIcon={{name: 'directions-walk'}}
            onPress={() => navigate('CheckIn')}
          />
          <ListItem
            key={5}
            title={'About'}
            leftIcon={{name: 'info'}}
            onPress={() => navigate('About')}
          />
        </List>
      </View>
    );
  };
}


export { More };
