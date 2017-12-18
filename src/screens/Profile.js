import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

import { Header } from '../components/general';

export default class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Header headerTitle={'Profile'} />

        <View style={styles.containerStyle}>

          <View style={styles.personaInfoHeader}>
            <Text style={styles.sectionHeaderText}>
              Personal Information
            </Text>
          </View>

          <View style={styles.itemsContainerStyle}>
            <View style={styles.itemLabelStyle}>
              <Text style={styles.itemLabelText}>First Name:</Text>
            </View>
            <View style={styles.itemValueStyle}>
              <Text style={styles.itemValueTex}>John</Text>
            </View>

            <View style={styles.itemLabelStyle}>
              <Text style={styles.itemLabelText}>Last Name:</Text>
            </View>
            <View style={styles.itemValueStyle}>
              <Text style={styles.itemValueTex}>Doe</Text>
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
    flex: 1,
    flexDirection: 'row',
    height: 40,
    margin: 20,
  },
  itemLabelStyle: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemValueStyle: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  itemLabelText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemValueTex: {
    fontSize: 14,
  },
  personaInfoHeader: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
