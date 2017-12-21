import React,{ Component } from 'react';
import { Dimensions, StatusBar, Platform, View, StyleSheet } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT= 812;

const StyledStatusBar = ({ backgroundColor, barStyle}) => (


  <View style={[styles.mystatusBar, { backgroundColor }]}>
    <StatusBar translucent={false}
               animated={false}
               hidden={false}
               barStyle={barStyle}
               backgroundColor={backgroundColor} />
  </View>



);
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const iphone = D_HEIGHT != X_HEIGHT || D_WIDTH != X_WIDTH? 22: 38;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? iphone : null;

const styles = StyleSheet.create({
  mycontainer: {
    flex: 1,
    position: 'absolute'
  },
  mystatusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export { StyledStatusBar };
