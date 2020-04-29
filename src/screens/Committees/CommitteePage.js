import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import { Spinner, NavBar, Button } from "../../components/general";
import { Actions } from "react-native-router-flux";
import { Agenda } from "../../components/general/calendar";
import { goToViewEvent } from "../../utils/router";
import { formatEventListForCalendar, filterEvents } from "../../utils/events";
import { loadCommittee, loadEvent } from "../../ducks";

const dimension = Dimensions.get("window");
let dateStr = "";
let initDate = "";

class CommitteePage extends Component {
	constructor(props) {
		super(props);
		this.state = { status: "closed",
			day: new Date(),
			visible: true,
			pending: false,
			joined: false,
			update: false };
	}

	chooseToday() {
		this.child.chooseToday();
	}

	componentDidMount() {
		let date = new Date();
		let month = this.prepend0((date.getMonth() + 1).toString());
		let year = date.getFullYear();
		let day = this.prepend0(date.getDate().toString());
		let stringDate = `${year}-${month}-${day}`;
		dateStr = stringDate;
		initDate = stringDate;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.committeesList !== this.props.committeesList)
			this.props.loadCommittee(this.props.committeesList[this.props.committeeTitle]);
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

	render() {
		return this.props.loading ? <Spinner /> : this.renderContent();
	}

	_keyExtractor = (item, index) => index;

	renderContent() {
		return (
			<SafeAreaView style = {{ flex: 1, backgroundColor: "#0c0b0b" }}>
				<View style = {{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "black", paddingRight: "10%" }}>
					<NavBar title = { this.props.committeeTitle } back onBack = { () => Actions.pop() } />
				</View>
				<View style = {{ flex: 1, backgroundColor: "#535C68" }}>
					<View style = {{ flex: 1, height: dimension.height * 1.1 }}>
						<View style = {{ height: dimension.height * 0.09, justifyContent: "center" }}>
							{ this.renderGreeting() }
						</View>
						{ this.state.visible
							&& <View style = {{ backgroundColor: "black", flex: 0.95, marginLeft: "3%", marginRight: "3%" }}>
								<View style = {{ flex: 1 }}>
									<Agenda
										selected = { this.state.day }
										passDate = { (item) => dateStr = item.dateString }
										items = { formatEventListForCalendar(
											filterEvents(
												Object.keys(this.props.committeeEvents || {}),
												this.props.sortedEvents
											)
										) }
										style = {{ height: dimension.height * 0.73 }}
									/>
								</View>
								<View style = {{ flex: 0.1, borderTopWidth: 2, borderColor: "#535C68" }}>
									{ initDate !== dateStr && <TouchableOpacity style = {{ alignItems: "center", justifyContent: "flex-start", flex: 1 }} onPress = { () => this.chooseToday() }>
										<View style = {{ flex: 0.25 }}></View>
										<Text style = {{ color: "white", fontSize: 16 }}>
											Today
										</Text>
									</TouchableOpacity> }
								</View>
								<View style = {{ flex: 0.1 }}>
									{ this.renderButton() }
								</View>
							</View> }
						<View style = {{ flex: 0.05 }}></View>
						{ /* {this.renderSelect()} */ }
						<View style = {{ flex: 0.05 }}></View>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	selectButton() {
		if (this.state.status === "closed")

			return <Button
				title = "Open Calendar"
				onPress = { () => {
					this.child.onSnapAfterDrag("closed");
					this.setState({ status: "opened" });
				} }
			/>;
		else
			return <Button
				title = "Close Calendar"
				onPress = { () => {
					this.child.onSnapAfterDrag("opened");
					this.setState({ status: "closed" });
				} }
			/>;
	}

	renderButton() {
		return (
			<View style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * 0.025, width: "100%" }}>
				<View style = {{ flex: 1, marginHorizontal: "25%" }}>
					{ this.selectButton() }
				</View>
			</View>
		);
	}

	renderJoinedMembers(item) {
		let user = this.props.userList[item];

		const {
			firstName,
			lastName
		} = user;

		return (
			<Text style = {{ color: "white", fontSize: 16 }}>{ firstName } { lastName }</Text>
		);
	}

	renderGreeting() {
		if (this.props.chair.id === this.props.activeUser.id)
			return (
				<View style = {{ alignItems: "center", flex: 1, justifyContent: "center" }}>
					<Text style = {{ color: "white", fontSize: 16 }}>Welcome to Your Committee!</Text>
				</View>
			);
		else
			return (
				<View style = {{ alignItems: "center", flex: 1, justifyContent: "center" }}>
					<Text style = {{ color: "white", fontSize: 16 }}>Welcome to the { this.props.committeeTitle } Committee!</Text>
					<Text style = {{ color: "white", fontSize: 16 }}>Current Director: { this.props.chair.name }</Text>
				</View>
			);
	}

