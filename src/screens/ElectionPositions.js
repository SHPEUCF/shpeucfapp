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
    deletePosition,
    goToPositionForm
} from '../actions'

const dimension = Dimensions.get('window');

class ElectionPosition extends Component {
  constructor(props) {
    super(props);
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
            <Text style={tabBarText}>Positions</Text>
        </View>
         <View style={content}>
            <Text>FlatList of all positions here</Text>
            <Text>when you click on a position gives you options to edit</Text>
            <Text>and remove them kind of like how events does</Text>
            <Text>Positions and candidates are very similar maybe make a component that creates most of the page and use it for both</Text>
         </View>
        
         <View style={buttonContainerStyling}>
            <Button 
            onPress={() => this.props.goToPositionForm("ADD")}
            title={"ADD POSITIONS"}
            > 
            </Button>
        </View>
        <View style={buttonContainerStyling}>
            <Button 
            onPress={() => Actions.ElectionBackEnd()}
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
    deletePosition,
    goToPositionForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionPosition);
