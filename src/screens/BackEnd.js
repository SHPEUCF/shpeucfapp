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
import { ListItem } from 'react-native-elements';
import { NavBar } from '../components/general';

const dimension = Dimensions.get('window');

const menuItems = [
    {
      title: 'Election',
      icon: 'check',
      screen: 'ElectionBackEnd',
      privilege: 'president'
    },
    // {
    //   title: 'Statistics',
    //   icon: 'check',
    //   screen: 'Statistics'
    // },
];

class BackEnd extends Component {
  constructor(props) {
    super(props);
  }

  keyExtractor = (item, index) => index

  renderItem  = ({item}) => {

    const {
      privilege
    } = this.props
      if ( privilege !== null && privilege !== undefined && item !== null && item !== undefined
        &&  privilege[item.privilege] !== undefined && (!('privilege' in item) || privilege[item.privilege] === true )) {
        return(
        <ListItem
          title={item.title}
          titleStyle={{color: 'white'}}
          leftIcon={{name: item.icon}}
          onPress={() => Actions[item.screen]()}
        />
      )
    }
  }

  render() {
    const {
        tabBar,
        tabBarText,
        page
    } = styles;
    return (
      <View style={page}>
        <NavBar title="Back End" back onBack={() => Actions.pop()} />
        <FlatList
          keyExtractor = {this.keyExtractor}
          extraData={this.state}
          data = {menuItems}
          renderItem={this.renderItem}
        />
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
  page: {
    flex: 1,
    backgroundColor: '#2C3239',
  }
});

const mapStateToProps = ({ auth }) => {
  const { privilege } = auth

  return { privilege };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BackEnd);