	renderLinks() {
		if (!this.props.links || !this.props.links)
			return <Text style = {{ color: "white", fontSize: 16 }}>No Current Links</Text>;

		return (
			<View>
				{ Object.keys(this.props.links).map(() => <View></View>) }
			</View>
		);
	}

	renderEmptyDate() {
		return (
			<View>
			</View>
		);
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

	markedItems() {
		const markedItems = {};
		Object.keys(items).forEach(key => { markedItems[key] = { selected: true, marked: true } });

		return markedItems;
	}

	viewEvent(item) {
		loadEvent(item);
		goToViewEvent(this.props.screen + "committeepage");
	}

	renderItem(item) {
		const {
			textColor,
			itemContainer
		} = styles;

		return (
			<TouchableOpacity onPress = { () => this.viewEvent(item) }>
				<View style = { [itemContainer, { backgroundColor: this.props.activeUser.color }] }>
					<Text style = { [{ fontWeight: "bold" }, textColor] }>{ item.name }</Text>
					<Text style = { textColor }>Time: { this.convertHour(item.startTime) } - { this.convertHour(item.endTime) }</Text>
					<Text style = { textColor }>Location: { item.location }</Text>
				</View>
			</TouchableOpacity>
		);
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

	rowHasChanged(r1, r2) {
		return r1.name !== r2.name;
	}
}

const styles = {
	page: {
		flex: 1,
		backgroundColor: "#0c0b0b"
	},
	greetingContainerStyle: {
		paddingLeft: "4%",
		justifyContent: "center",
		flex: 0.12,
		flexDirection: "row"
	},
	textColor: {
		color: "#e0e6ed"
	},
	contentContainerStyle: {
		flexDirection: "row",
		alignItems: "center"
	},
	ContainerStyle: {
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "#FECB00",
		width: dimension.height * 0.07,
		height: dimension.height * 0.07,
		borderRadius: 15,
		paddingBottom: "7%",
		marginBottom: "2%",
		marginLeft: "2%",
		marginRight: "2%",
		borderWidth: 1,
		borderColor: "black"
	},
	mainContentStyle: {
		backgroundColor: "black",
		flexDirection: "column",
		flex: 1
	},
	progress: {
		width: dimension.width * 0.2,
		justifyContent: "center"
	},
	title: {
		fontSize: 18,
		fontWeight: "500"
	},
	webTitle: {
		fontSize: 18,
		fontWeight: "500"
	},
	touchLeaderboard: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-evenly",
		borderColor: "white"
	},
	modalContent: {
		height: dimension.height * 0.5,
		width: dimension.width * 0.8,
		padding: dimension.height * 0.008,
		backgroundColor: "#21252b",
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
	touchCommittee: {
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "black"
	},
	index: {
		color: "#000",
		borderColor: "#FECB00",
		backgroundColor: "#FECB00",
		borderStyle: "solid",
		borderRadius: dimension.height * 0.04 * 0.5,
		justifyContent: "center",
		alignItems: "center",
		height: dimension.height * 0.04,
		width: dimension.height * 0.04
	},
	indexText: {
		fontWeight: "700",
		fontSize: 20,
		color: "black"
	},
	modalText: {
		textAlign: "center",
		fontSize: 16
	},
	modalTextInput: {
		height: 80,
		textAlign: "center",
		width: dimension.width * 0.6,
		backgroundColor: "#e0e6ed22",
		borderColor: "#e0e6ed",
		borderRadius: 16,
		borderWidth: 3,
		borderStyle: "solid",
		fontWeight: "bold",
		fontSize: 60,
		color: "#E0E6ED"
	},
	eventsContainer: {
		flex: 1,
		flexDirection: "column"
	},
	containerTextStyle: {
		flex: 3,
		justifyContent: "center",
		alignItems: "flex-start",
		paddingVertical: 10,
		paddingHorizontal: 15
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

const mapStateToProps = ({ user, general, members, events, elect, committees }) => {
	const { activeUser } = user;
	const { loading } = general;
	const { membersPoints, userList } = members;
	const { sortedEvents } = events;
	const { election } = elect;
	const {
		committeeTitle,
		committeeEvents,
		chair,
		description,
		pendingMembers,
		joinedMembers,
		links,
		joinOpened,
		committeesList
	} = committees;

	return {
		activeUser,
		loading,
		membersPoints,
		sortedEvents,
		election,
		committeeEvents,
		committeeTitle,
		chair,
		description,
		pendingMembers,
		joinedMembers,
		links,
		userList,
		joinOpened,
		committeesList };
};

const mapDispatchToProps = { loadCommittee };

export default connect(mapStateToProps, mapDispatchToProps)(CommitteePage);