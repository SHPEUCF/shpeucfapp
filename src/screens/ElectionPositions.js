import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions } from 'react-native';
import { Button, SortableFlatList, NavBar } from '../components/general'
import {
    openElection,
    closeElection,
    deletePosition,
    goToPositionForm,
    getPositions,
    positionDescriptionChanged,
    positionTitleChanged,
    changeLevels
} from '../ducks'

const dimension = Dimensions.get('window');
const iteratees = ['level'];
const order = ['asc'];

class ElectionPosition extends Component {
  constructor(props) {
    super(props);
    this.renderPositions = this.renderPositions.bind(this);
  }

  componentDidMount() {
      this.props.getPositions();
  }

  state = {
    data: (_.orderBy(this.props.positions, iteratees, order)).map((d, index) => ({
      position: d,
      key: `item-${index}`,
      label: index,
      backgroundColor: '#fff',
    }))
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

    return (
     <View style={page}>
        <NavBar title="Positions" back onBack={() => Actions.pop()} />

        {this.renderFlatlist(positionsArray)}

         <View style={buttonContainerStyling}>
            <Button
            onPress={() => {this.props.positionTitleChanged("");
            this.props.positionDescriptionChanged("");
            this.props.goToPositionForm("ADD");}}
            title={"ADD POSITIONS"}
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

  setLevels(){
    const {
      changeLevels,
    } = this.props;

      changeLevels(this.state.data);
  }

  renderPositions({ item, index, move, moveEnd, isActive }) {
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
          <Text style={textColor}>{item.position.title}</Text>
        </View>
        <View style= {styles.buttonContainerStyle}>
          <TouchableOpacity onPress={() => this.viewPosition(item.position)}>
            <Ionicons style={textColor} name="md-create" size={40}/>
          </TouchableOpacity>
        </View>
        <View style= {styles.buttonContainerStyle}>
          <TouchableOpacity onPress={() => this.delete(item.position)}>
            <Ionicons style={textColor} name="md-trash" size={40}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  viewPosition(item) {
    this.props.positionTitleChanged(item.title);
    this.props.positionDescriptionChanged(item.description);
    this.props.goToPositionForm("EDIT");
  }

  delete(position){

    this.setState({
      data: this.state.data.filter(item => item.position !== position)
    })
    
    this.props.deletePosition(position.title);
  }


  renderFlatlist(positions){
    return(
      <View style={{ flex: 1 }}>
      <SortableFlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          renderItem={this.renderPositions}
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

const mapStateToProps = ({ elect }) => {
    const { election, positions } = elect

    return { election, positions };
};

const mapDispatchToProps = {
    openElection,
    closeElection,
    deletePosition,
    goToPositionForm,
    getPositions,
    positionDescriptionChanged,
    positionTitleChanged,
    changeLevels
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionPosition);