import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button } from 'react-native';
import { ButtonImage, Header } from '../components/general';

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
      <View style = {styles.container}>
        <ButtonImage onPress={() => navigate('JobBoard')}
          text={'Job Board'} backgroundColor={'rgba(255,215,0,0.15)'}
          image={require('../assets/images/ic_trending_up_black.png')}/>

        <ButtonImage onPress={() => navigate('Leaderboard')}
          text={'Leaderboard'}backgroundColor={'rgba(255,215,0,0.15)'}
          image={require('../assets/images/ic_equalizer.png')}/>

        <ButtonImage onPress={() => navigate('Resources')}
          text={'Resources'}backgroundColor={'rgba(255,215,0,0.15)'}
          image={require('../assets/images/ic_folder.png')}/>

        <ButtonImage onPress={() => navigate('CheckIn')}
          text={'Check In'}backgroundColor={'rgba(255,215,0,0.15)'}
          image={require('../assets/images/ic_trending_up_black.png')}/>

        <ButtonImage onPress={() => navigate('About')}
          text={'About Us'}backgroundColor={'rgba(255,215,0,0.15)'}
          image={require('../assets/images/ic_trending_up_black.png')}/>
      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export { More };
