import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
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
    getPositions,
    closeApplications,
    openApplications,
    fetchMemberProfile
} from '../actions'

const dimension = Dimensions.get('window');

const iterateesPos = ['level'];
const orderPos = ['asc'];

const iterateesCan = ['votes'];
const orderCan = ['desc'];
var winners = [];

class ElectionBackEnd extends Component {
  constructor(props) {
    super(props);
  }

  state = { fetchMember: false, fetchId: null};

  componentDidMount() {
      this.props.getVotes();

      if (this.state.fetchMember){
          this.props.fetchMemberProfile(this.state.fetchId);
          this.setState({fetchMember: false});
      }
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

  applyOpenOrClose(){
      if(this.props.apply){
        return (
        <Button
        onPress={() => this.props.closeApplications()}
        title={"CLOSE APPLICATIONS"}
        >
        </Button>
        )
      }
      else
      return (
        <Button
        onPress={() => this.props.openApplications()}
        title={"OPEN APPLICATIONS"}
        >
        </Button>
        )
  }

  renderVotes(item, index, position) {
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;

    const candidatesArray = _.orderBy(item, iterateesCan, orderCan)
    var winner = candidatesArray[0]

    winners[index] = winner.firstName + " " + winner.lastName;


    return (
      <View>
      <View style={contentContainerStyle}>
          <View style={containerStyle}>
            <Text>{position + ": " + winners[index]}</Text>
          </View>
      </View>
      </View>
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
            <Text>Election Start Date: </Text>
            <Text>{"Total Votes: " + this.props.numOfVotes}</Text>
        </View>

        {this.renderFlatlist()}

        <View style={buttonContainerStyling}>
            {this.openOrClose()}
        </View>
        <View style={buttonContainerStyling}>
            {this.applyOpenOrClose()}
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


  _keyExtractor = (item, index) => index;

  renderFlatlist(){
    const votesArray = _.orderBy(this.props.votes, iterateesPos, orderPos)
    return(
      <FlatList
          data={votesArray}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators, index}) => (
          this.renderVotes(item, index, Object.entries(this.props.votes)[index][0])
        )}
      />
    )
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
  containerStyle: {
    flex: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',

    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  containerTextStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#ffd700',

    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  contentContainerStyle: {
    margin: 1,
    height: dimension.height * .09,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',

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

const mapStateToProps = ({ elect, members }) => {
    const { election, votes, apply, numOfVotes, positions } = elect
    const { firstName, lastName, id} = members

    return { election, votes, apply, numOfVotes, firstName, lastName, positions};
};

const mapDispatchToProps = {
    openElection,
    closeElection,
    getVotes,
    getPositions,
    closeApplications,
    openApplications,
    fetchMemberProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionBackEnd);
