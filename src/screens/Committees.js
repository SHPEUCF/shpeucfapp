import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Input, NavBar } from '../components/general';
import _ from 'lodash';
import {
  getCommittees, 
} from '../ducks';
import { Avatar } from 'react-native-elements';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  } from 'react-native';

  const dimension = Dimensions.get('window');
  const iteratees = ['level'];
  const order = ['asc'];

  class Committees extends Component {

  componentWillMount() {
    this.props.getCommittees();
  }

  render() {
    const {
        tabBar,
        tabBarText,
        content,
        page,
    } = styles;

    const {
      committeesList,
    } = this.props;

    const committeesArray = _.orderBy(committeesList, iteratees, order)

    return (
     <View style={page}>
        <NavBar title="Committees" back onBack={() => Actions.pop()} />
        <View style={content}>
          {this.renderFlatlist(committeesArray)}
        </View>
    </View>
    );
  }

  _keyExtractor = (item, index) => index;

  renderFlatlist(committees){
    return(
      <FlatList
          data={committees}
          extraData={this.props}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          this.renderCommittees(item)
        )}
      />
    )
  }

  renderCommittees(item) {
    const {
      containerStyle,
      contentContainerStyle,
      textColor
    } = styles;


    return (
      <View>
      <View style={contentContainerStyle}>
          <View style={containerStyle}>
            <Text style={textColor}>{item.title}</Text>
          </View>
      </View>
      </View>
    )
  }

  renderbuttons(item){

    const {
      position,
      id,
      firstName,
      lastName
    } = item

    const{
      deleteApplication,
      approveApplication
    } = this.props

    const {
      buttonContainerStyle
    } = styles;

    if(!item.approved){
      return (
        <View style = {[{flexDirection: 'row', flex: 1}]}>
            <View style= {buttonContainerStyle}>
              <TouchableOpacity
              onPress={() => approveApplication( position, id, firstName, lastName)}>
                <Ionicons name="md-checkmark-circle" size={40} color='#e0e6ed'/>
              </TouchableOpacity>
            </View>
            <View style= {buttonContainerStyle}>
              <TouchableOpacity
              onPress={() => deleteApplication( position, id)}>
                <Ionicons name="md-close-circle" size={40} color='#e0e6ed'/>
              </TouchableOpacity>
            </View>
          </View>
      )
    }

    else{
      return (
        <View style = {[{flexDirection: 'row', flex: 1}]}>
          <View style= {buttonContainerStyle}>
          <TouchableOpacity onPress={() => this.viewCandidate(item)}>
            <Ionicons name="md-create" size={40} color='#e0e6ed'/>
          </TouchableOpacity>
          </View>
          <View style= {buttonContainerStyle}>
            <TouchableOpacity
            onPress={() => deleteApplication( position, id)}>
              <Ionicons name="md-remove-circle" size={40} color='#e0e6ed'/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  tabBar : {
    height: dimension.height * .1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0005",
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#2C3239',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  containerTextStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textColor: {
    color: '#e0e6ed'
  },
  contentContainerStyle: {
    margin: 1,
    backgroundColor: '#abc',
    height: dimension.height * .09,
  },
  tabBarText : {
    color: '#000',
    fontSize: 20,
    margin: 20,
    alignSelf: "center"
  },
  content: {
    flex: .98,
  },
  buttonContainerStyle: {
    flex: .5,
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: '#0c0b0b',
  },
  candidateContainer: {
    flex: .5,
    marginTop: dimension.height * .002,
    flexDirection: 'row',
    justifyContent: 'center',
    height: dimension.height * .09,
  },
});

  const mapStateToProps = ({ committees }) => {
    const { committeesList } = committees;

    return { committeesList };
  };

  const mapDispatchToProps = {
    getCommittees
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Committees); 