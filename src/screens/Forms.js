import React, { Component } from 'react';
import  {Text, ScrollView, View, StyleSheet }from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import { NavBar } from '../components/general';

const forms = [
  {
    group: {
      name: "General",
      items: [
        {
          uri: "http://www.shpeucf.com/membership/",
          title: "Membership Form",
          description: "SHPE UCF annual membership",
        },
      ],
    }
  },
  {
    group: {
      name: "Positions",
      items: [
        {
          uri: "https://docs.google.com/forms/d/e/1FAIpQLSeeLiqMkNBV0Cken5KWglpcCmDyXzvfqejb5txJjg81vLkG8w/viewform",
          title: "Fundraising Committee",
          description: "MentorSHPE Interest Form",
        },
        {
          uri: "https://docs.google.com/forms/d/e/1FAIpQLScfN-uGLrsSmw1OwKflkHUN0V_70wdaKwRB2AgPmc1uQQdzhQ/viewform",
          title: "MentorSHPE",
          description: "Fundraising Committee Interest Form",
        },
      ],
    }
  },
  {
    group: {
      name: "Events",
      items: [
        {
          uri: "https://docs.google.com/forms/d/e/1FAIpQLSfiA_BK2BXpvQDIds7ilmdbyWT1wpdFptMpKRFPrE57L0pi0g/viewform",
          title: "Pen Pal",
          description: "SHPE Pen Pal project",
        },
      ]
    }
  },
  {
    group: {
      name: "Workshops",
      items: [
        {
          uri: "https://docs.google.com/forms/d/e/1FAIpQLSfh5hkPVV9OlsZwNKExuu8b58aBcShGzCeMXyMY6-b77LmtsQ/viewform",
          title: "Google at UCF",
          description: "Applied CS Workshop",
        },
      ]
    }
  },
  {
    group: {
      name: "Tours",
      items: [
        {
          uri: "https://docs.google.com/forms/d/e/1FAIpQLSf48WUE1ZEP62rl9lGJV3A_GhJXMHKr_pp3N1uf_LCFJhrMrA/viewform",
          title: "Northrop Grumman",
          description: "January 19 (Full Day Availability Required)",
        },
      ]
    }
  },
];

class Forms extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#2C3239'}}>
        <NavBar title="Forms" back onBack={() => Actions.pop()} />
        <ScrollView>
        {
          forms.map((form, i) => (
            <View key={i}>
              <Text style={styles.sectionTitle}>
                {form.group.name}
              </Text>
              <List containerStyle={{ backgroundColor: '#0c0b0b', marginTop: 10 }}>
                {
                form.group.items.map((item, i) => (
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
    fontSize: 15,
    marginTop: 10, 
    marginLeft: 20,
  }
});
export { Forms };
