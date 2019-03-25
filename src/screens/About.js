import React, { Component } from 'react';
import {Text, View, StyleSheet }from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import { NavBar } from '../components/general';

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
      <View style={{flex: 1, backgroundColor:'#2C3239'}}>
        <NavBar title="About" back onBack={() => Actions.pop()} />
        <List>
        <View style={{backgroundColor:'#2C3239'}}>
          {
            menuItems.map((menuItem, i) => (
              <ListItem
                key={i}
                title={menuItem.title}
                titleStyle={{ color: 'white'}}
                leftIcon={{name: menuItem.icon}}
                onPress={() => Actions[menuItem.screen]({ title: menuItem.title,
                                                          uri: menuItem.uri,
                                                          content: menuItem.content,
                                                          footer: menuItem.footer })}
              />
            ))
          }
          </View>
        </List>
      </View>
    );
  };
}

export { About };
