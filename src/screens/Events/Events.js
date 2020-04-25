import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonLayout, Agenda } from "../../components/general";
import {
	View,
	Dimensions,
	SafeAreaView
} from "react-native";
import {
	fetchEvents,
	getPrivilege,
	committeeChanged,
	typeChanged,
	nameChanged,
	descriptionChanged,
	dateChanged,
	startTimeChanged,
	endTimeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
	goToCreateEvent,
	goToViewEvent
} from "../../ducks";

const dimension = Dimensions.get("window");
let dateStr = "";

class Events extends Component {
	constructor(props) {
		super(props);
		this.state = { status: "closed", day: new Date() };
	}

	componentDidMount() {
		let date = new Date();
		let month = this.prepend0((date.getMonth() + 1).toString());
		let year = date.getFullYear();
		let day = this.prepend0(date.getDate().toString());
		let stringDate = `${year}-${month}-${day}`;

		dateStr = stringDate;
	}

	static onRight = function() {
		this.alert(new Date());
	}

	prepend0(item) {
		return item < 10 ? "0" + item : item;
	}

	render() {
		return (
			<SafeAreaView style = {{ flex: 1, backgroundColor: "#0c0b0b" }}>
				<View style = {{ backgroundColor: "black", flex: 1 }}>
					<View style = {{ flex: 1 }}>
						<Agenda
							selected = { this.state.day }
							passDate = { (item) => dateStr = item.dateString }
							items = { this.getFormattedEventList() }
							style = {{ height: dimension.height * 0.73 }}
						/>
					</View>
					{ this.renderButton() }
				</View>
			</SafeAreaView>
		);
	}

	renderButton() {
		return (
			<ButtonLayout>
				{ this.props.privilege && this.props.privilege.board && <Button
					title = "Create Event"
					onPress = { () => {
						this.props.dateChanged(dateStr);
						this.props.goToCreateEvent("events");
					} }
				/> }
			</ButtonLayout>
		);
	}

	getFormattedEventList() {
		let events = this.props.eventList;
		let dates = {};

		for (let props in events) {
			events[props]["eventID"] = props;
			if (!dates[events[props].date])
				dates[events[props].date] = [events[props]];
			else
				dates[events[props].date].push(events[props]);
		}
		return dates;
	}

	convertHour(time) {
		let array = time.split(":");
		let hour;

		if (array[2] === "AM") {
			hour = "" + parseInt(array[0]);
			if (hour === "0") hour = "12";

			return hour + ":" + array[1] + ":" + array[2];
		}
		hour = "" + (parseInt(array[0]) - 12);
		if (hour === "0") hour = "12";

		return hour + ":" + array[1] + ":" + array[2];
	}
}

const mapStateToProps = ({ events, user }) => {
	const {
		eventList
	} = events;
	const {
		privilege,
		dashColor
	} = user;

	return { eventList, privilege, dashColor };
};

const mapDispatchToProps = {
	fetchEvents,
	getPrivilege,
	committeeChanged,
	typeChanged,
	nameChanged,
	descriptionChanged,
	dateChanged,
	startTimeChanged,
	endTimeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
	goToCreateEvent,
	goToViewEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);