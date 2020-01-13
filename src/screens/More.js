import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, FlatList, Text, View, RefreshControl, Dimensions, SafeAreaView, Image } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Spinner, NavBar } from '../components/general'


import {
  getPrivilege,
  pageLoad,
  updateElection
} from "../ducks"

const dimension = Dimensions.get('window');


  const menuItems = [
    {
      title: 'Leaderboard',
      icon: 'format-align-left',
      screen: 'LeaderboardM',
      privilege: "user",
    },
    {
      title: 'Election',
      icon: 'done',
      screen: 'Election',
      privilege: "user"
    },
    /*{
      title: 'Conventions',
      icon: 'airplanemode-active',
      screen: 'Conventions',
      privilege: "user"
    },
    {
      title: 'Leadership',
      icon: 'assignment-ind',
      screen: 'EBoard',
      privilege: "user"
    },*/
    {
      title: 'Committees',
      icon: 'assignment-ind',
      screen: 'Committees',
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

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <View style={{height: dimension.height * .1, backgroundColor: '#FECB00', borderBottomWidth: 1, borderColor: "black", justifyContent: "center"}}>
            <Image
              source={require('../assets/images/SHPE_UCF_Logo.png')}
              style={{alignSelf: 'center'}}
              height = {dimension.height * .06}
              resizeMode="contain"
            /> 
          </View>
        <View>
        <FlatList
          removeClippedSubviews={false}
          extraData={this.props}
          keyExtractor = {this.keyExtractor}
          data = {menuItems}
          renderItem={this.renderItem}
        />
        </View>
        <View style={{justifyContent: "center", flex: 1, flexDirection: "row"}}>
           <Image
              source={require('../assets/images/SHPE_logo_FullColor-RGB-2x.png')}
              style={{alignSelf: 'center'}}
              height = {dimension.height * dimension.width * .00025}
              resizeMode="contain"
            /> 
        </View>
      </SafeAreaView>
    );
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
        <View>
          <ListItem
            containerStyle={{ backgroundColor: 'black', borderBottomColor: 'black'}}
            removeClippedSubviews={false}
            title={item.title}
            chevron={{color: "#FECB00"}}
            titleStyle={{ color: 'white'}}
            leftIcon={{name: item.icon , color: 'white'}}
            onPress={() => Actions[item.screen]()}
          />
        </View>
      )
    }
  }

}

const mapStateToProps = ({ user, general, elect }) => {
  const { privilege, dashColor } = user;
  const { loading } = general;
  const { election, apply} = elect;

  return { privilege, loading, election, apply, dashColor};
};

const mapDispatchToProps = {
  getPrivilege,
  pageLoad,
  updateElection
 };


export default connect(mapStateToProps, mapDispatchToProps)( More );
