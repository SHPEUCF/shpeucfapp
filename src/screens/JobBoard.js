import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';
import { Header,SegmentBtn } from '../components/general';

class JobBoard extends Component {

  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={{flex:1}}>
        <Header
          headerTitle={'Job Board'}
          backButton={
          <TouchableOpacity onPress={() => goBack()} >
            <Text style={styles.backTextStyle}>{"< Back"}</Text>
          </TouchableOpacity>}/>
        {/*<Text style={{marginTop: Dimensions.get('window').height/3}}>Job Board</Text>*/}
        <View style={styles.container}>

          <SegmentBtn
            leftText={"Month"}
            />

        </View>
      </View>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backTextStyle: {
    fontSize: 15,
    color: '#007AFF'
  },
});

export { JobBoard };
