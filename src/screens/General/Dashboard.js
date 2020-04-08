import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import _ from "lodash";
import { Spinner, Button } from "../../components/general";
import { Actions } from "react-native-router-flux";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Flag from "react-native-flags";
import { ColorPicker } from "react-native-color-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
	Text,
	View,
	ScrollView,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Linking,
	Modal,
	SafeAreaView,
	StatusBar
} from "react-native";
import {
	loadUser,
	pageLoad,
	fetchMembersPoints,
	fetchEvents,
	getPrivilege,
	typeChanged,
	committeeChanged,
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
	loadCommittee,
	changeUserCommittees,
	updateElection
} from "../../ducks";

const dimension = Dimensions.get("window");
const iteratees = ["points", "lastName", "firstName"];
const order = ["desc", "asc", "asc"];

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colorPickerVisible: false,
			flagsVisible: false,
			customFlagVisible: false,
			customFlagText: ""
		};
	}

	didBlurSubscription = this.props.navigation.addListener("didBlur",
		() => { this.setState({ refresh: true }) }
	);

	componentDidMount() {
		this.props.pageLoad();
		this.props.updateElection();
		this.props.getCommittees();
		this.props.fetchMembersPoints();
		this.props.fetchEvents();
		this.props.getPrivilege();
		this.props.loadUser();
		this.props.fetchAllUsers();
	}

	render() {
		return this.props.loading ? <Spinner /> : this.renderContent();
	}

	renderContent() {
		const {
			page,
			title,
			textColor,
			dashCommitteesContainer,
			innerScrollContainer,
			dashboardContent
		} = styles;

		let upcomingEventsContainter = {
			alignItems: "center",
			flex: 0.2,
			justifyContent: "center"
		 };

		return (
			<SafeAreaView style = { page }>
				<StatusBar backgroundColor = "#0c0b0b" barStyle = "light-content" />
				{ this.renderColorPicker() }
				<ScrollView>
					<View style = { innerScrollContainer }>
						{ this.renderHeader() }
						<View style = { dashboardContent }>
							<View style = {{ flex: 0.1, flexDirection: "row" }}></View>
							<View style = { upcomingEventsContainter }>
								<Text style = { [title, textColor] }>Upcoming Events</Text>
							</View>
							{ this.getFormattedEventList() }
							<View style = {{ flex: 0.03, flexDirection: "row" }}></View>
							<View style = { dashCommitteesContainer }>
								{ this.renderLeaderboard() }
								<View style = {{ flex: 0.05 }}></View>
								{ this.renderCommitteePanel() }
							</View>
						</View>
						{ this.renderButtonLinks() }
					</View>
				</ScrollView>
				{ this.renderFlags() }
				{ this.rendercustomFlag() }
			</SafeAreaView>
		);
	}

	renderHeader() {
		const {
			headerContainer,
			headerOptionsContainer
		} = styles;

		let dashColor = { backgroundColor: this.props.dashColor };
		let chevronColor = { color: "white" };

		return (
			<View style = { [headerContainer, dashColor ] }>
				{ this.renderGreeting() }
				<View style = { headerOptionsContainer }>
					{ this.renderHeaderFlag() }
					<FontAwesomeIcon
						style = { chevronColor }
						name = "chevron-down"
						onPress = { () => this.setState({ colorPickerVisible: true }) }
						size = { 15 }
					/>
				</View>
			</View>
		);
	}

	renderGreeting() {
		const {
			textColor,
			greetingContainer
		} = styles;

		const months = ["January", "February", "March", "April", "May", "June", "July",
			"August", "September", "October", "November", "December"];
		const date = new Date();
		let time = date.getHours();
		let day = date.getDate();
		let month = date.getMonth();
		let greeting = time >= 12 ? "Good evening" : "Good morning";

		return (
			<View style = { greetingContainer }>
				<Text style = { [textColor, { fontSize: 20 }] }>{ greeting }, { this.props.firstName }.</Text>
				<Text style = { textColor }>Today is { months[month] } { day }</Text>
			</View>
		);
	}

	renderHeaderFlag() {
		return (
			<View>
				<TouchableOpacity onPress = { () => this.setState({ flagsVisible: !this.state.flagsVisible }) } >
					<Flag
						type = "flat"
						code = { this.props.flag }
						size = { 32 }
					/>
				</TouchableOpacity>
			</View>
		);
	}

	flagPicked(flag) {
		if (flag === "") {
			this.setState({ flagsVisible: false, customFlagVisible: true });
		}
		else {
			this.props.setFlag(flag);
			this.setState({ flagsVisible: false });
		}
	}

	renderColorPicker() {
		let modalColor = { backgroundColor: "transparent" };
		let pickerColor = { backgroundColor: "black" };

		return (
			<Modal visible = { this.state.colorPickerVisible } transparent = { true }>
				<View style = { [styles.modalBackground, modalColor] }>
					<ColorPicker
						defaultColor = "#21252b"
						oldColor = { this.props.dashColor }
						onColorSelected = { color => this.colorPicked(color) }
						style = { [styles.modalContent, pickerColor] }
					/>
				</View>
			</Modal>
		);
	}

	colorPicked(color) {
		this.props.setDashColor(color);
		this.setState({ colorPickerVisible: false });
	}

	renderLeaderboard() {
		const {
			title,
			leaderboardContent,
			textColor,
			indexText,
			index,
			leaderboardContainer,
			leaderboardContentDivider,
			leaderboardDividerLine,
			leaderboardArrow
		} = styles;

		let memberObj = this.calculateRankings();

		const {
			sortedMembers,
			currentMember
		} = memberObj;

		if (!currentMember) return null;

		return (
			<TouchableOpacity style = { leaderboardContainer } onPress = { () => Actions.LeaderboardD() }>
				<View style = { leaderboardContent }>
					<Text style = { [title, textColor] }>Top Member</Text>
					<Text style = {{ color: "white" }}>{ sortedMembers[0].firstName } { sortedMembers[0].lastName }</Text>
				</View>
				<View style = { leaderboardContentDivider }>
					<View style = { leaderboardDividerLine }></View>
					<View style = { leaderboardArrow }>
						<Ionicons
							name = "ios-arrow-dropright"
							size = { dimension.height * 0.025 }
							style = {{ color: "#FECB00" }}
						/>
					</View>
					<View style = { leaderboardDividerLine }></View>
				</View>
				<View style = { leaderboardContent }>
					<Text style = { [title, textColor] }>Your Ranking</Text>
					<View style = { index }>
						<Text style = { indexText }>{ currentMember.index }</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	renderCommitteePanel() {
		const {
			committeeItemContainer,
			textColor,
			committeesPanelContainer,
			committeesListContainer,
			selectCommitteesIcon,
			committeeNameContainer,
			leaderboardArrow,
			committeesPlaceHolder
		} = styles;

		const {
			committeesList,
			changeUserCommittees,
			userCommittees
		} = this.props;

		let content = null;
		let committeesArray = null;

		if (!this.props.userCommittees || !committeesList) {
			content = <View style = { committeesPlaceHolder }>
				<View>
					<Text style = { [textColor, { fontSize: dimension.width * 0.03 }] }>Add your main committees!</Text>
				</View>
			</View>;
		}

		else {
			committeesArray = Object.entries(userCommittees);

			committeesArray.forEach(function(element) {
				if (!committeesList[element[0]]) {
					let committee = element[0];
					changeUserCommittees({ [committee]: null });
				}
			});

			content = <View style = { committeesListContainer }>
				{ Object.values(committeesArray).map(item =>
					<TouchableOpacity
						style = { committeeItemContainer }
						onPress = { () => { this.viewCommittee(committeesList[item[0]]) } }
					>
						<View style = { committeeNameContainer }>
							<Text style = { [textColor, { fontSize: dimension.width * 0.03 }] }>{ item[0] }</Text>
						</View>
						<View style = {{ flex: 0.1 }}></View>
						<View style = { leaderboardArrow }>
							<Ionicons
								name = "ios-arrow-dropright"
								size = { dimension.height * 0.025 }
								style = {{ color: "#FECB00" }}
							/>
						</View>
						<View style = {{ flex: 0.1 }}></View>
					</TouchableOpacity>
				) }
			</View>;
		}

		return (
			<View style = { committeesPanelContainer }>
				<View style = { selectCommitteesIcon }>
					<Ionicons
						name = "ios-information-circle"
						size = { dimension.height * 0.028 }
						onPress = { () => Actions["CommitteesD"]({ screen: "dashboard" }) } style = {{ color: "#FECB00" }}
					/>
				</View>
				{ content }
			</View>
		);
	}

	viewCommittee(item) {
		this.props.loadCommittee(item);
		Actions["CommitteePageD"]({ screen: "dashboard" });
	}

	renderButtonLinks() {
		const {
			socialMediaButton,
			socialMediaContainer,
			buttonRowContainer
		} = styles;

		return (
			<View style = { socialMediaContainer }>
				<View style = {{ flex: 0.1 }}></View>
				<View style = { buttonRowContainer }>
					<TouchableOpacity
						style = { socialMediaButton }
						onPress = { () => Linking.openURL("https://shpeucf2018-2019.slack.com/") }
					>
						<FontAwesomeIcon
							style = {{ color: "black" }}
							name = "slack"
							size = { dimension.height * 0.04 }
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style = { socialMediaButton }
						onPress = { () => Linking.openURL("https://www.facebook.com/shpeucfchapter/") }
					>
						<FontAwesomeIcon
							style = {{ color: "black" }}
							name = "facebook"
							size = { dimension.height * 0.04 }
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style = { socialMediaButton }
						onPress = { () => Linking.openURL("https://www.shpeucf.com/") }
					>
						<FontAwesomeIcon
							style = {{ color: "black" }}
							name = "globe"
							size = { dimension.height * 0.04 }
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style = { socialMediaButton }
						onPress = { () => Linking.openURL("https://www.instagram.com/shpeucf/?hl=en") }
					>
						<FontAwesomeIcon
							style = {{ color: "black" }}
							name = "instagram" size = { dimension.height * 0.04 }
						/>
					</TouchableOpacity>
				</View>
				<View style = {{ flex: 0.6 }}></View>
				{ this.renderFooter() }
			</View>
		);
	}

	renderFooter() {
		const {
			footer,
			footerText
		} = styles;

		return (
			<View style = { footer }>
				<View style = { footerText }>
					<Text style = {{ color: "black" }}>SHPE </Text>
					<Text style = {{ color: "white" }}>UCF</Text>
				</View>
			</View>
		);
	}

	renderFlags() {
		const {
			flagModal,
			flagColumn
		} = styles;

		const flagHeight = { height: dimension.height - 0.3 * dimension.height };
		const countriesL = ["AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN"];
		const countriesR = ["MX", "NI", "PA", "PY", "PE", "PR", "RO", "ES", "TT", "US", "UY", "VE", ""];

		return (
			<Modal visible = { this.state.flagsVisible } transparent = { true }>
				<SafeAreaView >
					<TouchableOpacity
						style = { [flagModal, flagHeight] }
						onPress = { () => this.setState({ flagsVisible: false }) }
					>
						<View style = { flagColumn }>
							{ countriesL.map(item =>
								<TouchableOpacity onPress = { () => this.flagPicked(item) }>
									<Flag
										type = "flat"
										code = { item }
										size = { 32 }
									/>
								</TouchableOpacity>
							) }
						</View>
						<View style = { flagColumn }>
							{ countriesR.map(item =>
								<TouchableOpacity onPress = { () => this.flagPicked(item) }>
									<Flag
										type = "flat"
										code = { item }
										size = { 32 }
									/>
								</TouchableOpacity>
							) }
						</View>
					</TouchableOpacity>
				</SafeAreaView>
			</Modal>
		);
	}

	rendercustomFlag() {
		const {
			textColor,
			modalText,
			modalButton,
			modalButtonContainer
		} = styles;

		return (
			<Modal visible = { this.state.customFlagVisible } transparent = { true }>
				<View style = { styles.modalBackground }>
					<View style = { styles.modalContent }>
						<Text style = { [modalText, textColor] }>
							Look up your two digit country ISO code and enter it!
						</Text>
						<TextInput
							style = { styles.modalTextInput }
							onChangeText = { (text) => this.setState({ text: text }) }
							value = { this.state.customFlagText }
							autoCapitalize = { "characters" }
							autoCorrect = { false }
							maxLength = { 2 }
						/>

						<View style = { modalButtonContainer }>
							<View style = { modalButton }>
								<Button
									title = "Done"
									onPress = { () => {
										this.flagPicked(this.state.customFlagText);
										this.setState({ customFlagVisible: false });
									} }
								/>
							</View>
							<View style = { modalButton }>
								<Button
									title = "Cancel"
									onPress = { () => this.setState({ customFlagVisible: false }) }
								/>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	calculateRankings() {
		const {
			currentUser
		} = firebase.auth();

		let sortedMembers = _.orderBy(this.props.membersPoints, iteratees, order);
		let currentMember;
		let pastPoints = 0;
		let pastIndex = 1;

		sortedMembers.forEach((x, index) => {
			x.index = x.points !== 0 ? index + 1 : sortedMembers.length;
			if (x.points === pastPoints)
				x.index = pastIndex;

			if (x.id === currentUser.uid)
				currentMember = x;

			pastPoints = x.points;
			pastIndex = x.index;
		});
		sortedMembers.splice(2);

		if (this.isDefined(currentMember)
			&& this.isDefined(sortedMembers)
			&& sortedMembers[0].id !== currentMember.id
			&& sortedMembers[1].id !== currentMember.id
		)	sortedMembers[1] = currentMember;

		return { sortedMembers, currentMember } ;
	}

	convertNumToDate(date) {
		let months = ["Jan", "Feb", "Mar", "April", "May", "June",
			"July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let tempDate = date.split("-");

		return `${months[Number(tempDate[1]) - 1]} ${tempDate[2]}`;
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
		this.props.goToViewEvent("dashboard");
	}

	convertHour(time) {
		let hour;
		let array = time.split(":");

		if (array[2] === "AM") {
			hour = "" + parseInt(array[0]);
			if (hour === "0") hour = "12";

			return hour + ":" + array[1] + ":" + array[2];
		}

		hour = "" + (parseInt(array[0]) - 12);
		if (hour === "0") hour = "12";

		return hour + ":" + array[1] + ":" + array[2];
	}

	sortEvents(eventList) {
		let thisdate = new Date();
		let month = thisdate.getMonth() + 1;
		let year = thisdate.getFullYear();
		let day = thisdate.getDate();
		let hour = thisdate.getHours();
		let min = thisdate.getMinutes();
		let events = {};

		Object.keys(eventList).forEach(function(element) {
			let eventObj = eventList[element];
			let endTime = eventObj.endTime.split(":");
			let tempDate = eventObj.date.split("-");

			if (tempDate[0] < year) return;
			if (tempDate[1] < month) return;
			if (tempDate[2] < day) return;
			if (tempDate[2] == day)
				if (endTime[0] < hour) return;
				else if (endTime[0] == hour)
					if (endTime[1] < min) return;

			Object.assign(eventObj, { eventID: element });
			Object.assign(events, { [element]: eventObj });
		});

		let sortedEvents = _.orderBy(events, ["date", "startTime", "endTime"], ["asc", "asc", "asc"]);

		return sortedEvents;
	}

	showEvents(event) {
		const {
			leaderboardArrow,
			eventTextContainer,
			eventItemInnerContainer
		} = styles;

		const {
			name,
			date,
			committee,
			startTime,
			endTime,
			type
		} = event;

		if (!event) return null;

		let viewType = type;
		let realStart = this.convertHour(startTime);
		let realEnd = this.convertHour(endTime);

		if (committee !== "") viewType = committee;

		return (
			<View style = { eventItemInnerContainer }>
				<View style = {{ flex: 0.1 }}></View>
				<View style = { eventTextContainer }>
					<View style = {{ alignItems: "flex-start" }}>
						<Text style = {{ color: "white", fontSize: dimension.width * 0.035 }}>{ viewType }: { name }</Text>
						<Text style = {{ color: "white", fontSize: dimension.width * 0.035 }}>{ this.convertNumToDate(date) } - { realStart } - { realEnd } </Text>
					</View>
				</View>
				<View style = {{ flex: 0.08 }}></View>
				<View style = { leaderboardArrow }>
					<Ionicons name = "ios-arrow-dropright" size = { dimension.height * 0.025 } style = {{ color: "#FECB00" }} />
				</View>
				<View style = {{ flex: 0.04 }}></View>
			</View>
		);
	}

	getFormattedEventList() {
		const {
			textColor,
			eventListContainerFull,
			eventEmptyText,
			eventsItem
		} = styles;

		let recentEvents = [];
		let singleContainer = {};
		let events = [];
		let content = null;

		if (this.props.eventList) events = this.sortEvents(this.props.eventList);
		recentEvents = events.slice(0, 3);

		if (events.length < 2) singleContainer.flex = 0.4;

		if (events.length === 0) content = <Text style = { [textColor, eventEmptyText ] }>No Upcoming Events</Text>;

		else {
			content = recentEvents.map(item =>
				<TouchableOpacity onPress = { () => this.viewEvent(item) } style = { eventsItem }>
					{ this.showEvents(item) }
					<View style = {{ height: dimension.height * 0.002, backgroundColor: "black", width: "100%" }}></View>
				</TouchableOpacity>
			);
		}

		return (
			<View style = { [eventListContainerFull, singleContainer] }>
				{ content }
			</View>
		);
	}

	isDefined(obj) {
		return !(!obj || obj.length < 2);
	}
}

const styles = {
	page: {
		flex: 1,
		backgroundColor: "#0c0b0b"
	},
	eventListContainerFull: {
		backgroundColor: "#21252b",
		borderColor: "white",
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
	},
	eventItemInnerContainer: { 
		flexDirection: "row",
		flex: 1,
		alignItems: "center"
	},
	eventTextContainer: {
		flex: 1,
		alignItems: "flex-start",
	},
	headerContainer: {
		paddingLeft: "4%",
		justifyContent: "center",
		flex: 0.16,
		flexDirection: "row"
	},
	greetingContainer: {
		flex: 1,
		justifyContent: "center"
	},
	textColor: {
		color: "#e0e6ed"
	},
	socialMediaButton: {
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "#FECB00",
		width: dimension.height * 0.07,
		height: dimension.height * 0.07,
		borderRadius: 15,
		paddingBottom: "2%",
		marginBottom: "2%",
		marginLeft: "2%",
		marginRight: "2%"
	},
	mainContentStyle: {
		backgroundColor: "black",
		flexDirection: "column",
		flex: 1
	},
	title: {
		fontSize: 18,
		fontWeight: "500"
	},
	leaderboardContainer: {
		backgroundColor: "#21252b",
		flex: 1
	},
	leaderboardContent: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly"
	},
	leaderboardContentDivider: {
		flex: 0.3,
		alignSelf: "center",
		width: "80%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	 },
	leaderboardDividerLine: { flex: 0.45,
		height: dimension.height * 0.003,
		backgroundColor: "black"
	},
	leaderboardArrow: {
		color: "#FECB00",
		width: dimension.width * 0.06,
		alignItems: "center"
	},
	modalContent: {
		height: dimension.height * 0.5,
		width: dimension.width * 0.8,
		padding: dimension.height * 0.008,
		backgroundColor: "#21252b",
		alignItems: "center",
		justifyContent: "space-around"
	},
	modalBackground: {
		justifyContent: "center",
		alignItems: "center",
		margin: 0,
		height: dimension.height,
		width: dimension.width,
		backgroundColor: "#000a"
	},
	modalButtonContainer: {
		flexDirection: "row",
		 justifyContent: "space-evenly",
		 width: "100%"
	},
	modalButton: {
		flex: 0.45
	},
	committeesPanelContainer: {
		flexDirection: "row",
		flex: 1,
		height: "100%",
		backgroundColor: "#21252b",
		alignItems: "center"
	},
	committeesListContainer: {
		flex: 1,
		height: "80%"
	},
	committeesPlaceHolder: {
		flex: 1,
		 justifyContent: "space-evenly",
		 height: "80%"
	},
	selectCommitteesIcon: { height: "100%",
		alignItems: "center",
		flex: 0.25,
		paddingTop: "5%"
	},
	committeeItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1
	},
	committeeNameContainer: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "space-evenly" 
	},
	index: {
		color: "#000",
		borderColor: "#FECB00",
		backgroundColor: "#FECB00",
		borderStyle: "solid",
		borderRadius: dimension.height * 0.05 * 0.5,
		justifyContent: "center",
		alignItems: "center",
		height: dimension.height * 0.05,
		width: dimension.height * 0.05
	},
	indexText: {
		fontWeight: "700",
		fontSize: 20,
		color: "black"
	},
	socialMediaContainer: {
		flex: 0.35,
		alignItems: "center"
	},
	buttonRowContainer: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center"
	},
	footer: { flex: 0.3,
		justifyContent: "center",
		backgroundColor: "#FECB00",
		width: "100%"
	},
	footerText: {
		flexDirection: "row",
		justifyContent: "center"
	},
	flagModal: { position: "absolute",
	 flexDirection: "row",
	 width: dimension.width,
	 justifyContent: "space-between",
	 top: dimension.height * 0.15,
	 paddingLeft: "2%",
	 paddingRight: "2%"
	},
	flagColumn: {
		justifyContent: "space-evenly"
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
	dashCommitteesContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		flex: 0.9
	},
	innerScrollContainer: {
		height: dimension.height * 1.3
	},
	dashboardContent: {
		flex: 1,
		paddingLeft: "5%",
		paddingRight: "5%"
	},
	headerOptionsContainer: {
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingLeft: "2%",
		paddingRight: "2%"

	}
};

const mapStateToProps = ({ user, general, members, events, elect, committees }) => {
	const {
		firstName,
		id,
		dashColor,
		flag,
		userCommittees
	} = user;
	const {
		loading
	} = general;
	const {
		membersPoints
	} = members;
	const {
		eventList
	} = events;
	const {
		election
	} = elect;
	const {
		committeesList
	} = committees;

	return {
		firstName,
		id,
		loading,
		membersPoints,
		eventList,
		election,
		dashColor,
		committeesList,
		flag,
		userCommittees
	};
};

const mapDispatchToProps = {
	loadUser,
	pageLoad,
	fetchMembersPoints,
	fetchEvents,
	getPrivilege,
	typeChanged,
	committeeChanged,
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
	loadCommittee,
	changeUserCommittees,
	updateElection
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);