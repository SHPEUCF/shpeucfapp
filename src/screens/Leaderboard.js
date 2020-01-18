import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux';
import { NavBar, FilterPicker } from '../components/general'
import {
  fetchMembersPoints,
  fetchMemberProfile,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  loadUser,
  filterChanged
} from '../ducks';
import _ from 'lodash';
import * as Progress from 'react-native-progress';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {search: false}
  }

  componentWillMount() {
    this.props.filterChanged("")
    this.props.loadUser()
    this.props.fetchMembersPoints();
  }

  _keyExtractor = (item, index) => index;

  render() {
    const {
      screenBackground,
       } = styles;
    const sortedMembers = _.orderBy(this.props.userList, iteratees, order);
    var currentMember;
    var pastPoints = 0;
    var pastIndex = 1;
    sortedMembers.forEach((x, index) => {
      x.index = (x.points !== 0) ? index + 1 : sortedMembers.length;
      if (x.points === pastPoints) {
        x.index = pastIndex
      }
    
      pastPoints = x.points;
      pastIndex = x.index;
    });
    return (
      <SafeAreaView style={screenBackground}>
        <View style = {{flexDirection: "row", justifyContent: "space-between", backgroundColor: "black", paddingRight: "10%"}}>
        <NavBar title="Leaderboard" back onBack={() => Actions.pop()} />
          <View style = {{flex: .2, alignItems: "center", justifyContent: "center", backgroundColor: "black"}}>
            <Ionicons
            onPress={() => {
              this.props.filterChanged('')
              this.setState({search: !this.state.search})
            }}
            name={'ios-search'}
            size={dimension.height*.04}
            color={"#FECB00"}
          />
          </View>
        </View>
              <View style = {{flexDirection: "row", backgroundColor: "black"}}>
                <View style = {{flex: 1}}>
                  {this.state.search && (<FilterPicker
                  title={"Members"}
                  filter={this.props.filter}
                  type="Searchbar"
                  data={sortedMembers}
                  onChangeText={this.props.filterChanged.bind(this)}
                  placeholder="Find user"
                  />)}
                </View>
              </View>
              <FlatList
              extraData={this.props}
              keyExtractor = {this.keyExtractor}
              data = {sortedMembers}
              renderItem={({item, separators}) => (
                this.renderComponent(item, sortedMembers)
              )}
            />
      </SafeAreaView>
    )
  }

  renderComponent(item, sortedMembers) {
    const {picture} = this.props;
    const {
      containerStyle,
      contentContainerStyle,
      progress,
      curUserHighlight,
      textStyle,
      index,
      textColor,
      indexText
    } = styles;
    var action
    if(item.id === this.props.id){
      var curUser = curUserHighlight
      action = this.viewBreakDown
    }
    // else{
    //   action = this.callUser
    // }

    var re = new RegExp("^"+this.props.filter, "i");
    if (re.test(`${item.firstName} ${item.lastName}`) ){
        
      return (
        <TouchableOpacity onPress = {() => this.callUser(item.id)}>
          <View style={contentContainerStyle}>
              <View style={containerStyle}>
                <View style={{flex:.1}}></View>
                <View style={{flexDirection: 'row', flex: 1, alignItems: "center"}}>
                  <View style={{justifyContent: "center"}}> 
                    <View style={index}>
                      <Text style={textColor} style={indexText}>{item.index}</Text>
                    </View>
                  </View>
                <View >
                  <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
                    <View>
                      <View style={{flex: .2}}></View>
                      <Text style={ [textStyle, {fontWeight: 'bold'}]}>{`${item.firstName} ${item.lastName}`}</Text>
                      <Text style={[textStyle, {fontSize: dimension.width*.04,}]}>Points: {item.points}</Text>
                    </View>
                    <View>
                    {(picture === '') && (
                     <Avatar
                      size = {dimension.height*.08}
                      rounded
                      titleStyle={{backgroundColor: this.props.dashColor}}
                      overlayContainerStyle={{backgroundColor: "black"}}
                      title={item.firstName[0].concat(item.lastName[0])}
                      />
                    )}
                    {(picture !== '') && (
                      <Avatar
                      size = {dimension.height*.08}
                      rounded
                      source= {{uri: item.picture}}
                      />
                    )}
                    </View>
                  </View>
                  <View style={{flex: .2}}></View>
                  <View >
                    <Progress.Bar
                      style={progress}
                      progress={item.points / Math.max(sortedMembers[0].points,1)}
                      indeterminate={false}
                      height={dimension.width*.03}
                      width={dimension.width * .75}
                      color= {'#ffd700'}
                    />
                    </View>   
                </View>
                </View>
                <View style={{flex:.1}}></View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    // if(item.points !== 0){
      
    }

  viewBreakDown() {
    Actions.pointsBreakDown();
  }

  callUser(id){
    this.props.pageLoad();
    this.props.fetchMemberProfile(id);
    this.props.goToOtherProfile();
  }
  
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  screenBackground: {
    flex: 1,
    backgroundColor: '#0c0b0b',
  },
  curUserHighlight: {
    // backgroundColor: '#ffd70024',
    color: '#aa9100'
  },
  textStyle: {
    color: "#e0e6ed",
    fontSize: dimension.width * .05,
  },
  contentContainerStyle: {
    borderColor: "white",
    flex: 1,
    height: dimension.height*.18,
    backgroundColor: 'black',
  },
  progress: {
    // flex: 1,
    justifyContent: 'center',
    height: dimension.width*.03,
    borderColor: '#2C3239',
    backgroundColor: '#2C3239',
  },
  textColor: {
    color: '#e0e6ed'
  },
  	indexText: {
  	  alignSelf: 'center',
  	  fontWeight: "700",
  	  fontSize:  dimension.width*.05,
  	  color: "black"
  	},
  index: {
    borderColor: '#FECB00',
    backgroundColor: "#FECB00",
    borderRadius: dimension.height*.06*.5,
    marginRight: '4%',
    justifyContent: 'center',
    height: dimension.height*.06,
    width: dimension.height*.06,
    elevation: 1,
    alignItems: "center"
  }
});

const mapStateToProps = ({ user, members, general }) => {
  const { membersPoints, userList } = members;
  const { picture, id } = user
  const { filter } = general

  return { membersPoints, id, picture, filter, userList};
};

const mapDispatchToProps = {
  fetchMembersPoints,
  fetchMemberProfile,
  goToOtherProfile,
  pageLoad,
  getPrivilege,
  loadUser,
  filterChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
