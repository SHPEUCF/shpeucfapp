import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

class Forms extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Google Forms live here
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export { Forms };
