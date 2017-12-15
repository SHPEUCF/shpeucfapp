import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';

import { Header } from '../components/general';

export default class EventsScreen extends Component {
  render() {
    return (
      <Header headerTitle={'Events'} />
    )
  }
}
