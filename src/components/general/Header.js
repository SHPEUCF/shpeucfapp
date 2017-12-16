import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <View style={styles.headerTitleContainer}>
        <Text style={textStyle}>{props.headerTitle}</Text>
      </View>
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity onPress={() => firebase.auth().signOut()}>
          <Text style={styles.logoutTextStyle}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    height: 64,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row'

  },
  headerTitleContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '600',
    position: 'absolute',
    left: 150,
  },
  logoutButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  logoutTextStyle: {
    fontSize: 14,
    color: '#007AFF'
  }
};

export { Header };
