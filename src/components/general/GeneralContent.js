import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class GeneralContent extends Component {
  render() {
    const { content, footer } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={{color: '#FFFFFF'}}>{footer}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',
  },
  content: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',

  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25292E',

  }
})

export { GeneralContent };
