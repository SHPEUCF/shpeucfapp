import React, { Component } from 'react';

import {
   View,
   WebView,
   StyleSheet
}
from 'react-native'

class WebPage2 extends Component {
  render() {
    return (
      <View style = {styles.container}>
         <WebView source = {{ uri:'https://www.facebook.com' }} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   backTextStyle: {
     fontSize: 15,
     color: '#007AFF'
   },
})

export { WebPage2 };
