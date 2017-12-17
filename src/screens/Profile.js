import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

import { Header } from '../components/general';

export default class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Header headerTitle={'Profile'} />

        <View style={styles.containerStyle}>

          <View style={styles.itemsContainerStyle}>

            <View style={styles.itemLabelStyle}>
              <Text style={styles.itemLabelText}>First Name:</Text>
            </View>
            <View style={styles.itemValueStyle}>
              <Text style={styles.itemValueTex}>John Doe</Text>
            </View>

          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  itemsContainerStyle: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    marginTop: 20,
    padding: 30,
  },
  itemLabelStyle: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemLabelText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  itemValueStyle: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemValueTex: {
    fontSize: 14,
  },
});
