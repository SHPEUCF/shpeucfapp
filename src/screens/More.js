import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, FlatList, Text, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { Spinner, NavBar } from '../components/general'


import {
  getPrivilege,
  pageLoad,
  updateElection
} from "../actions"



  const menuItems = [
    {
      title: 'Leaderboard',
      icon: 'format-align-left',
      screen: 'Leaderboard',
      privilege: "user",
    },
    {
      title: 'Resources',
      icon: 'layers',
      screen: 'Resources',
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
      privilege: "president"
    }
  ];

class More extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: false});
  }
  keyExtractor = (item, index) => index

  renderItem  = ({item}) => {
    const {
      election,
      privilege,
      apply,
    } = this.props

    if (item.title === "Election" && (((election === false || election === undefined || election === null)
    && (apply === false || apply === undefined || apply === null)) ||
    (privilege.paidMember === false || privilege.paidMember === undefined || privilege.paidMember === null))) {
      return (null);
    }

    if (privilege !== undefined && privilege[item.privilege] === true ) {
      return(
        <ListItem
          containerStyle={{ backgroundColor: '#2C3239', borderBottomColor: 'white', borderBottomWidth: 1}}
          removeClippedSubviews={false}
          title={item.title}
          chevron
          titleStyle={{ color: 'white'}}
          leftIcon={{name: item.icon , color: 'white' }}
          onPress={() => Actions[item.screen]()}
        />
      )
    }
  }

  render() {
    return (
      <View style={{backgroundColor: '#2C3239', flex: 1}}>
        <NavBar title="More Options" />
        <ScrollView
        //    refreshControl={
        //   <RefreshControl
        //     refreshing={this.state.refreshing}
        //     onRefresh={this._onRefresh}
        //   />
        // }
        >
        <FlatList
          removeClippedSubviews={false}
          extraData={this.state}
          keyExtractor = {this.keyExtractor}
          data = {menuItems}
          renderItem={this.renderItem}
        />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth, general, elect }) => {
  const { privilege } = auth;
  const { loading } = general;
  const { election, apply} = elect;

  return { privilege, loading, election, apply };
};

const mapDispatchToProps = {
  getPrivilege,
  pageLoad,
  updateElection
 };


export default connect(mapStateToProps, mapDispatchToProps)( More );
