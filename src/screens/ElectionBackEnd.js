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
import { Button } from '../components/general'

const dimension = Dimensions.get('window');

const menuItems = [
    {
      title: 'Election',
      icon: 'checkbox-outline"',
      screen: 'ElectionBackEnd'
    },    
];

class ElectionBackEnd extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
        tabBar,
        tabBarText,
        buttonContainerStyling,
        page
    } = styles;
    return (
     <View style={page}>
        <View style={tabBar}>
            <Text style={tabBarText}>Election</Text>
        </View>
        <View style={buttonContainerStyling}>
            <Button 
            onPress={() => Actions.BackEnd()}
            title={"BACK"}
            > 
            </Button>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tabBar : {
    height: dimension.height * .1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0005",
  },
  tabBarText : {
    color: '#000',
    fontSize: 20,
    margin: 20,
    alignSelf: "center"
  },
  buttonContainerStyling: {
      margin: 10
  },
  page: {
    flex: 1,
    backgroundColor: '#ebebf1',
  }
});

const mapStateToProps = ({  }) => {

  return {  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionBackEnd);
