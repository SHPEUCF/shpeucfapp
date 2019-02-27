import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  ScrollView,
  FlatList } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import {
  getPrivilege,
} from "../actions"

  const menuItems = [
    {
      title: 'Leaderboard',
      icon: 'format-align-left',
      screen: 'Leaderboard'
    },
    {
      title: 'Resources',
      icon: 'layers',
      screen: 'Resources'
    },
    {
      title: 'Check In',
      icon: 'done',
      screen: 'CheckIn'
    },
    {
      title: 'Forms',
      icon: 'assignment',
      screen: 'Forms'
    },
    {
      title: 'Election',
      icon: 'done',
      screen: 'Election'
    },
    {
      title: 'About',
      icon: 'info',
      screen: 'About'
    },
    {
      title: 'BackEnd',
      icon: 'settings',
      screen: 'BackEnd',
      privilege: "eboard"
    }
    ];

class More extends Component {

  componentDidMount(){
    this.props.getPrivilege();
  }

  keyExtractor = (item, index) => index
 
  renderItem  = ({item}) => {
    
      if (!('privilege' in item) || this.props.privilege[item.privilege] === true ) {
        return(
        <ListItem
          title={item.title}
          leftIcon={{name: item.icon}}
          onPress={() => Actions[item.screen]()}
        />
      )
    }
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          keyExtractor = {this.keyExtractor}
          data = {menuItems}
          renderItem={this.renderItem}
        />
      </ScrollView>
    );
  };
}

const mapStateToProps = ({ auth }) => {
  const { privilege } = auth;

  return { privilege };
};

const mapDispatchToProps = {
  getPrivilege
 };


export default connect(mapStateToProps, mapDispatchToProps)( More );
