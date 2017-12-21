import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity }from 'react-native';

import { Header } from '../components/general';

class Profile extends Component {
  render() {
 //When edit is pressed create text fields that change props this.text
    //this.text
    return (

      <View style={{ flex: 1 }}>
        <Header headerTitle={'Profile'} backButton={  <TouchableOpacity onPress={() => edit()} >
          <Text style={styles.editTextStyle}>{"Edit"}</Text>
          </TouchableOpacity>}/>
        <ScrollView contentContainerStyle={styles.contentContainer}>




        <View style={styles.containerStyle1}>
          <Image style={{height:100, width:100, margin: 10}}
           source={{uri:'https://78.media.tumblr.com/98ab9195d736eae9661faef27cc33504/tumblr_n7s5qcoovN1qea4hso1_1280.png'}}/>
         <View style={{marginLeft:70, justifyContent: 'center', flex: 3}}>
        <Text style={styles.tagline}>"Bitcoin or no coin"</Text>
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
    backgroundColor: 'blue',
    marginTop: 10,
    padding: 20,
  },
  itemsContainerStyle3: {
    flexDirection: 'row',
    backgroundColor: 'red',
    marginTop: 10,
    padding: 20,
  },
  itemsContainerStyle4: {
    flexDirection: 'row',
    backgroundColor: 'orange',
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
