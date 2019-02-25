import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fetchMembersPoints, fetchMemberProfile, goToOtherProfile, pageLoad} from '../actions';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchMembersPoints();
  }

  callUser(id){
    this.props.pageLoad();
    this.props.fetchMemberProfile(id);
    this.props.goToOtherProfile();
  }

  renderComponent(item, sortedMembers) {
    const {
      containerStyle,
      contentContainerStyle,
      progress
    } = styles;
    if(item.points !== 0){
      return (
      <TouchableOpacity onPress = {this.callUser.bind(this, item.id)}>
        <View style={contentContainerStyle}>
            <View style={containerStyle}>
              <Text>{`${item.firstName} ${item.lastName}`}</Text>
              <Text>Points:{item.points}</Text>
              <Progress.Bar
                style={progress}
                progress={item.points / Math.max(sortedMembers[0].points,1)}
                indeterminate={false}
                width={dimension.width * .9}
                color= {'#ffd700'}
              />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
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
  progress: {
    flex: 1,
    justifyContent: 'center',
  }
});

const mapStateToProps = ({ members }) => {
  const { membersPoints } = members;

  return { membersPoints };
};

const mapDispatchToProps = {
  fetchMembersPoints,
  fetchMemberProfile,
  goToOtherProfile,
  pageLoad

};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
