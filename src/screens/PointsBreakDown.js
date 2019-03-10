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
  Dimensions } from 'react-native';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class PointsBreakDown extends Component {

    renderInnerComponent(item){
        const {
            containerStyle,
            contentContainerStyle,
            progress,
            curUserHighlight
        } = styles;
        return(
        <TouchableOpacity onPress = {console.log("wut")}>
        <View style={contentContainerStyle}>
            <View style={containerStyle}>
              <Text>{item}</Text>
            </View>
        </View>
        </TouchableOpacity>
        )
    }

  renderComponent(item, breakdown) {
    const {
      containerStyle,
      contentContainerStyle,
      progress,
      curUserHighlight
    } = styles;    


    return (
      <TouchableOpacity onPress = {console.log("wut")}>
        <View style={contentContainerStyle}>
            <View style={containerStyle}>
                <Text>{item}</Text>
                <FlatList
                data={_.values(breakdown)}
                keyExtractor={this._keyExtractor}
                renderItem={({item, separators}) => (
                this.renderInnerComponent(item)
                )}/>
            </View>
        </View>
        </TouchableOpacity>
      )
  }

   _keyExtractor = (item, index) => index;

  render() {
    const {
      containerStyle,
      contentContainerStyle,
      progress } = styles;
    const breakdownKeys = Object.keys(this.props.membersPoints[this.props.id].breakdown);
    const breakdown = _.values(this.props.membersPoints[this.props.id].breakdown);

    return (
    <View>
        <View>
        </View>
        <FlatList
            data={breakdown}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({item, separators}) => (
            this.renderComponent(breakdownKeys,item)
            )}
        />
      </View>
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
  curUserHighlight: {
    // backgroundColor: '#ffd70024',
    color: '#aa9100'
  },
  contentContainerStyle: {
    margin: 1,
    backgroundColor: '#fff',
  },
  progress: {
    flex: 1,
    justifyContent: 'center',
  }
});

const mapStateToProps = ({ auth,members }) => {
  const { membersPoints } = members;
  const { id } = auth

  return { membersPoints, id };
};

const mapDispatchToProps = {
  fetchMembersPoints,
  fetchMemberProfile,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PointsBreakDown);
