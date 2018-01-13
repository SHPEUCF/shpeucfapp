import React, { Component } from 'react';
import {
   View,
   WebView,
   StyleSheet,
}
from 'react-native'

class WebPage1 extends Component {
  render() {
    return (
      <View style = {styles.container}>
         <WebView source = {{ uri:'http://www.shpeucf.com' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
})

export { WebPage1 };
