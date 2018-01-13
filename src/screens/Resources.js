import React, { Component } from 'react';
import { Text, View, StyleSheet }from 'react-native';
import { List, ListItem } from 'react-native-elements';

const resources = [
  {
    uri: 'http://www.shpeucf.com',
    title: "SHPE UCF",
    screen: 'WebPage1',
    description: 'Chapter website',
    group: 'SHPE UCF'
  },
  {
    uri:'https://www.facebook.com/groups/SHPEUCF/',
    title: 'Facebook',
    screen: 'WebPage2',
    description: 'SHPE UCF Facebook group',
    group: 'SHPE UCF'
  },
];


class Resources extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <List>
          {
            resources.map((resource, i) => (
              <ListItem
                key={i}
                title={resource.title}
                subtitle={resource.description}
                onPress={() => navigate(resource.screen)}
              />
            ))
          }
        </List>
      </View>
    );
  };
}

const styles = StyleSheet.create({});

export { Resources };
