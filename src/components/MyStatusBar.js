import React,{ Component } from 'react';
import { StatusBar, Platform, View, StyleSheet } from 'react-native';

const StyledStatusBar = ({ backgroundColor, barStyle}) => (


  <View style={[styles.mystatusBar, { backgroundColor }]}>
    <StatusBar translucent={false}
               animated={false}
               hidden={false}
               barStyle={barStyle}
               backgroundColor={backgroundColor} />
  </View>



);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 22 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  mycontainer: {
    flex: 1,
    position: 'absolute'
  },
  mystatusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default StyledStatusBar;
