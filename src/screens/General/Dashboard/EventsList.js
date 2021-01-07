import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { goToViewEvent } from "@/utils/router";
import { filterPastEvents, convertNumToDate } from "@/utils/events";
import { Icon } from "@/components";

const { width, height } = Dimensions.get("window");

export default class EventsList extends PureComponent {
	showEvents(event) {
		const { leaderboardArrow, eventTextContainer, eventItemInnerContainer, eventTextStyle, gold } = styles;
		const { name, date, committee, startTime, endTime, type } = event;

		return (
			<View style = { eventItemInnerContainer }>
				<View style = { eventTextContainer }>
					<Text style = { eventTextStyle }>{ committee || type }: { name }</Text>
					<Text style = { eventTextStyle }>
						{ convertNumToDate(date) } - { startTime } - { endTime }
					</Text>
				</View>
				<View style = { leaderboardArrow }>
					<Icon name = "ios-arrow-dropright" size = { height * 0.025 } style = { gold } />
				</View>
			</View>
		);
	}

	render() {
		const { textColor, eventListContainerFull, eventEmptyText, eventsItem } = styles;
		const { sortedEvents } = this.props;

		const events = filterPastEvents(sortedEvents) || [];

		return (
			<View style = { eventListContainerFull }>
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
		backgroundColor: "#21252b"
	},
	eventEmptyText: {
		fontSize: 20,
		textAlign: "center",
		padding: 20,
		height: 150
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
		height: 150,
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