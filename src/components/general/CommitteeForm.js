import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Input, Button, FilterPicker } from "../general";
import {
  addCommittee,
  editCommittee,
  committeeTitleChanged,
  committeeDescriptionChanged,
  deleteCommittee,
  chairChanged,
  fetchAllUsers,
  filterChanged,
  assignPosition
} from "../../ducks";

class CommitteeForm extends Component {
  // EventCreationError(text) {
  //     this.props.eventError(text);
  // }
  constructor(props) {
    super(props);
    this.state = { oldTitle: this.props.committeeTitle, oldChair: this.props.chair };
  }

  componentWillMount() {
    this.props.filterChanged("");
  }

  renderError() {
    if (this.props.error)
      return (
        <View>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
  }

  onButtonPress() {
    const { committeeTitle, committeeDescription, committeesList, chair } = this.props;

    let length =
      committeesList !== null && committeesList !== undefined ? Object.entries(committeesList).length : 0;

    let chairObj = { name: `${chair.firstName} ${chair.lastName}`, id: chair.id };

    if (committeeTitle === "") {
      // this.EventCreationError('Please enter a Candidate Name');
    } else if (committeeDescription === "") {
      // this.EventCreationError('Please enter a committee');
    } else {
      if (this.props.title === "ADD")
        this.props.addCommittee(committeeTitle, committeeDescription, chairObj, length);
      else {
        if (this.state.oldTitle !== committeeTitle)
          this.props.editCommittee(committeeTitle, committeeDescription, chairObj, this.state.oldTitle);
        else this.props.editCommittee(committeeTitle, committeeDescription, chairObj, null);
      }

      this.props.assignPosition(committeeTitle, "board", chair.id, this.state.oldChair);
      Actions.pop();
    }
  }

  render() {
    const { chair } = this.props;

    let placeholder;

    if (!this.props.chair) placeholder = "Director/Chairperson";
    else placeholder = chair.name;

    return (
      <View style={styles.formContainerStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>{this.props.title + " COMMITTEE"}</Text>
          {/* <Text style={styles.headerSubtitleStyle}>Registration</Text> */}
        </View>
        <ScrollView ref={ref => (this.scrollView = ref)} style={styles.scrollView}>
          {/* <RkAvoidKeyboard> */}
          <View>
            <Input
              placeholder="Committee Title"
              value={this.props.committeeTitle}
              onChangeText={this.props.committeeTitleChanged.bind(this)}
            />
            <Input
              placeholder="Committee Description"
              value={this.props.committeeDescription}
              onChangeText={this.props.committeeDescriptionChanged.bind(this)}
            />

            <FilterPicker
              title={"Chair"}
              type="Single"
              filter={this.props.filter}
              data={this.props.userList}
              placeholder={placeholder}
              onChangeText={this.props.filterChanged.bind(this)}
              onSelect={(item, index) => {
                this.props.chairChanged(item);
              }}
            />
          </View>
          {this.renderError()}
        </ScrollView>
        <Button
          title={this.props.title + " COMMITTEE"}
          onPress={() => {
            this.onButtonPress();
          }}
        />
        <Button title="CANCEL" onPress={() => Actions.pop()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E1E1E1", justifyContent: "flex-end" },
  formContainerStyle: {
    flex: 1,
    paddingTop: 30,
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "#2C3239"
  },
  headerStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginBottom: 10
  },
  headerTextStyle: { fontSize: 22, fontWeight: "bold", color: "#e0e6ed" },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: "center",
    color: "red",
    fontWeight: "bold",
    padding: 10
  },
  pickerTextInput: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  scrollView: { flex: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 10 }
});

const mapStateToProps = ({ committees, general, members }) => {
  const { filter } = general;
  const { userList } = members;
  const { committeeTitle, committeeDescription, title, committeesList, chair } = committees;
  return { committeeTitle, committeeDescription, title, committeesList, chair, filter, userList };
};

const mapDispatchToProps = {
  addCommittee,
  editCommittee,
  committeeTitleChanged,
  committeeDescriptionChanged,
  deleteCommittee,
  chairChanged,
  fetchAllUsers,
  filterChanged,
  assignPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitteeForm);
