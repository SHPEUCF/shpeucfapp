import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';
import { Slider } from 'react-native-elements';
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
    const members = this.props.membersPoints;

    return (
      <ScrollView>
        {
          members.map((member, i) => (
            <View key={i} style={containerStyle}>
              <View style={contentContainerStyle}>
                <Text>{`${member.firstName} ${member.lastName} `}</Text>
                <Text>Points:{member.points}</Text>
                <Slider
                  value= {member.points}
                  disabled
                  Style={{ width: (dimension.width * .9)}}
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
