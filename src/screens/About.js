import React, { Component } from 'react';
import {Text, View, StyleSheet, SafeAreaView, FlatList, Dimensions }from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import { NavBar } from '../components/general';
import Ionicons from 'react-native-vector-icons/Ionicons';
const dimension = Dimensions.get('window');

  const menuItems = [
    // {
    //   title: 'E-Board',
    //   icon: 'people',
    //   screen: 'EBoard'
    // },
    {
      title: 'Privacy Policy',
      icon: 'insert-drive-file',
      screen: 'WebPageShow',
      uri:"http://www.shpeucf.com/privacy-policy/"
    },
    {
      title: 'Version',
      icon: 'beenhere',
      screen: 'Version',
      content: "Current version: v1.0-alpha",
      footer: 'Check our GitHub Page - SHPEUCF'
    }
    ];

class About extends Component {

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#0c0b0b', flex: 1}}>
        <NavBar title="About" back onBack={() => Actions.pop()} ></NavBar>
        <View style = {{backgroundColor: "black"}}>
        <FlatList
          removeClippedSubviews={false}
          extraData={this.props}
          keyExtractor = {this.keyExtractor}
          data = {menuItems}
          renderItem={this.renderItem}
        />
        </View>
      </SafeAreaView>
    );
  }

  keyExtractor = (item, index) => index

  renderItem  = ({item}) => {
      return(
        <View style = {{backgroundColor: "black"}}>
          <ListItem
              containerStyle={{ backgroundColor: 'black', borderBottomColor: 'black'}}
              removeClippedSubviews={false}
              title={item.title}
              titleStyle={{ color: 'white'}}
              leftIcon={{name: item.icon , color: 'white'}}
              rightIcon={<Ionicons name="ios-arrow-dropright" size={dimension.height * .025} style={{color: '#FECB00'}}/>}
              onPress={() => Actions[item.screen]({ title: item.title,
              uri: item.uri,
              content: item.content,
              footer: item.footer })}
              />
        </View>
      )
  }
}

export { About };
