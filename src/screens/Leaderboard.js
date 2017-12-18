import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';
import { Header } from '../components/general';

class Leaderboard extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header
          headerTitle={'Leaderboard'}
          backButton={
          <TouchableOpacity onPress={() => goBack()} >
            <Text style={styles.backTextStyle}>{"< Back"}</Text>
          </TouchableOpacity>}/>


        <Text style={{marginTop: Dimensions.get('window').height/3}}>Leaderboard</Text>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backTextStyle: {
    fontSize: 15,
    color: '#007AFF'
  },
});

export { Leaderboard };
