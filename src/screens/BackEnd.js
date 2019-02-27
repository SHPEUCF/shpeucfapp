import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';


const dimension = Dimensions.get('window');

class BackEnd extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
        page
    } = styles;


    return (
      <ScrollView style={page}> 
    
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  contentContainerStyle: {
    margin: 1,
    backgroundColor: '#abc',
  },
  page: {
    flex: 1,
    backgroundColor: '#eee'
  }
});

const mapStateToProps = ({  }) => {

  return {  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BackEnd);
