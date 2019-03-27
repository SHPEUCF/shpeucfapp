import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet }from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import { NavBar } from '../components/general';

const resources = [
  {
    group: {
      name: "SHPE UCF",
      items: [
        {
          uri: "http://www.shpeucf.com",
          title: "SHPE UCF",
          description: "Chapter website",
        },
        {
          uri: "https://www.facebook.com/groups/SHPEUCF/",
          title: "Facebook",
          description: "SHPE UCF group",
        },
        {
          uri: "https://www.instagram.com/shpeucf/",
          title: "Instagram",
          description: "SHPE UCF Instagram",
        },
        {
          uri: "https://twitter.com/shpeucfchapter",
          title: "Twitter",
          description: "SHPE UCF Twitter",
        },
      ],
    }
  },
  {
    group: {
      name: "SHPE NATIONAL",
      items: [
        {
          uri: "http://www.shpe.org",
          title: "SHPE National",
          description: "SHPE website",
        },
      ]
    }
  },
  {
    group: {
      name: "UCF",
      items: [
        {
          uri: "http://www.ucf.edu",
          title: "University of Central Florida",
          description: "website",
        },
      ]
    }
  },
  {
    group: {
      name: "INDUSTRY",
      items: [
        {
          uri: "http://www.nasa.gov",
          title: "NASA",
          description: "website",
        },
        {
          uri: "http://www.northropgrumman.com/Careers/Students-Entry-Level/Pages/default.aspx",
          title: "Northrop Grumman",
          description: "website",
        },
        {
          uri: "https://www.lockheedmartin.com/us.html",
          title: "Lockheed Martin",
          description: "website",
        },
        {
          uri: "https://careers.google.com/students/",
          title: "Google Careers",
          description: "website",
        },
      ]
    }
  },
  {
    group: {
      name: "STUDENT FREEBIES / DISCOUNTS",
      items: [
        {
          uri: "https://www.visualstudio.com/free-developer-offers/",
          title: "Microsoft",
          description: "Visual Studio Dev Essentials credits",
        },
        {
          uri: "https://www.jetbrains.com/student/",
          title: "JetBrains",
          description: "Student free licenses",
        },
        {
          uri: "https://education.github.com/pack",
          title: "GitHub",
          description: "Student Developer Pack",
        },
      ]
    }
  }
];

class Resources extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#0c0b0b'}}>
        <NavBar title="Resources" back onBack={() => Actions.pop()} />
        <ScrollView>
          {
            resources.map((resource, i) => (
              <View key={i}>
                <Text style={styles.sectionTitle}>
                  {resource.group.name}
                </Text>
                <List containerStyle={{ backgroundColor: '#2C3239', marginTop: 10 }}>
                  {
                    resource.group.items.map((item, i) => (
                      <ListItem
                        key={i}
                        title={item.title}
                        titleStyle={{ color: 'white'}}
                        subtitle={item.description}
                        onPress={() => Actions.WebPageShow(
                          { title: item.title,
                            uri: item.uri }
                        )}
                      />
                    ))
                  }
                </List>
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
  }
});
export { Resources };
