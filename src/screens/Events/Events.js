import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonLayout, Form } from "../../components/";
import { Agenda } from "react-native-calendars";
import { goToViewEvent } from "../../utils/router";
import { formatEventList } from "../../utils/events";
import { loadEvent, createEvent } from "../../ducks";
import { upsertEventFormData } from "../../data/FormData";
import {
	TouchableOpacity,
	Text,
	View,
	ScrollView,
	Dimensions,
	SafeAreaView
} from "react-native";

const dimension = Dimensions.get("window");
let dateStr = "";
let initDate = "";

class Events extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "closed",
			day: new Date(),
			eventFormVisibility: false
	 };
	}

	componentDidMount() {
		dateStr = this.getTodaysDate();
		initDate = this.getTodaysDate();
	}

	getTodaysDate() {
		let date = new Date();
		let month = this.prepend0((date.getMonth() + 1).toString());
		let year = date.getFullYear();
		let day = this.prepend0(date.getDate().toString());
		return `${year}-${month}-${day}`;
	}

	static onRight = function() {
		this.alert(new Date());
	}

	prepend0(item) {
		return item < 10 ? "0" + item : item;
	}

	getDate(item) {
		dateStr = item.dateString;
	}

	chooseToday() {
		this.child.chooseToday();
	}

	render() {
		return (
			<SafeAreaView style = {{ flex: 1, backgroundColor: "#0c0b0b" }}>
				<View style = {{ backgroundColor: "black", flex: 1 }}>
					<Form
						elements = { upsertEventFormData }
						title = "Create Event"
						initialValues = { [{ camelCaseName: "date", value: this.getTodaysDate() }] }
						visible = { this.state.eventFormVisibility }
						changeVisibility = { (visible) => this.setState({ eventFormVisibility: visible }) }
						onSubmit = { (value) => createEvent(value) }
					/>
					<ScrollView style = {{ flex: 1 }}>
						<Agenda
							ref = { child => { this.child = child } } { ...this.props }
							selected = { this.state.day }
							// onDayChange={(day) => {alert('day pressed')}}
							setPos = { (stat) => this.setState({ status: stat }) }
							passDate = { (item) => this.getDate(item) }
							showWeekNumbers = { false }
							pastScrollRange = { 24 }
							futureScrollRange = { 24 }
							showScrollIndicator = { true }
							markedItems = { this.markedItems.bind(this) }
							items = { formatEventList(this.props.sortedEvents) }
							// Will only load items for visible month to improve performance later
							// loadItemsForMonth={this.loadItemsForMonth.bind(this)}
							renderItem = { (item) => this.renderItem(item) }
							rowHasChanged = { this.rowHasChanged.bind(this) }
							renderEmptyDate = { this.renderEmptyDate.bind(this) }
							renderEmptyData = { this.renderEmptyData.bind(this) }
							style = {{ height: dimension.height * 0.73 }}
							theme = {{
								backgroundColor: "black",
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
					<View style = {{ flex: 0.1 }}>
						{ initDate !== dateStr
						&& <TouchableOpacity
							style = {{ alignItems: "center", justifyContent: "flex-start", flex: 1 }}
							onPress = { () => this.chooseToday() }
						>
							<View style = {{ flex: 0.25 }}></View>
							<Text style = {{ color: "white", fontSize: 16 }}>
								Today
							</Text>
						</TouchableOpacity> }
					</View>
					{ this.renderButton() }
				</View>
			</SafeAreaView>
		);
	}

	selectButton() {
		if (this.state.status === "close")
			return (
				<Button
					title = "Open Calendar"
					onPress = { () => {
						this.child.onSnapAfterDrag("closed");
						this.setState({ status: "opened" });
					} }
				/>
			);
		else
			return (
				<Button
					title = "Close Calendar"
					onPress = { () => {
						this.child.onSnapAfterDrag("opened");
						this.setState({ status: "closed" });
					} }
				/>
			);
	}

	renderButton() {
		const { activeUser } = this.props;

		return (
			<ButtonLayout>
				{ activeUser.privilege && activeUser.privilege.board && <Button
					title = "Create Event"
					onPress = { () => this.setState({ eventFormVisibility: true }) }
				/> }
				{ this.selectButton() }
			</ButtonLayout>
		);
	}

	renderEmptyDate() {
		return <View></View>;
	}

	renderEmptyData() {
		const {
			textColor,
			emptyData
		} = styles;

		return (
			<View style = { [emptyData, { backgroundColor: this.props.activeUser.color }] }>
				<Text style = { textColor }>No events to display on this day</Text>
			</View>
		);
	}

	markedItems(items) {
		const markedItems = {};
		Object.keys(items).forEach(key => { markedItems[key] = { selected: true, marked: true } });

		return markedItems;
	}

	viewEvent(item) {
		this.props.loadEvent(item);
		goToViewEvent("events");
	}

	renderItem(item) {
		const {
			textColor,
			itemContainer
		} = styles;

		let viewName = item.type + ": " + item.name;
		if (item.committee)
			viewName = item.committee + ": " + item.name;

		return (
			<TouchableOpacity onPress = { this.viewEvent.bind(this, item) }>
				<View style = { [itemContainer, { backgroundColor: this.props.activeUser.color }] }>
					<Text style = { [{ fontWeight: "bold" }, textColor] }>{ viewName }</Text>
					<Text style = { textColor }>
						Time: { item.startTime } - { item.endTime }
					</Text>
					<Text style = { textColor }>Location: { item.location }</Text>
				</View>
			</TouchableOpacity>
		);
	}

	rowHasChanged(r1, r2) {
		return r1.name !== r2.name;
	}
}

const styles = {
	textColor: {
		color: "white"
	},
	itemContainer: {
		flex: 1,
		backgroundColor: "#21252b",
		borderRadius: 5,
		padding: dimension.height * 0.020,
		marginRight: dimension.height * 0.010,
		marginTop: dimension.height * 0.02
	},
	emptyData: {
		height: dimension.height * 0.15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#21252b",
		borderRadius: 5,
		marginTop: dimension.height * 0.017
	}
};

const mapStateToProps = ({ events, user }) => {
	const { sortedEvents } = events;
	const { activeUser } = user;

	return { sortedEvents, activeUser };
};

const mapDispatchToProps = { loadEvent };

export default connect(mapStateToProps, mapDispatchToProps)(Events);