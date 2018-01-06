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

class WebPage2 extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Header
          headerTitle={'Facebook'}
          backButton={
          <TouchableOpacity onPress={() => goBack()} >
            <Text style={styles.backTextStyle}>{"< Back"}</Text>
          </TouchableOpacity>}
          />
         <WebView
            source = {{ uri:
               'https://www.facebook.com' }}
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

export { WebPage2 };
