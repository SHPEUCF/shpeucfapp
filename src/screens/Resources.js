import React, { Component } from 'react';
import { View }from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

const resources = [
  {
    uri: 'http://www.shpeucf.com',
    title: "SHPE UCF",
    description: 'Chapter website',
    group: 'SHPE UCF'
  },
  {
    uri:'https://www.facebook.com/groups/SHPEUCF/',
    title: 'Facebook',
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
                onPress={() => Actions.WebPageShow(
                  { title: resource.title,
                    uri: resource.uri }
                )}
              />
            ))
          }
        </List>
      </View>
    );
  };
}

export { Resources };
