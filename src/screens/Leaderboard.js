import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  fetchMembersPoints,
  fetchMemberProfile,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  loadUser
} from '../actions';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image } from 'react-native';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadUser()
    this.props.fetchMembersPoints();
  }

  viewBreakDown() {
    Actions.pointsBreakDown();
  }

  callUser(id){
    this.props.pageLoad();
    this.props.getPrivilege();
    this.props.fetchMemberProfile(id);
    this.props.goToOtherProfile();
  }
    

  renderComponent(item, sortedMembers) {
    const {picture} = this.props;
    const {
      containerStyle,
      screenBackground,
      contentContainerStyle,
      progress,
      curUserHighlight
    } = styles;
    var action
    if(item.id === this.props.id){
      var curUser = curUserHighlight
      action = this.viewBreakDown
    }
    else{
      action = this.callUser
    }

    // if(item.points !== 0){
      // <View style={screenBackground}>
      return (
        <TouchableOpacity onPress = {action.bind(this, item.id)}>
          <View style={contentContainerStyle}>
              <View style={containerStyle}>
              {/* <Image    ***For Profile Picture Update***
                large
                rounded
                style={{alignSelf: 'flex-end', width: dimension.width *.14, height: dimension.height *.085}}
                source={{uri: picture}}
                /> */}
                <Text style={{color:"white", fontSize: 18, paddingBottom: 5, fontWeight: 'bold'}}>{`${item.firstName} ${item.lastName}`}</Text>
                <Text style={{color:"white", fontSize: 16, paddingBottom: 10}}>Points: {item.points}</Text>
                <Progress.Bar
                  style={progress}
                  progress={item.points / Math.max(sortedMembers[0].points,1)}
                  indeterminate={false}
                  height={dimension.width*.03}
                  width={dimension.width * .9}
                  color= {'#ffd700'}
                />
              </View>
          </View>
        </TouchableOpacity>
      // </View>
      )
    }

   _keyExtractor = (item, index) => index;

  render() {
    const {
      containerStyle,
      contentContainerStyle,
      progress } = styles;
    const sortedMembers = _.orderBy(this.props.membersPoints, iteratees, order);

    return (
      <FlatList
          data={sortedMembers}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          this.renderComponent(item, sortedMembers)
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#0c0b0b',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  screenBackground: {
    height: dimension.height,
    backgroundColor:'#2C3239',
  },
  curUserHighlight: {
    // backgroundColor: '#ffd70024',
    color: '#aa9100'
  },
  contentContainerStyle: {
    margin: 1,
    backgroundColor: '#2C3239',
  },
  progress: {
    // flex: 1,
    justifyContent: 'center',
    height: dimension.width*.03,
    borderColor: '#2C3239',
    backgroundColor: '#2C3239',
  }
});

const mapStateToProps = ({ auth,members }) => {
  const { membersPoints } = members;
  const { picture, id } = auth

  return { membersPoints, id, picture};
};

const mapDispatchToProps = {
  fetchMembersPoints,
  fetchMemberProfile,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
