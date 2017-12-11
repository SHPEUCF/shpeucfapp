import React from 'react';
import { View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Profile Screen </Text>
  </View>
);

const ResourcesScreen = () => (
  <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Resources Screen </Text>
  </View>
);

const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Profile:{
    screen: ProfileScreen,
  },
  Resources:{
    screen: ResourcesScreen,
  },
});

export default RootTabs;
