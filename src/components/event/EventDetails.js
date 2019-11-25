import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  Linking
} from "react-native";
import { Button, NavBar, FilterPicker } from "../general";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  goToCreateEvent,
  goToCreateEventFromEdit,
  fetchCode,
  goToEvents,
  deleteEvents,
  getPrivilege,
  checkIn,
  openCheckIn,
  closeCheckIn,
  pageLoad,
  convertNumToDate,
  fetchAllUsers,
  emailListUsers,
  filterChanged
} from "../../ducks";
import { Actions } from "react-native-router-flux";
import QRCode from "react-native-qrcode-svg";
import QRCodeScanner from "react-native-qrcode-scanner";

const dimension = Dimensions.get("screen");

class EventDetails extends Component {
  componentWillMount() {
    this.props.filterChanged("");
    {
      this.setState({ modalVisible: false, pickerVisible: false });
    }
    this.props.fetchCode(this.props.eventID);
    if (this.props.privilege !== undefined && this.props.privilege.board) this.props.fetchAllUsers();
  }

  convertNumToDate(date) {
    let months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    temp_date = date.split("-");
    return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}`;
  }

  onSuccess = e => {
    if (this.props.code === e.data) 
      this.checkinButton(this.props.eventID, this.props.points);
    else 
      alert("Incorrect Code");
  };

  renderCodeBox() {
    const { modalBackground, modalContent, modalText, textColor } = styles;

    if (this.props.privilege !== undefined && this.props.privilege.board) {
      return (
        <Modal transparent={true} visible={this.state.modalVisible}>
          <View style={modalBackground}>
            <View style={modalContent}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.props.closeCheckIn(this.props.eventID);
                }}>
                <Text style={{ color: "#FECB00" }}>X</Text>
              </TouchableOpacity>
              <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                <Text style={[modalText, textColor]}>The event check-in is now open!</Text>
                <Text style={[modalText, textColor]}>Please provide everyone the code</Text>
              </View>
              <View style={{ alignItems: "center", flex: 2, justifyContent: "center" }}>
                <QRCode value={this.props.code} size={300} />
              </View>
              <View style={{ paddingTop: 20 }}>
                <Text style={[modalText, textColor]}>When you close this box the event check-in will close</Text>
              </View>
            </View>
          </View>
        </Modal>
      );
    } 
    else
      return (
        <Modal
          transparent={true}
          animationType={"fade"}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
          visible={this.state.modalVisible}>
          <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center" }}>
            <View style={{ flex: 0.91 }}>
              <QRCodeScanner onRead={this.onSuccess} fadeIn={false} />
            </View>
            <View style={{ flex: 0.09 }}>
              <Button title="DONE" onPress={() => this.setState({ modalVisible: false })} />
            </View>
          </View>
        </Modal>
      );
  }

  renderComponent(item) {
    const { textColor } = styles;

    if (this.props.userList !== undefined && this.props.userList[item] !== undefined) {
      const { firstName, lastName } = this.props.userList[item];
      return (
        <View style={{ flex: 1 }}>
          <Text style={[{ fontSize: 16, alignSelf: "center" }, textColor]}>
            {firstName} {lastName}
          </Text>
        </View>
      );
    }
  }

  convertArrayOfObjectsToCSV(args) {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) return null;

    columnDelimiter = args.columnDelimiter || ",";
    lineDelimiter = args.lineDelimiter || "\n";

    keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter;

        result += String(item[key])
          .replace("&", "and")
          .replace("\n", " ");
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  sendListToMail(attendants) {
    const { privilege, userList, name } = this.props;

    let users = [];
    const email = userList[privilege.id].email;
    attendants.map(attendant => {
      users.push(userList[attendant]);
    });

    let csv = this.convertArrayOfObjectsToCSV({ data: users });

    if (csv === null) return;

    filename = `${name}.csv` || "export.csv";

    data =
      `Instructions: \n1.Open a plain text Editor(Not microsoft Word)\n2.Copy everything under the line and paste it into the text editor\n3.save the file and change the extension to .csv(Look up how to do this if you dont know how)\n` +
      `4.Open the file in either Numbers or Excel\n------------------\n\n` + csv;
    let link = `mailto:${email}?subject=event: ${name}&body=` + data;

    if (!Linking.canOpenURL(link)) 
      alert("Email could not be sent", "Failure");
    else {
      Linking.openURL(link);
      alert("Email app should be Opened");
    }
  }

  renderAttendance() {
    const { privilege, eventList, eventID } = this.props;
    const { lineOnTop, attendance, attendanceContainer, icon, textColor } = styles;

    if (privilege !== undefined && privilege.board === true && eventList !== undefined &&
      eventList[eventID] !== undefined && eventList[eventID].attendance !== undefined) {
      let attendants = Object.keys(eventList[eventID].attendance);

      return (
        <View style={[{ flex: 1, flexDirection: "column" }, lineOnTop]}>
          <View style={attendanceContainer}>
            <View style={{ flex: 0.5 }} />
            <Text style={[attendance, textColor]}>Attendance</Text>
            <Ionicons
              style={[icon, { alignSelf: "center" }, textColor]}
              name="md-mail"
              size={35}
              color="e0e6ed"
              onPress={() => this.sendListToMail(attendants)}
            />
          </View>
          <FlatList
            data={attendants}
            extraData={this.state}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            renderItem={({ item, separators }) => this.renderComponent(item)}
          />
        </View>
      );
    }
  }

  openCheckInButton() {
    this.props.openCheckIn(this.props.eventID);
    this.setState({ modalVisible: true });
  }

  deleteButton() {
    this.props.deleteEvents(this.props.eventID);
    Actions.pop();
  }

  checkinButton(ID, points) {
    this.props.checkIn(ID, points, null);
  }

  renderPickMembers() {
    const { filter, userList, eventList, eventID, filterChanged } = this.props;
    if (!this.state.pickerVisible) 
      return null;

    return (
      <View>
        <FilterPicker
          title={"Members"}
          filter={filter}
          type="Multiple"
          data={userList}
          excludeData={eventList[eventID].attendance}
          onChangeText={filterChanged.bind(this)}
          onClose={() => {
            this.setState({ pickerVisible: false });
          }}
          onSelect={selectedUsers => {
            this.checkInMembers(selectedUsers);
            this.setState({ pickerVisible: false });
          }}
        />
      </View>
    );
  }

  checkInMembers(selectedUsers) {
    const { checkIn, eventID, points } = this.props;

    let userArr = Object.values(selectedUsers);
    userArr.forEach(function(userID) {
      checkIn(eventID, points, userID);
    });
  }

  renderButtons() {
    if (this.props.privilege !== undefined && this.props.privilege.board === true) {
      return (
        <View>
          <Button title="OPEN CHECK-IN" onPress={this.openCheckInButton.bind(this)} />
          <Button title="CHECK MEMBERS IN" onPress={() => this.setState({ pickerVisible: true })} />
          <Button title="DELETE EVENT" onPress={this.deleteButton.bind(this)} />
          <Button title="EDIT EVENT" onPress={this.props.goToCreateEventFromEdit.bind(this)} />
        </View>
      );
    } 
    else {
      return (
        <View>
          <Button
            title="CHECK IN"
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          />
        </View>
      );
    }
  }

  render() {
    if (this.props.loading)
      return <Spinner />;
    
    else {
      const { name, description, date, time, location } = this.props;
      const { page, container, icon_container, icon, text, textColor, final } = styles;
      let iconSize = 25;

      return (
        <View style={page}>
          <NavBar title={name} back onBack={() => Actions.pop()} />
          {this.renderPickMembers()}
          <View style={container}>
            <View style={icon_container}>
              <Ionicons style={[icon, textColor]} name="md-time" size={iconSize} color="#000000" />
              <Text style={[text, textColor]}>
                {this.convertNumToDate(date)} {time}
              </Text>
            </View>
            <View style={icon_container}>
              <Ionicons style={[icon, textColor]} name="md-pin" size={iconSize} color="#000000" />
              <Text style={[text, textColor]}>{location}</Text>
            </View>
            <View style={[icon_container, { flex: 0.7 }]}>
              <Ionicons style={[icon, textColor]} name="md-list" size={iconSize} color="#000000" />
              <Text style={[text, textColor]}>{description}</Text>
            </View>
            <View style={[icon_container, final]}>{this.renderAttendance()}</View>
          </View>
          {this.renderButtons()}
          {this.renderCodeBox()}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  itemStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderBottomColor: '#0002',
    borderBottomWidth: 1
  },
  itemTextStyle: {
    paddingTop: dimension.height * .03,
    paddingBottom: dimension.height * .03,
    flex: 1,
    fontSize: 16,
    alignSelf:'center'
  },
  formContainerStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: '#21252b'
  },
  headerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10
  },
  headerTextStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e0e6ed'
  },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
    padding: 10
  },
  pickerTextInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flex: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10
  },
  titleStyle: {
    flex: .13,
    alignSelf: 'center',
    fontSize: 20
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'center'
  },
  flatlistStyle: {
    flex: .8
  },
  buttonContainer:{
    flex:.2,
    flexDirection: 'row',
    borderTopColor: '#0001',
    borderTopWidth: 1
  },
  textStyle:{
    flex: 1,
    alignSelf: 'center',
    fontSize: 18,
    paddingTop: 5
  },
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0003',
    margin: 0,
    height: dimension.height,
    width: dimension.width
  },
  modalStyle: {
    height: dimension.height*.4,
    width: dimension.width*.8,
    backgroundColor:'#fff',
    padding: 12,
    borderRadius: 12
  },
});

const mapStateToProps = ({ events, user, members, general }) => {
  const { type, name, description, date, time, location, points, eventID, error, code, eventList } = events;
  const { privilege } = user;
  const { userList } = members;
  const { filter } = general;

  return {
    type,
    name,
    description,
    date,
    time,
    location,
    points,
    eventID,
    error,
    privilege,
    code,
    eventList,
    userList,
    filter
  };
};

const mapDispatchToProps = {
  goToCreateEvent,
  goToCreateEventFromEdit,
  fetchCode,
  goToEvents,
  deleteEvents,
  getPrivilege,
  checkIn,
  openCheckIn,
  closeCheckIn,
  pageLoad,
  convertNumToDate,
  fetchAllUsers,
  emailListUsers,
  filterChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
