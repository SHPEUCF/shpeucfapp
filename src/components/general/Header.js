import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import firebase from "firebase";

const Header = props => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <View style={styles.headerLeftChild}>{props.backButton}</View>
      <View style={styles.headerTitleContainer}>
        <Text style={textStyle}>{props.headerTitle}</Text>
      </View>
      <View style={styles.headerRightChild}>
        <TouchableOpacity onPress={() => firebase.auth().signOut()}>
          <Text style={styles.logoutTextStyle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    height: 64,
    paddingTop: 15,
    shadowColor: '#000',
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row'
  },
  headerTitleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '600',
    position: 'absolute',
    textAlign:'center'
  },
  headerRightChild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10
  },
  logoutTextStyle: {
    fontSize: 15,
    color: '#007AFF'
  },
  headerLeftChild:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10
  }
};

export { Header };
