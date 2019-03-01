import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
 ScrollView,
 StyleSheet,
 FlatList,
 Text,
 View,
 TouchableOpacity,
 Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Button } from '../components/general/Button'
const menuItems = [
 {
   title: 'Delete Graph',
   icon: 'android',
   screen: 'Forms'
 },

 ];

const dimension = Dimensions.get('window');


class Statistics extends Component {


 renderComponent(item) {
     return (
     <TouchableOpacity onPress = {() => Actions[item.screen]()}>
       <View style={{backgroundColor: "#fff", height: 10, flex: 1}}>
           <View style={{backgroundColor: "#fff", height: 10, flex: 1}}>
             <Text>{`${item.title} ${item.icon}`}</Text>
           </View>
         </View>
       </TouchableOpacity>
     )
 }

 renderItem  = ({item}) => {
      if (!('privilege' in item) || this.props.privilege[item.privilege] === true ) {
        return(
        <ListItem
          title={item.title}
          leftIcon={{name: item.icon}}
          onPress={() => Actions[item.screen]()}
        />
      )
    }
  }

render() {
    const {
        buttonContainerStyling,
        page,
        tabBar,
        tabBarText
    } = styles;

 return (
    <View style={page}>
        <View style={tabBar}>
            <Text style={tabBarText}>Statistics</Text>
        </View>
        <ScrollView>
        <FlatList
            data={menuItems}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
        />
        </ScrollView>
        <View style={buttonContainerStyling}>
            <Button
            onPress={() => Actions.createStatistics()}
            title={"CREATE STATISTICS"}
            >
            </Button>
        </View>
        <View style={buttonContainerStyling}>
            <Button
            onPress={() => Actions.BackEnd()}
            title={"BACK"}
            >
            </Button>
        </View>
    </View>
 );
};
}

const styles = StyleSheet.create({
  buttonContainerStyling: {
      margin: 5
  },
  page: {
    flex: 1,
    backgroundColor: '#ebebf1',
  },
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
});

export default (Statistics);
