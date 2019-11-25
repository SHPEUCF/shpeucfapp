import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, NavBar } from "../components/general";
import { Agenda } from "react-native-calendars";
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  fetchEvents,
  getPrivilege,
  committeeChanged,
  typeChanged,
  nameChanged,
  descriptionChanged,
  dateChanged,
  timeChanged,
  locationChanged,
  epointsChanged,
  eventIDChanged,
  goToCreateEvent,
  goToViewEvent
} from "../ducks";

const dimension = Dimensions.get("window");
let dateStr = "";

class Events extends Component {
  componentDidMount() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();
    let stringDate = `${year}-${month}-${day}`;

    dateStr = stringDate;
  }

  static onRight = function() {
    this.alert(new Date());
  };

  getDate(item) {
    dateStr = item.dateString;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#0c0b0b" }}>
        <NavBar title="Events" />
        <ScrollView style={{ flex: 1 }}>
          <Agenda
            selected={new Date()}
            // onDayChange={(day)=>{alert('day pressed')}}
            passDate={item => this.getDate(item)}
            showWeekNumbers={true}
            pastScrollRange={24}
            futureScrollRange={24}
            showScrollIndicator={true}
            markedItems={this.markedItems.bind(this)}
            items={this.getFormattedEventList()}
            // Will only load items for visible month to improve performance later
            // loadItemsForMonth={this.loadItemsForMonth.bind(this)}
            renderItem={this.renderItem.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            renderEmptyData={this.renderEmptyData.bind(this)}
            style={{ height: dimension.height * 0.73 }}
            theme={{
              backgroundColor: "#0c0b0b",
              calendarBackground: "#21252b",
              agendaDayTextColor: "#fff",
              agendaDayNumColor: "#fff",
              dayTextColor: "#fff",
              monthTextColor: "#FECB00",
              textSectionTitleColor: "#FECB00",
              textDisabledColor: "#999",
              selectedDayTextColor: "#000",
              selectedDayBackgroundColor: "#FECB00",
              todayTextColor: "#44a1ff",
              textDayFontSize: 15,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              selectedDotColor: "black"
            }}
          />
        </ScrollView>
        <View style={{ flex: 0.1 }}>{this.renderButton()}</View>
      </View>
    );
  }

  renderButton() {
    if (this.props.privilege !== undefined && this.props.privilege.board) {
      this.props.nameChanged("");

      return (
        <Button
          title="CREATE EVENT"
          onPress={() => {
            this.props.dateChanged(dateStr);
            this.props.goToCreateEvent();
          }}
        />
      );
    }
  }

  getFormattedEventList() {
    let events = this.props.eventList;
    let dates = {};

    for (props in events) {
      events[props]["eventID"] = props;
      if (dates[events[props].date] === undefined) 
        dates[events[props].date] = [events[props]];
      else 
        dates[events[props].date].push(events[props]);
    }
    return dates;
  }

  renderEmptyDate() {
    return <View></View>;
  }

  renderEmptyData() {
    const { textColor, emptyData } = styles;
    return (
      <View style={emptyData}>
        <Text style={textColor}>No events to display on this day</Text>
      </View>
    );
  }

  markedItems() {
    const markedItems = {};
    Object.keys(items).forEach(key => {
      markedItems[key] = { selected: true, marked: true };
    });
    return markedItems;
  }

  viewEvent(item) {
    this.props.typeChanged(item.type);
    this.props.committeeChanged(item.committee);
    this.props.nameChanged(item.name);
    this.props.descriptionChanged(item.description);
    this.props.dateChanged(item.date);
    this.props.timeChanged(item.time);
    this.props.locationChanged(item.location);
    this.props.epointsChanged(item.points);
    this.props.eventIDChanged(item.eventID);
    this.props.goToViewEvent();
  }

  renderItem(item) {
    const { textColor, itemContainer } = styles;

    let viewName = item.name;
    if (item.committee !== "") 
      viewName = item.committee + ": " + item.name;

    return (
      <TouchableOpacity onPress={this.viewEvent.bind(this, item)}>
        <View style={itemContainer}>
          <Text style={[{ fontWeight: "bold" }, textColor]}>{viewName}</Text>
          <Text style={textColor}>Time: {item.time}</Text>
          <Text style={textColor}>Location: {item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "flex-start", 
    margin: 5 
  },
  textColor: { 
    color: "#e0e6ed" 
  },
  modalTextInput: {
    marginTop: dimension.height * 0.05,
    height: dimension.height * 0.091,
    textAlign: "center",
    width: dimension.width * 0.6,
    backgroundColor: "#FECB0022",
    borderColor: "#FECB00",
    borderRadius: dimension.height * 0.01,
    borderWidth: dimension.width * 0.01,
    borderStyle: "solid",
    fontWeight: "bold",
    fontSize: 60
  },
  modalContent: {
    height: dimension.height * 0.35,
    width: dimension.width * 0.8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    height: dimension.height,
    width: dimension.width,
    backgroundColor: "#000a"
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#21252b",
    borderRadius: 5,
    padding: dimension.height * 0.02,
    marginRight: dimension.height * 0.01,
    marginTop: dimension.height * 0.02
  },
  headerTextStyle: { 
    fontSize: 22, 
    fontWeight: "bold" 
  },
  emptyData: {
    height: dimension.height * 0.015,
    paddingTop: dimension.height * 0.03,
    paddingBottom: dimension.height * 0.04,
    marginRight: dimension.height * 0.01,
    marginLeft: dimension.height * 0.01,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#21252b",
    borderRadius: 5,
    marginTop: dimension.height * 0.017
  },
  description: {
    // marginTop: 7,
  }
});

const mapStateToProps = ({ events, user }) => {
  const { eventList } = events;
  const { privilege } = user;
  return { eventList, privilege };
};

const mapDispatchToProps = {
  fetchEvents,
  getPrivilege,
  committeeChanged,
  typeChanged,
  nameChanged,
  descriptionChanged,
  dateChanged,
  timeChanged,
  locationChanged,
  epointsChanged,
  eventIDChanged,
  goToCreateEvent,
  goToViewEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
