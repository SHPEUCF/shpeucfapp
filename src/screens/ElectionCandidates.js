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
    deleteCandidates,
    goToCandidateForm
} from '../actions'

const dimension = Dimensions.get('window');

class ElectionCandidates extends Component {
  constructor(props) {
    super(props);
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
            <Text style={tabBarText}>Candidates</Text>
        </View>
         <View style={content}>
            <Text>FlatList of all candidates here</Text>
            <Text>when you click on a candidate gives you options to edit</Text>
            <Text>and remove them kind of like how events does</Text>
            <Text>How many votes they have (maybe? idk if that's too much but definitely need it for testing)</Text>
        </View>
        
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
    const { election } = elect
    
    return { election };
};

const mapDispatchToProps = {
    openElection,
    closeElection,
    deleteCandidates,
    goToCandidateForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionCandidates);
