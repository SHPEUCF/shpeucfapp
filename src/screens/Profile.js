import React, { Component } from 'react';
import {
  Text,
  View, StyleSheet,
  Image,
  ScrollView, 
  TouchableOpacity } from 'react-native';

import { Header } from '../components/general';

class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

          <View style={styles.containerStyle1}>
            <Image style={{height:100, width:100, margin: 10, borderRadius: 50}}
             source={{uri:'http://s2.storage.akamai.coub.com/get/b92/p/coub/simple/cw_timeline_pic/410c9604b2e/24bf4be1fe57b332d8099/big_1476460439_image.jpg'}}
             />
             <View style={{marginLeft:70, justifyContent: 'center', flex: 3}}>
               <Text style={styles.tagline}>"Turn up!"</Text>
            </View>
          </View>

          <View style={styles.containerStyle2}>

            <View style={styles.itemsContainerStyle1}>
              <View style={styles.itemLabelStyle}>
                <Text style={styles.itemLabelText}>Name:</Text>
              </View>
              <View style={styles.itemValueStyle}>
                <Text style={styles.itemValueText}>John Doe</Text>
              </View>
            </View>

            <View style={styles.itemsContainerStyle2}>
              <View style={styles.itemLabelStyle}>
                <Text style={styles.itemLabelText}>Email:</Text>
              </View>
              <View style={styles.itemValueStyle}>
                <Text style={styles.itemValueText}>@knights.ucf.edu</Text>
              </View>
            </View>

            <View style={styles.itemsContainerStyle3}>
              <View style={styles.itemLabelStyle}>
                <Text style={styles.itemLabelText}>Major:</Text>
              </View>
              <View style={styles.itemValueStyle}>
                <Text style={styles.itemValueText}>Computer Engineering</Text>
              </View>
            </View>

            <View style={styles.itemsContainerStyle4}>
              <View style={styles.itemLabelStyle}>
                <Text style={styles.itemLabelText}>Membership:</Text>
              </View>
              <View style={styles.itemValueStyle2}>
                <Text style={styles.itemValueText}>Active</Text>
              </View>
              <View style={styles.itemValueStyle2}>
                 <Text style={styles.itemValueText}>Expires: Date</Text>
              </View>
            </View>

          </View>

        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  containerStyle1: {
  flex: 1,
  flexDirection: 'row',
  },
  containerStyle2: {
  flex: 1,

  },
  tagline:{
    fontSize: 15,
    fontWeight: '500'
  },
  itemsContainerStyle1: {
    flexDirection: 'row',
    backgroundColor: 'green',
    marginTop: 10,
    padding: 20,
  },
  itemsContainerStyle2: {
    flexDirection: 'row',
    backgroundColor: 'green',
    marginTop: 10,
    padding: 20,
  },
  itemsContainerStyle3: {
    flexDirection: 'row',
    backgroundColor: 'green',
    marginTop: 10,
    padding: 20,
  },
  itemsContainerStyle4: {
    flexDirection: 'row',
    backgroundColor: 'green',
    marginTop: 10,
    padding: 20,
  },
  itemLabelStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  itemLabelText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  itemValueStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemValueStyle2: {
    flex: 1,
    justifyContent: 'center',
  },
  itemValueText: {
    fontSize: 15,
    fontWeight: '500',
  },
  editTextStyle: {
    fontSize: 15,
    color: '#007AFF'
  },
  contentContainer: {
    paddingVertical: 10
  }
});

export {Profile};
