import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions, ProgressViewIOS }from 'react-native';
import _ from 'lodash';
import { fetchMembersPoints } from '../actions';

const dimension = Dimensions.get('window');

class Leaderboard extends Component {
  componentWillMount() {
    this.props.fetchMembersPoints();
  }


  render() {
    const {
      containerStyle,
      contentContainerStyle } = styles;
    const sortedMembers = _.orderBy(this.props.membersPoints,['points','lastName','firstName'],['desc','asc','asc']);

    return (
      <ScrollView>
        {
          sortedMembers.map((member, i) => (
            <View key={i} style={containerStyle}>
              <View style={contentContainerStyle}>
                <Text>{`${member.firstName} ${member.lastName} `}</Text>
                <Text>Points:{member.points}</Text>
                <ProgressViewIOS
                  progress = {member.points / 100}
                  disabled
                  thumbTintColor='transparent'/>
              </View>
            </View>
          ))
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20
  },
  contentContainerStyle: {
    paddingLeft: dimension.width * .05,
    paddingRight: dimension.width * .05,
  }
});

const mapStateToProps = ({ members }) => {
  const { membersPoints } = members;

  return { membersPoints };
};

const mapDispatchToProps = {
  fetchMembersPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
