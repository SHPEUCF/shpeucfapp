import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';
import { Slider } from 'react-native-elements'

const dimension = Dimensions.get('window');

class Leaderboard extends Component {

  render() {
    const {
      containerStyle,
      contentContainerStyle } = styles;

    return (
      <View style={containerStyle}>
        <View style={contentContainerStyle}>
          <Text>Member Name</Text>
          <Slider
            value={.5}
            disabled
            Style={{ width: (dimension.width * .9)}}
            thumbTintColor='transparent'
            onValueChange={(value) => alert('slide')} />
        </View>
        <View style={contentContainerStyle}>
          <Text>Member Name</Text>
          <Slider
            value={.5}
            disabled
            Style={{ width: (dimension.width * .9)}}
            thumbTintColor='transparent'
            onValueChange={(value) => alert('slide')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20
  },
  contentContainerStyle: {
    paddingLeft: dimension.width * .05,
    paddingRight: dimension.width * .05,
  }
});

export { Leaderboard };
