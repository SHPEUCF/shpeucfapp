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
import { ListItem } from 'react-native-elements';



const dimension = Dimensions.get('window');

const menuItems = [
    {
      title: 'Election',
      icon: 'check',
      screen: 'ElectionBackEnd'
    },
    // {
    //   title: 'Statistics',
    //   icon: 'check',
    //   screen: 'Statistics'
    // },
];

class BackEnd extends Component {
  constructor(props) {
    super(props);
  }

  keyExtractor = (item, index) => index

  renderItem  = ({item}) => {
      if (!('privilege' in item) || this.props.privilege[item.privilege] === true ) {
        return(
        <ListItem
          title={item.title}
          titleStyle={{color: 'white'}}
          leftIcon={{name: item.icon}}
          onPress={() => Actions[item.screen]()}
        />
      )
    }
  }

  render() {
    const {
        tabBar,
        tabBarText,
        buttonContainerStyling,
        page
    } = styles;
    return (
      <View style={page}>
        <View style={tabBar}>
            <Text style={tabBarText}>Back End</Text>
        </View>
        <FlatList
          keyExtractor = {this.keyExtractor}
          data = {menuItems}
          renderItem={this.renderItem}
        />
        <View style={buttonContainerStyling}>
            <Button
            onPress={() => Actions.popTo('more')}
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
  buttonContainerStyling: {
      margin: 10
  },
  page: {
    flex: 1,
    backgroundColor: '#2C3239',
  }
});

const mapStateToProps = ({  }) => {

  return {  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BackEnd);
