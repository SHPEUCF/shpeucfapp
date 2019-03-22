import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  ScrollView,
  FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { Spinner} from '../components/general'

import {
  getPrivilege,
  pageLoad
} from "../actions"

  const menuItems = [
    {
      title: 'Leaderboard',
      icon: 'format-align-left',
      screen: 'Leaderboard',
      privilege: "user"
    },
    {
      title: 'Resources',
      icon: 'layers',
      screen: 'Resources',
      privilege: "user"
    },
    {
      title: 'Check In',
      icon: 'done',
      screen: 'CheckIn',
      privilege: "user"
    },
    {
      title: 'Forms',
      icon: 'assignment',
      screen: 'Forms',
      privilege: "user"
    },
    {
      title: 'Election',
      icon: 'done',
      screen: 'Election',
      privilege: "user"
    },
    {
      title: 'About',
      icon: 'info',
      screen: 'About',
      privilege: "user"
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
    this.props.pageLoad();
    this.props.getPrivilege();
  }

  keyExtractor = (item, index) => index
 
  renderItem  = ({item}) => {
    
    if (this.props.privilege !== undefined && this.props.privilege[item.privilege] === true ) {
      return(
        <ListItem
          removeClippedSubviews={false}
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
  }
}

const mapStateToProps = ({ auth, general }) => {
  const { privilege } = auth;
  const { loading } = general;

  return { privilege, loading };
};

const mapDispatchToProps = {
  getPrivilege,
  pageLoad
 };


export default connect(mapStateToProps, mapDispatchToProps)( More );
