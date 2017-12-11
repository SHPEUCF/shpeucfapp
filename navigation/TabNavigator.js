import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';

const HomeScreen = () => (
<<<<<<< HEAD
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
=======
  <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  <Text> Home </Text>
>>>>>>> 82b477feccaecb458b28f1f28ddf4ecf64497f4d
  </View>
);

const ProfileScreen = () => (
<<<<<<< HEAD
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
=======
  <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  <Text> Profile Screen </Text>
  </View>
);

const ResourcesScreen = () => (
  <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  <Text> Resources Screen </Text>
>>>>>>> 82b477feccaecb458b28f1f28ddf4ecf64497f4d
  </View>
);

const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
<<<<<<< HEAD
  Profile: {
    screen: ProfileScreen,
  },
=======
  Profile:{
    screen: ProfileScreen,
  },
  Resources:{
    screen: ResourcesScreen,
  },
>>>>>>> 82b477feccaecb458b28f1f28ddf4ecf64497f4d
});

export default RootTabs;
