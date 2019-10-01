import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  DeviceshpeEmitter,
  Alert } from 'react-native';
import { Card, Button, List, ListItem, Divider, Avatar } from 'react-native-elements';

class EBoard extends Component {
  render() {
    const {
      cardContainer,
      shpeInfoContainer,
      shpeInfoRow,
      infoLabel,
      infoValue,
      signalInfoLabel,
      titleColor } = styles;

    return (
      <View style={styles.container}>
        <ScrollView style={{backgroundColor: '#0c0b0b'}}>
          <Card
            title='Piero Castillo'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'President'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "http://www.shpeucf.com/wp-content/uploads/2014/06/Piero-Castillo.jpg"}}
                  />
              </View>
            </View>
          </Card>

          <Card
            title='Nicole Vargas'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'External Vice President'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "http://www.shpeucf.com/wp-content/uploads/2014/06/Nicole-Vargas-Gonzalez.jpg"}}
                  />
              </View>
            </View>
          </Card>

          <Card
            title='Yamil Herrera'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'Graduate Ambassador'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "http://www.shpeucf.com/wp-content/uploads/2016/03/Yamil_Herrera_17-18-150x150.jpg"}}
                  />
              </View>
            </View>
          </Card>

          <Card
            title='Ana Riveros'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'Internal Vice President'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "http://www.shpeucf.com/wp-content/uploads/2016/03/Ana_Riveros_17-18-150x150.jpg"}}
                  />
              </View>
            </View>
          </Card>

          <Card
            title='Daniel Castro'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'Treasurer'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "http://aerostructures.cecs.ucf.edu/wp-content/uploads/2014/04/IMG_7899.jpg"}}
                  />
              </View>
            </View>
          </Card>

          <Card
            title='Joel Montano'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'Events Chair'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e35/16789825_572640409613293_3421786378705305600_n.jpg?ig_cache_key=MTQ1NDU2OTk3NDc0NDQ0NDA1OQ%3D%3D.2&se=8"}}
                  />
              </View>
            </View>
          </Card>


          <Card
            title='Carlos Arboleda'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'MentorSHPE Director'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "http://www.shpeucf.com/wp-content/uploads/2016/03/Chris_Hernandez_17-18-150x150.jpg"}}
                  />
              </View>
            </View>
          </Card>

          <Card
            title='Ignacio Lopez'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'SHPE Jr. Coordinator'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "http://www.shpeucf.com/wp-content/uploads/2016/03/Ignacio_Lopez_17-18-150x150.jpg"}}
                  />
              </View>
            </View>
          </Card>

          <Card
            title='Luis Benavides'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'Tech Director'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "http://www.shpeucf.com/wp-content/uploads/2016/03/Luis_Benavides_17-18-150x150.jpg"}}
                  />
              </View>
            </View>
          </Card>

          <Card
            title='Lucyana Panti'
            titleStyle={titleColor}
            containerStyle={cardContainer}>
            <View style={shpeInfoContainer}>
              <View style={shpeInfoRow}>
                <Text style={infoLabel}>
                  {'Development Chair'}
                </Text>
              </View>
              <View style={shpeInfoRow}>
                <Avatar
                  rounded
                  xlarge
                  source={{uri: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAzkAAAAJGQzODc2ZWQxLTc1ZWMtNGU1YS1hOWYyLTNmNmEwZGYwMjJjYQ.jpg"}}
                  />
              </View>
            </View>
          </Card>



        </ScrollView>
      </View>
    )
  }
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardContainer: {
      marginRight: 5,
      marginLeft: 5,
      marginTop: 5,
      backgroundColor: '#2C3239',
    },
    shpeInfoContainer: {
      marginBottom: 10,
    },
    shpeInfoRow: {
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoLabel: {
     fontSize: 20,
     fontWeight: 'bold',
     alignItems: 'center',
     justifyContent: 'center',
     color: 'white'
    },
    infoValue: {
     fontSize: 15,
     fontWeight: 'normal',
     color: 'white'
    },
    signalInfoLabel: {
      marginBottom: 10,
      marginLeft: 10,
      color: 'white',
      fontWeight: 'bold',
    },
    titleColor: {
      color: 'white'
    },

  });

export { EBoard };
