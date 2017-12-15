import React, { Component } from 'react';
import {Text, View, StyleSheet, Linking }from 'react-native';

import Button from '../src/components/Button';

export default class ResourcesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemBox}>
          <View style={styles.itemDescription}>
            <Text style={styles.itemDescriptionText}>
              SHPE UCF Website
            </Text>
          </View>
          <View style={styles.itemButton}>
            <Button onPress={() => Linking.openURL('http://shpeucf.com')}>
              Open
            </Button>
          </View>
        </View>
        <View style={styles.itemBox}>
          <View style={styles.itemDescription}>
            <Text style={styles.itemDescriptionText}>
              Facebook Group
            </Text>
          </View>
          <View style={styles.itemButton}>
            <Button onPress={() => Linking.openURL('https://www.facebook.com/groups/SHPEUCF/')}>
              Open
            </Button>
          </View>
        </View>
      </View>
    );
  };
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  itemBox: {
    height: 80,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    padding: 5,
    backgroundColor: '#F1F1F1',
  },
  itemDescription: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  itemDescriptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 5,
  },
};
