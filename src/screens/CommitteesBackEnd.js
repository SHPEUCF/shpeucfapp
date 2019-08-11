import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Input, NavBar, SortableFlatList } from '../components/general';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {
  getCommittees, deleteCommittee, goToCommitteeForm, editCommittee, addCommittee, committeeDescriptionChanged, committeeTitleChanged, changeLevelsCom
} from '../actions';
import { Avatar } from 'react-native-elements';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  } from 'react-native';

  const dimension = Dimensions.get('window');
  const iteratees = ['level'];
  const order = ['asc'];

  class CommitteesBackEnd extends Component {
    constructor(props) {
        super(props);
        this.renderCommittees = this.renderCommittees.bind(this);
      }

  componentWillMount() {
    this.props.getCommittees();
  }

  state = {
    data: (_.orderBy(this.props.committees, iteratees, order)).map((d, index) => ({
      committee: d,
      key: `item-${index}`,
      label: index,
      backgroundColor: '#fff',
    }))
  }

  setLevels(){
    const {
      changeLevelsCom,
    } = this.props;

      changeLevelsCom(this.state.data);
  }

  viewCommittee(item) {
    this.props.committeeTitleChanged(item.title);
    this.props.committeeDescriptionChanged(item.description);
    this.props.goToCommitteeForm("EDIT");
  }
  
  renderCommittees( {item, index, move, moveEnd, isActive}) {
    const {
      containerStyle,
      contentContainerStyle,
      textColor
    } = styles;


    const color = (isActive) ? {backgroundColor: '#ffd70066'} : {backgroundColor: "#2C3239"}
    return (
      <TouchableOpacity
        style={[contentContainerStyle, color]}
        onLongPress={move}
        onPressOut={moveEnd}>
        <View style={containerStyle}>
          <Text style={textColor}>{item.committee.title}</Text>
        </View>
        <View style= {styles.buttonContainerStyle}>
          <TouchableOpacity onPress={() => this.viewCommittee(item.committee)}>
            <Ionicons style={textColor} name="md-create" size={40}/>
          </TouchableOpacity>
        </View>
        <View style= {styles.buttonContainerStyle}>
          <TouchableOpacity onPress={() => this.delete(item.committee)}>
            <Ionicons style={textColor} name="md-trash" size={40}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  
  }

  


  _keyExtractor = (item, index) => index;

  renderFlatlist(committees){
    return(
      <FlatList
          data={committees}
          extraData={this.props}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          this.renderCommittees(item)
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
      committees,
    } = this.props;

    const committeesArray = _.toArray(committees)

    return (
     <View style={page}>
        <NavBar title="Committees" back onBack={() => Actions.pop()} />

        {this.renderFlatlist(committeesArray)}

         <View style={buttonContainerStyling}>
            <Button
            onPress={() => {this.props.committeeTitleChanged("");
            this.props.committeeDescriptionChanged("");
            this.props.goToCommitteeForm("ADD");}}
            title={"ADD COMMITEES"}
            >
            </Button>
            </View>
        <View style={buttonContainerStyling}>
            <Button
            onPress={() => this.setLevels()}
            title={"SET ORDER"}
            >
            </Button>
        </View>
      </View>
    );
  };


  delete(committee){

    this.setState({
      data: this.state.data.filter(item => item.committee !== committee)
    })
    
    this.props.deleteCommittee(committee.title);
  }

  renderFlatlist(committees){
    return(
      <View style={{ flex: 1 }}>
      <SortableFlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          renderItem={this.renderCommittees}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ data })}
      />
      </View>
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
    backgroundColor: '#2C3239',

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
  textColor: {
    color: '#e0e6ed'
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
      margin: 5,
      justifyContent: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: '#0c0b0b',
  }
});
  
  const mapStateToProps = ({ general }) => {
    const { committees } = general;
  
    return { committees };
  };
  
  const mapDispatchToProps = {
    getCommittees,
    goToCommitteeForm,
    deleteCommittee,
    addCommittee,
    editCommittee,
    committeeDescriptionChanged,
    committeeTitleChanged,
    changeLevelsCom
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CommitteesBackEnd);