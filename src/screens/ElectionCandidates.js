import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    deleteCandidates,
    goToCandidateForm,
    getPositions,
    approveApplication,
    deleteApplication
} from '../actions'

const dimension = Dimensions.get('window');

class ElectionCandidates extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
      this.props.getPositions();
  }

  approve(){

  }

  renderCandidates(item) {
    const {
      containerStyle,
      contentContainerStyle,
      containerTextStyle,
      candidateContainer
    } = styles;

    if (!(item.approved)){
    return (
      <View style={contentContainerStyle}>
          <View style={candidateContainer}>
            <View style={containerTextStyle}>
              <Text>{item.firstName + ' ' + item.lastName}</Text>
            </View>
            {this.renderDecisions(item)}
          </View>
      </View>
    )
  }
  }

  renderPositions(item) {
    const {
      containerStyle,
      contentContainerStyle,
    } = styles;

    const candidatesArray = _.toArray(item.candidates)

    return (
      <View style={contentContainerStyle}>
          <View style={containerStyle}>
            <Text>{`${item.title}`}</Text>
          </View>
          <FlatList
              data={candidatesArray}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={({item, separators}) => (
              this.renderCandidates(item)
            )}
          />
      </View>
    )
  }

  renderDecisions(item){
    return (

        <View style={styles.approveContainer}>
          <View style= {styles.candidateContainer}>
            <TouchableOpacity
            onPress={this.props.approveApplication.bind(this, item.position, item.id)}>
              <Ionicons name="md-checkmark-circle" size={40} color='#000000'/>
            </TouchableOpacity>
          </View>
          <View style= {styles.candidateContainer}>
            <TouchableOpacity
            onPress={this.props.deleteApplication.bind(this, item.position, item.id)}>
              <Ionicons name="md-close-circle" size={40} color='#000000'/>
            </TouchableOpacity>
          </View>
        </View>

    )
  }


  _keyExtractor = (item, index) => index;

  renderFlatlist(positions){
    return(
      <FlatList
          data={positions}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          this.renderPositions(item)
        )}
      />
    )
  }

  render() {
    const {
        tabBar,
        tabBarText,
        content,
        buttonContainerStyling,
        page,
        containerStyle,
        contentContainerStyle,
    } = styles;

    const {
      positions,
    } = this.props;

    const positionsArray = _.toArray(positions)

    //alert(positions.title);
    return (
     <View style={page}>
        <View style={tabBar}>
            <Text style={tabBarText}>Candidates</Text>
        </View>

        {this.renderFlatlist(positionsArray)}


        <View style={buttonContainerStyling}>
            <Button
            onPress={() => this.props.goToCandidateForm("ADD")}
            title={"ADD CANDIDATES"}
            >
            </Button>
        </View>
        <View style={buttonContainerStyling}>
            <Button
            onPress={() => Actions.ElectionBackEnd("")}
            title={"BACK"}
            >
            </Button>
        </View>
      </View>
    );
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
    backgroundColor: '#fff',

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
    backgroundColor: '#abc',
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
  },
  candidateContainer: {
    flex: 2,
    marginTop: dimension.height * .002,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffd700',
  },
  approveContainer: {
    flex: 2,
    marginTop: dimension.height * .002,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#ffd700',
  },
});

const mapStateToProps = ({ elect }) => {
    const { election, positions } = elect

    return { election, positions };
};

const mapDispatchToProps = {
    openElection,
    closeElection,
    deleteCandidates,
    goToCandidateForm,
    getPositions,
    approveApplication,
    deleteApplication
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionCandidates);
