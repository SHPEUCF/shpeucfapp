import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions }from 'react-native';
import { Slider } from 'react-native-elements';
import { fetchMembers } from '../actions';

const dimension = Dimensions.get('window');

class Leaderboard extends Component {
  componentWillMount() {
    this.props.fetchMembers();
  }
  render() {
    const {
      containerStyle,
      contentContainerStyle } = styles;

    return (
      <View style={containerStyle}>
        <View style={contentContainerStyle}>
          <Text>{this.props.firstName} {this.props.lastName}</Text>
          <Text>Points: {this.props.points}</Text>
          <Slider
            value= {this.props.points}
            disabled
            Style={{ width: (dimension.width * .9)}}
            thumbTintColor='transparent'
            onValueChange={(value) => alert('slide')} />
        </View>
      </View>
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
  const { firstName, lastName, points } = members;

  return { firstName, lastName, points };
};

const mapDispatchToProps = {
  fetchMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
