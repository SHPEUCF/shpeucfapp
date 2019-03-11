import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  fetchMembersPoints,
  loadUser,
  fetchEvents,
  goToViewEvent
} from '../actions';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
import { Button, Spinner } from '../components/general'
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';

console.disableYellowBox = true;
const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class PointsBreakDown extends Component {
 
    componentWillMount() {
        {this.setState({show: ""})}
        this.props.fetchEvents()
        this.props.fetchMembersPoints()
    }

    countPoints(item) {
         var count = 0;
         values = Object.values(item[1])
         for (var i = 0; i < values.length; i++) {
             count += Number(values[i].points)
         }
         return count;
    }
    toggleShow = function(text) {
        if (JSON.stringify(this.state.show) === JSON.stringify(text))
            this.setState({show: ""})
        else
        this.setState({
            show: text
        });
    }
    
    renderInnerComponent(item, section){
        const {
            innerContainerStyle,
            innerContentContainerStyle,
            title,
            points
        } = styles;

        if (JSON.stringify(this.state.show) === JSON.stringify(section)) {
            return(
            <TouchableOpacity>
            <View style={innerContentContainerStyle}>
                <View style={innerContainerStyle}>
                    <Text style={title}>{item.name}</Text>
                    <Text style={points}>{item.points}</Text>
                </View>
            </View>
            </TouchableOpacity>
            )
        }
        else
            return null;
    }

  renderComponent(section) {
    const {
      containerStyle,
      contentContainerStyle,
      title,
      points
    } = styles;   
    // alert(item[0])
    var count = this.countPoints(section)
    // alert(Object.values(section[1])[1].name)
    return (
        <View>
        <TouchableOpacity onPress = {() => this.toggleShow(section[0])}>
            <View style={contentContainerStyle}>
                <View style={containerStyle}>
                    <Text style={title}>{section[0]}</Text>
                    <Text style={points}>{count}</Text>
                </View>
            </View>
            </TouchableOpacity>
            <FlatList
                visible={false}
                data={Object.values(section[1])}
                keyExtractor={this._keyExtractor}
                renderItem={({item, separators}) => (
                this.renderInnerComponent(item,section[0])
                )}/>
        </View>
      )
  }

   _keyExtractor = (item, index) => item;

  render() {
  
    // alert(this.props.loading)
    if(this.props.loading){
      return <Spinner/>
    }
    else{
        const {
            page
        } = styles;
        const breakdown = Object.entries(this.props.membersPoints[this.props.id].breakdown)
        return (
            <View style ={page}>
                <FlatList
                    data={breakdown}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item, separators}) => (
                    this.renderComponent(item)
                    )}
                />
                <Button
                title={"Return"}
                onPress={()=> Actions.pop()}/>
            </View>
        )
    }
  }
}

const styles = StyleSheet.create({
    page: {
        marginBottom: 10,
        flex: 1
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    contentContainerStyle: {
        margin: 1,
        backgroundColor: '#fff',
    },
    title: {
        flex: 1
    },
    points: {
        flex: .1
    },
    innerContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        height: dimension.height *.07,
        backgroundColor: '#0002',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    innerContentContainerStyle: {
        margin: 1,
    },
});

const mapStateToProps = ({ auth, members, events, general }) => {
  const { membersPoints } = members;
  const { id } = auth
  const { eventList } = events
  const { loading } = general

  return { membersPoints, id, eventList,loading };
};

const mapDispatchToProps = {
  fetchMembersPoints,
  loadUser,
  fetchEvents,
  goToViewEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(PointsBreakDown);
