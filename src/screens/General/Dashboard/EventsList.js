import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { goToViewEvent } from "../../../utils/router";
import { filterPastEvents } from "../../../utils/events";

const { width, height } = Dimensions.get("window");

export default class EventsList extends PureComponent {
	convertNumToDate(date) {
		let months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let [, month, day] = date.split("-");

		return `${months[Number(month) - 1]} ${day}`;
	}

	showEvents(event) {
		const { leaderboardArrow, eventTextContainer, eventItemInnerContainer, eventTextStyle, gold } = styles;
		const { name, date, committee, startTime, endTime, type } = event;

		return (
			<View style = { eventItemInnerContainer }>
				<View style = { eventTextContainer }>
					<Text style = { eventTextStyle }>{ committee || type }: { name }</Text>
					<Text style = { eventTextStyle }>
						{ this.convertNumToDate(date) } - { startTime } - { endTime }
					</Text>
				</View>
				<View style = { leaderboardArrow }>
					<Ionicons name = "ios-arrow-dropright" size = { height * 0.025 } style = { gold } />
				</View>
			</View>
		);
	}

	render() {
		const { textColor, eventListContainerFull, eventEmptyText, eventsItem } = styles;
		const { sortedEvents } = this.props;

		let singleContainer = {};
		const events = filterPastEvents(sortedEvents) || [];

		if (events.length < 2) singleContainer.flex = 0.4;

		return (
			<View style = { [eventListContainerFull, singleContainer] }>
				{ !events.length && <Text style = { [textColor, eventEmptyText ] }>No Upcoming Events</Text>
				|| events.slice(0, 3).map(event =>
					<TouchableOpacity
						style = { eventsItem }
						onPress = { () => { this.props.loadEvent(event); goToViewEvent("dashboard") } }
					>
						{ this.showEvents(event) }
					</TouchableOpacity>
				) }
			</View>
		);
	}
}

const styles = {
	eventListContainerFull: {
		backgroundColor: "#21252b",
		flex: 0.8
	},
	eventEmptyText: {
		fontSize: 20,
		textAlign: "center",
		padding: 20
	},
	eventsItem: {
		backgroundColor: "#21252b",
		flex: 1,
		borderBottomWidth: 5
	},
	leaderboardArrow: {
		color: "#FECB00",
		width: width * 0.06,
		alignItems: "center"
	},
	eventTextContainer: {
		flex: 1,
		alignItems: "flex-start",
		paddingLeft: 20
	},
	eventItemInnerContainer: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		paddingRight: 20
	},
	eventTextStyle: {
		color: "white",
		fontSize: width * 0.035
	},
	gold: {
		color: "#FECB00"
	},
	textColor: {
		color: "#e0e6ed"
	}
};