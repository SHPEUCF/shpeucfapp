import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Dimensions, TouchableOpacity, Modal, SafeAreaView } from "react-native";
import { Spinner, NavBar, Button } from "../components/general";
import { Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Agenda } from "react-native-calendars";
import {
	loadUser,
	pageLoad,
	fetchMembersPoints,
	fetchMemberProfile,
	fetchEvents,
	getPrivilege,
	updateElection,
	typeChanged,
	nameChanged,
	descriptionChanged,
	dateChanged,
	startTimeChanged,
	endTimeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
	goToViewEvent,
	getCommittees,
	setDashColor,
	setFlag,
	fetchAllUsers,
	getUserCommittees,
	committeeChanged,
	goToCreateEvent,
	pendingJoin,
	approveJoin,
	deleteMemberFromCom,
	loadCommittee,
	openJoin
} from "../ducks";

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
					<View style = {{ flex: 0.6, alignItems: "center", flexDirection: "row", justifyContent: "center", backgroundColor: "black" }}>
						{ /* {this.renderMemberStatus()}
	<View style= {{backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end"}}>
	<Ionicons name="ios-calendar" size={dimension.height * .03} onPress = {() => this.setState({visible: !this.state.visible})} style={{color: '#FECB00'}}/>
	</View> */ }
					</View>
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
				dashColor = { this.props.dashColor }
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
				items = { this.getFormattedEventList(this.props.eventList) }
				// Will only load items for visible month to improve performance later
				// loadItemsForMonth={this.loadItemsForMonth.bind(this)}
				renderItem = { (item) => this.renderItem(item) }
				rowHasChanged = { this.rowHasChanged.bind(this) }
				renderEmptyDate = { this.renderEmptyDate.bind(this) }
				renderEmptyData = { this.renderEmptyData.bind(this) }

				style = {{
					height: dimension.height * 0.73
				}}
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

	renderMemberStatus() {
		const {
			joinedMembers,
			pendingMembers,
			id,
			committeeTitle,
			joinOpened
		} = this.props;

		if (this.props.chair.id === this.props.id && this.joinOpened)
			return (
				<View style = {{ backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end" }}>
					<Ionicons name = "md-person-add" size = { dimension.height * 0.03 }
						onPress = { () => {
							this.props.openJoin(committeeTitle, true);
						} }
						style = {{ color: "#FECB00" }} />
				</View>
			);
		else if (this.props.chair.id === this.props.id)
			<View style = {{ backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end" }}>
				<Ionicons name = "md-add-circle" size = { dimension.height * 0.03 }
					onPress = { () => {
						this.props.openJoin(committeeTitle, false);
					} }
					style = {{ color: "#FECB00" }} />
			</View>;

		if (!joinedMembers && !pendingMembers)
			if (joinOpened) {
				return (
					<View style = {{ backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end" }}>
						<Ionicons name = "md-person-add" size = { dimension.height * 0.03 }
							onPress = { () => {
								this.props.pendingJoin(committeeTitle, id);
							} }
							style = {{ color: "#FECB00" }} />
					</View>
				);
			}
			else return null;

		if (!joinedMembers && joinOpened)
			return (
				<View style = {{ backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end" }}>
					<Ionicons name = "ios-alert" size = { dimension.height * 0.03 }
						onPress = { () => {
							this.props.pendingJoin(committeeTitle, id);
						} }
						style = {{ color: "#FECB00" }} />
				</View>
			);
		else if (!pendingMembers)
			if (joinedMembers[id] || joinedMembers[id]) {
				return (
					<View style = {{ backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end" }}>
						<Ionicons name = "ios-checkmark-circle" size = { dimension.height * 0.03 }
							onPress = { () => {
								alert("You're a committee member!");
							} }
							style = {{ color: "#FECB00" }} />
					</View>
				);
			}

		if (joinedMembers[id] || joinedMembers[id])
			return (
				<View style = {{ backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end" }}>
					<Ionicons name = "ios-checkmark-circle" size = { dimension.height * 0.03 }
						onPress = { () => {
							alert("You're a committee member!");
						} }
						style = {{ color: "#FECB00" }} />
				</View>
			);

		if (pendingMembers[id] || pendingMembers[id])
			return (
				<View style = {{ backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end" }}>
					<Ionicons name = "ios-alert" size = { dimension.height * 0.03 }
						onPress = { () => {
							alert("Pending Approval!");
						} }
						style = {{ color: "#FECB00" }} />
				</View>
			);
		else if (joinOpened)
			return (
				<View style = {{ backgroundColor: "black", justifyContent: "center", flex: 2, alignItems: "flex-end" }}>
					<Ionicons name = "md-person-add" size = { dimension.height * 0.03 }
						onPress = { () => {
							this.props.pendingJoin(committeeTitle, id);
						} }
						style = {{ color: "#FECB00" }} />
				</View>
			);
		else return null;
	}

	renderSelect() {
		if (this.props.chair.id === this.props.id)
			return (
				<View>
					{ this.renderButtons() }
					{ this.renderMembers(this.props.joinedMembers, "joined") }
					{ this.renderMembers(this.props.pendingMembers, "pending") }
				</View>
			);
		else return null;
	}

	renderButtons() {
		return (
			<View style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start" }}>
				<View style = {{ flex: 0.45 }}>
					<Button
						title = "Current Members"
						onPress = { () => {
							this.setState({ joined: true });
						} }
					/>
				</View>
				<View style = {{ flex: 0.45 }}>
					<Button
						title = "Pending Members"
						onPress = { () => {
							this.setState({ pending: true });
						} }
					/>
				</View>
			</View>);
	}

	renderMembers(members, status) {
		const {
			userList
		} = this.props;
		const {
			containerStyle,
			contentContainerStyle,
			textStyle
		} = styles;

		if (!members || Object.keys(members).length === 0)
			return;

		return (
			<Modal transparent = { true } visible = { this.state[status] }>
				<View>
					{ Object.keys(members).map(user =>
						<View style = { [contentContainerStyle] }>
							<View style = { containerStyle }>
								<View style = {{ flex: 0.1 }}></View>
								<View style = {{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
									<View style = {{ flex: 1 }}>
										<Text style = { [textStyle, { fontWeight: "bold" }] }>{ `${userList[user].firstName} ${userList[user].lastName}` }</Text>
									</View>
									<View style = {{ alignItems: "flex-end", flexDirection: "row", flex: 0.4 }}>
										<Ionicons
											onPress = { () => this.props.callUser(user.id) }
											name = { "ios-arrow-dropright-circle" }
											size = { dimension.height * 0.04 }
											color = { "#FECB00" }
										/>
										<View style = {{ flex: 0.2 }}></View>
										{ userList[user].picture === ""
	&& <Avatar
		size = { dimension.height * 0.08 }
		rounded
		titleStyle = {{ backgroundColor: this.props.dashColor }}
		overlayContainerStyle = {{ backgroundColor: "black" }}
		title = { userList[user].firstName[0].concat(userList[user].lastName[0]) }
	/>
										}
										{ user.picture !== ""
	&& <Avatar
		size = { dimension.height * 0.08 }
		rounded
		source = {{ uri: userList[user].picture }}
	/>
										}
									</View>
								</View>
								<View style = {{ flex: 0.1 }}></View>
							</View>
						</View>
					) }
				</View>
			</Modal>
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
		if (this.props.privilege && this.props.privilege.board && this.props.chair.id === this.props.id)

			return (
				<View style = {{ position: "absolute", bottom: dimension.height * 0.025, width: "100%" }}>
					<View style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
						<View style = {{ flex: 0.45 }}>
							<Button
								title = "Create Event"
								onPress = { () => {
									this.props.dateChanged(dateStr);
									this.props.goToCreateEvent(this.props.screen + "committeepage", { type: "Committee", committee: this.props.committeeTitle, points: 2 });
								} }
							/>
						</View>
						<View style = {{ flex: 0.45 }}>
							{ this.selectButton() }
						</View>
					</View>
				</View>
			);
		else
			return (
				<View style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * 0.025, width: "100%" }}>
					<View style = {{ flex: 0.3 }}></View>
					<View style = {{ flex: 1 }}>
						{ this.selectButton() }
					</View>
					<View style = {{ flex: 0.3 }}></View>
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

	renderPending() {
		if (!this.props.pendingMembers)
			return <Text style = {{ color: "white", fontSize: 16 }}>No Pending Members</Text>;

		return (
			<View>
				{ Object.keys(this.props.pendingMembers).map(item =>
					this.renderPendingMembers(item)
				) }
			</View>
		);
	}

	renderPendingMembers() {
		let user = this.props.userList[item];

		const {
			firstName,
			lastName
		} = user;

		return (
			<Text style = {{ color: "white", fontSize: 16 }}>Pending: { firstName } { lastName }</Text>
		);
	}

	renderGreeting() {
		if (this.props.chair.id === this.props.id)
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

	getFormattedEventList(eventList) {
		if (!this.props.committeeEvents || !this.props.eventList || !this.props.eventList)
			return {};

		let events = {};
		Object.keys(this.props.committeeEvents).forEach(function(element) {
			Object.assign(events, { [element]: eventList[element] });
		});

		let dates = {};

		for (let props in events) {
			if (!events[props]) continue;

			events[props]["eventID"] = props;
			if (!dates[events[props].date])
				dates[events[props].date] = [events[props]];
			else
				dates[events[props].date].push(events[props]);
		}

		return dates;
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
			<View style = { [emptyData, { backgroundColor: this.props.dashColor }] }>
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
		this.props.typeChanged(item.type);
		this.props.committeeChanged(item.committee);
		this.props.nameChanged(item.name);
		this.props.descriptionChanged(item.description);
		this.props.dateChanged(item.date);
		this.props.startTimeChanged(item.startTime);
		this.props.endTimeChanged(item.endTime);
		this.props.locationChanged(item.location);
		this.props.epointsChanged(item.points);
		this.props.eventIDChanged(item.eventID);
		this.props.goToViewEvent(this.props.screen + "committeepage");
	}

	renderItem(item) {
		const {
			textColor,
			itemContainer
		} = styles;

		return (
			<TouchableOpacity onPress = { () => this.viewEvent(item) }>
				<View style = { [itemContainer, { backgroundColor: this.props.dashColor }] }>
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
	const {
		firstName,
		id,
		dashColor,
		flag,
		userCommittees,
		privilege
	} = user;
	const {
		loading
	} = general;
	const {
		membersPoints,
		userList
	} = members;
	const {
		eventList
	} = events;
	const {
		election
	} = elect;
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
		firstName,
		id,
		loading,
		privilege,
		membersPoints,
		eventList,
		election,
		dashColor,
		flag,
		userCommittees,
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

const mapDispatchToProps = {
	loadUser,
	pageLoad,
	fetchMembersPoints,
	fetchMemberProfile,
	fetchEvents,
	getPrivilege,
	updateElection,
	typeChanged,
	nameChanged,
	descriptionChanged,
	dateChanged,
	startTimeChanged,
	endTimeChanged,
	locationChanged,
	epointsChanged,
	eventIDChanged,
	goToViewEvent,
	getCommittees,
	setDashColor,
	setFlag,
	fetchAllUsers,
	getUserCommittees,
	committeeChanged,
	goToCreateEvent,
	pendingJoin,
	approveJoin,
	deleteMemberFromCom,
	loadCommittee,
	openJoin
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitteePage);