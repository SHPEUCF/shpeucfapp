import firebase from 'firebase';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  fetchMembersPoints,
  loadUser,
  fetchEvents,
  goToViewEvent
} from '../ducks';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
import { Button, Spinner, NavBar } from '../components/general'
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
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
        // this.props.fetchEvents()
        // this.props.fetchMembersPoints()
    }

    render() {
  
        const {
            page,
            containerStyle,
            contentContainerStyle,
            title,
            points,
            topLevelText,
            textColor
        } = styles

               return (
                <SafeAreaView style ={page}>
                    <NavBar title="Points" back onBack={() => Actions.pop()} />
                    {this.renderContent()}
                </SafeAreaView>
            )
    }

    renderContent(){

        const { currentUser } = firebase.auth();
        const {
            containerStyle,
            contentContainerStyle,
            title,
            points,
            topLevelText,
            textColor,
            itemContainer
        } = styles

        const {
            membersPoints
        } = this.props
            
        var breakdown

        if (membersPoints !== undefined && membersPoints !== null &&
            membersPoints[currentUser.uid] !== undefined && membersPoints[currentUser.uid] !== null
            && membersPoints[currentUser.uid].breakdown !== undefined && membersPoints[currentUser.uid].breakdown !== null 
            && membersPoints[currentUser.uid].breakdown.length !== 0) {

            breakdown = Object.entries(membersPoints[currentUser.uid].breakdown)
            return (
                <SafeAreaView style={{flex: 1}}>
                    <View style={[contentContainerStyle,containerStyle]}>
                        <Text style={[title, topLevelText, textColor]}>Total Points</Text>
                        <Text style={[points, topLevelText, textColor]}>{this.props.membersPoints[currentUser.uid].points}</Text>
                    </View>
                    <FlatList
                        data={breakdown}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item, separators}) => (
                        this.renderComponent(item)
                        )}
                    />
                </SafeAreaView>
            )
        }
        else return (
            <View style = {{flex: 1, height: dimension.height, justifyContent: "center", padding: "10%"}}>
            <Text style={[textColor]}>You have no Points! Go out there and get some points!</Text>
            </View>
        )
    }

   _keyExtractor = (item, index) => item;

   renderComponent(section) {
    const {
    containerStyle,
    contentContainerStyle,
    title,
    points,
    midLevelText,
    textColor
    } = styles;   
    // alert(item[0])
    var count = this.countPoints(section)

    var arr = section;

    if(section === null || section.length < 1 || section[1] === null)
        arr = []
    // alert(Object.values(section[1])[1].name)
    return (
        <View>
        <TouchableOpacity onPress = {() => this.toggleShow(section[0])}>
            <View style={contentContainerStyle}>
                <View style={containerStyle}>
                    <Text style={[title,midLevelText, textColor]}>{section[0]}</Text>
                    <Text style={[points,midLevelText, textColor]}>{count}</Text>
                </View>
            </View>
            </TouchableOpacity>
            <FlatList
                visible={false}
                data={Object.values(arr[1])}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({item, separators}) => (
                this.renderInnerComponent(item,section[0])
                )}/>
        </View>
    )
    }

    convertNumToDate(date) {
		var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		temp_date = date.split("-");
		return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}`;
	}

   renderInnerComponent(item, section){
    const {
        innerContainerStyle,
        innerContentContainerStyle,
        title,
        points,
        botLevelText,
        textColor
    } = styles;

    if (JSON.stringify(this.state.show) === JSON.stringify(section)) {
        return(
        <TouchableOpacity>
        <View style={innerContentContainerStyle}>
            <View style={innerContainerStyle}>

                <Text style={[title,botLevelText,textColor]}>{item.name}</Text>
                <Text style={[points,botLevelText,textColor]}>{item.points}</Text>
                <Text style={[botLevelText, textColor]}>{this.convertNumToDate(item.date)}</Text>
            </View>
        </View>
        </TouchableOpacity>
        )
    }
    else
        return null;
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

}

const styles = StyleSheet.create({
    page: {
        paddingBottom: 10,
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#0c0b0b'
    },
    containerStyle: {
        flexDirection: 'row',
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    textColor: {
        color: '#e0e6ed',
        textAlign: 'center',
        fontSize: 18
    },
    topLevelText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    midLevelText: {
        fontSize: 16
    },
    botLevelText: {
        fontSize: 9
    },
    contentContainerStyle: {
        marginTop: 1,
        backgroundColor: '#2C3239'
    },
    title: {
        flex: 1
    },
    points: {
        flex: 1
    },
    innerContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        height: dimension.height *.07,
        backgroundColor: '#aaa2',
        alignItems: "center",
        paddingHorizontal: 15,
    },
    innerContentContainerStyle: {
        margin: 1,
    },
    itemContainer: {
        flex: 1
    }
});

const mapStateToProps = ({ user, members, events, general }) => {
  const { membersPoints } = members;
  const { id } = user
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
