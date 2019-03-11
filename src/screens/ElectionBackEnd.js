import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';
import { Button } from '../components/general'
import {
    openElection,
    closeElection,
    getVotes,
    getPositions
} from '../actions'

const dimension = Dimensions.get('window');

class ElectionBackEnd extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
      this.props.getPositions();
  }

  openOrClose(){
      if(this.props.election){
        return (
        <Button
        onPress={() => this.props.closeElection()}
        title={"CLOSE ELECTION"}
        >
        </Button>
        )
      }
      else
      return (
        <Button
        onPress={() => this.props.openElection()}
        title={"OPEN ELECTION"}
        >
        </Button>
        )
  }

  render() {
    const {
        tabBar,
        tabBarText,
        content,
        buttonContainerStyling,
        page
    } = styles;
    return (
     <View style={page}>
        <View style={tabBar}>
            <Text style={tabBarText}>Election</Text>
        </View>
         <View style={content}>
            <Text>Maybe put how many people have voted here</Text>
            <Text>how long the election has been on</Text>
            <Text>how long the election has been on</Text>
            <Text>who's currently in the lead</Text>
        </View>

        <View style={buttonContainerStyling}>
            {this.openOrClose()}
        </View>
         <View style={buttonContainerStyling}>
            <Button
            onPress={() => Actions.ElectionPositions()}
            title={"MANAGE POSITIONS"}
            >
            </Button>
        </View>
        <View style={buttonContainerStyling}>
            <Button
            onPress={() => Actions.ElectionCandidates()}
            title={"MANAGE CANDIDATES"}
            >
            </Button>
        </View>

        <View style={buttonContainerStyling}>
            <Button
            onPress={() => Actions.popTo('BackEnd')}
            title={"BACK"}
            >
            </Button>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tabBar : {
    height: dimension.height * .1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0005",
  },
  tabBarText : {
    color: '#000',
    fontSize: 20,
    margin: 20,
    alignSelf: "center"
  },
  content: {
    flex: 1,
    margin: 10
  },
  buttonContainerStyle: {
      flex: 5,
      margin: 5
  },
  page: {
    flex: 1,
    backgroundColor: '#ebebf1',
  }
});

const mapStateToProps = ({ elect }) => {
    const { election, votes } = elect

    return { election, votes };
};

const mapDispatchToProps = {
    openElection,
    closeElection,
    getVotes,
    getPositions
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionBackEnd);
