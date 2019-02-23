import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button } from '../components/general/';
import {Text, View, Modal, Dimensions, TouchableOpacity }from 'react-native';
import {
  fetchEvents,
  getPrivilege,
  typeChanged } from '../actions';
const dimension = Dimensions.get('window');

class Election extends Component {

  omponentWillMount() {
    {this.setState({modalVisible: false})}
    this.props.fetchEvents();
    this.props.getPrivilege();
  }

  eboardBtn(){
    if(this.props.privilege !== undefined && this.props.privilege.eboard == true){
      return(
        <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'grey', paddingBottom:10, paddingHorizontal:20}}>
        <Button title="Time" width={95}/>
        <Button title="Candidate" width={95}/>
        <Button title="Analytics" width={95}/>
        </View>
      )
    }
  }

  render(){
    return(

<View style={{flex: 1}}>
{this.eboardBtn()}
</View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { privilege } = auth;
  return { privilege };
};

const mapDispatchToProps = {
  getPrivilege,
  typeChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(Election);
