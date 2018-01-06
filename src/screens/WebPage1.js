import React, { Component } from 'react';
import { Header } from '../components/general';

import {
   View,
   WebView,
   StyleSheet,
   TouchableOpacity,
   Text
}
from 'react-native'

class WebPage1 extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Header
          headerTitle={'SHPE'}
          backButton={
          <TouchableOpacity onPress={() => goBack()} >
            <Text style={styles.backTextStyle}>{"< Back"}</Text>
          </TouchableOpacity>}
          />
         <WebView
            source = {{ uri:
               'http://www.shpeucf.com' }}
         />
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

export { WebPage1 };
