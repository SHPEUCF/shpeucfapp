import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, NavBar, FilterList, ButtonLayout } from "../general";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import QRCode from "react-native-qrcode-svg";
import QRCodeScanner from "react-native-qrcode-scanner";
import {
	View,
	TouchableOpacity,
	Modal,
	Text,
	Dimensions,
	FlatList,
	Linking,
	SafeAreaView,
	Alert
} from "react-native";
import {
	goToCreateEvent,
	goToCreateEventFromEdit,
	fetchCode,
	goToEvents,
	deleteEvents,
	getPrivilege,
	checkIn,
	rsvp,
	openCheckIn,
	closeCheckIn,
	pageLoad,
	convertNumToDate,
	fetchAllUsers,
	emailListUsers,
	filterChanged,
	fetchMemberProfile,
	startTimeChanged,
	endTimeChanged
} from "../../ducks";
import { MemberPanel } from "../../utils/actions";

const dimension = Dimensions.get("screen");

class EventDetails extends Component {
	constructor(props) {
		super(props);
		this.state = { modalVisible: false };
	}

	componentDidMount() {
		this.props.filterChanged("");

		this.props.fetchCode(this.props.eventID);
		if (this.props.privilege && this.props.privilege.board)
			this.props.fetchAllUsers();

		this.props.startTimeChanged(this.convertHour(this.props.startTime));
		this.props.endTimeChanged(this.convertHour(this.props.endTime));
	}

	convertNumToDate(date) {
		let months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let tempDate = date.split("-");

		return `${months[Number(tempDate[1]) - 1]} ${tempDate[2]}`;
	}

	onSuccess = (e) => {
		if (this.props.code === e.data)
			this.checkinButton(this.props.eventID, this.props.points);
		else
			alert("Incorrect Code");
	}

	renderCodeBox() {
		const {
			modalBackground,
			modalContent
		} = styles;

		if (this.props.privilege && this.props.privilege.board)
			return (
				<Modal
					transparent = { true }
					visible = { this.state.modalVisible }>
					<View style = { modalBackground }>
						<View style = { modalContent }>
							<TouchableOpacity onPress = { () => {
								this.setState({ modalVisible: false });
								this.props.closeCheckIn(this.props.eventID);
							} }>
								<Ionicons
									name = "md-close-circle"
									size = { dimension.height * 0.05 }
									color = 'e0e6ed'
								/>
							</TouchableOpacity>
							<View style = {{ paddingTop: 20 }}></View>
							<View style = {{ alignItems: "center", flex: 2, justifyContent: "center" }}>
								<QRCode
									value = { this.props.code }
									size = { 300 }
								/>
							</View>
							<View style = {{ paddingTop: 20 }}>
							</View>
						</View>
					</View>
				</Modal>
			);
		else
			return (
				<Modal
					transparent = { true }
					animationType = { "fade" }
					onRequestClose = { () => { alert("Modal has been closed.") } }
					visible = { this.state.modalVisible }
				>
					<SafeAreaView>
						<View style = {{ height: dimension.height, backgroundColor: "black" }}>
							<View style = {{ flex: 0.2 }}></View>
							<View style = {{ flex: 1, justifyContent: "flex-start" }}>
								<QRCodeScanner
									onRead = { this.onSuccess }
									fadeIn = { false }
									containerStyle = {{ flex: 0.7 }}
								/>
							</View>
							<View style = {{ flexDirection: "row", flex: 0.9, alignItems: "center", justifyContent: "center", width: "100%" }}>
								<View style = {{ flex: 0.3 }}></View>
								<View style = {{ flex: 1 }}>
									<Button
										title = "DONE"
										onPress = { () => this.setState({ modalVisible: false }) }
									/>
								</View>
								<View style = {{ flex: 0.3 }}></View>
							</View>
						</View>
					</SafeAreaView>
				</Modal>
			);
	}

	renderComponent(item) {
		const {
			textColor
		} = styles;

		if (this.props.userList && this.props.userList[item]) {
			const {
				firstName,
				lastName
			} = this.props.userList[item];

			return (
				<View style = {{ flex: 1 }}>
					<Text style = { [{ fontSize: 16, alignSelf: "center" }, textColor] }>{ firstName } { lastName }</Text>
				</View>
			);
		}
	}

	convertArrayOfObjectsToCSV(args) {
		let result;
		let ctr;
		let keys;
		let columnDelimiter;
		let lineDelimiter;
		let data = args.data || null;

		if (!data || !data.length) return null;

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
				result += String(item[key]).replace("&", "and").replace("\n", " ");
				ctr++;
			});
			result += lineDelimiter;
		});

		return result;
	}

	sendListToMail(attendants) {
		const {
			privilege,
			userList,
			name
		} = this.props;

		let users = [];
		const email = userList[privilege.id].email;
		attendants.map(attendant => { users.push(userList[attendant]) });

		let csv = this.convertArrayOfObjectsToCSV({
			data: users
		});

		if (!csv) return;

		let data = "Instructions:\n\
			1. Open a plain text Editor(Not microsoft Word)\n\
			2. Copy everything under the line and paste it into the text editor\n\
			3. Save the file and change the extension to .csv\n\
			4. Open the file in Excel\n\
			------------------\n\n" + csv;
		let link = `mailto:${email}?subject=event: ${name}&body=` + data;
		if (!Linking.canOpenURL(link)) {
			alert("Email could not be sent", "Failure");
		}
		else {
			Linking.openURL(link);
			alert("Email app should be opened");
		}
	}

	renderAttendance() {
		const {
			privilege,
			eventList,
			eventID
		} = this.props;
		const {
			lineOnTop,
			attendance,
			attendanceContainer,
			icon,
			textColor,
			fullFlex
		} = styles;

		if (!eventList || !eventList[eventID]) return null;

		if (privilege && privilege.board && eventList && eventList[eventID] && eventList[eventID].attendance) {
			let attendants = Object.keys(eventList[eventID].attendance);

			return (
				<View style = { [fullFlex, lineOnTop] }>
					<View style = { attendanceContainer }>
						<View style = { icon }></View>
						<Text style = { [attendance, textColor] }>Attendance</Text>
						<Ionicons
							style = { [icon, textColor] }
							name = "md-mail"
							size = { 35 }
							color = 'e0e6ed'
							onPress = { () => this.sendListToMail(attendants) }
						/>
					</View>
					<FlatList
						data = { attendants }
						extraData = { this.state }
						numColumns = { 2 }
						keyExtractor = { this._keyExtractor }
						renderItem = { ({ item }) => this.renderComponent(item) }
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

	callUser(id) {
		this.setState({ pickerVisible: false });
		this.props.pageLoad();
		this.props.fetchMemberProfile(id);

		if (this.props.screen === "dashboard") Actions["OtherProfileD"]({ screen: this.props.screen });
		else if (this.props.screen === "events") Actions["OtherProfileE"]({ screen: this.props.screen });
		else if (this.props.screen === "dashboard" + "committeepage") Actions["OtherProfileCPD"]({ screen: this.props.screen });
		else if (this.props.screen === "committees" + "committeepage") Actions["OtherProfileC"]({ screen: this.props.screen });
	}

	renderPickMembers() {
		const {
			userList,
			eventList,
			eventID
		} = this.props;

		if (!eventList) return null;

		let list = Object.assign({}, userList);
		let excludeDataProp = !eventList[eventID] ? {} : Object.assign({}, eventList[eventID].attendance);
		let Wrapper = (props) => <Button
			title = "Manual Check In"
			onPress = { props.onPress }
		/>;
		if (!excludeDataProp) excludeDataProp = { [this.props.id]: true };
		else Object.assign(excludeDataProp, { [this.props.id]: true });

		Object.keys(excludeDataProp).forEach(function (key) {
			delete list[key];
		});

		return (
			<View>
				<FilterList
					ref = { child => { this.child = child } } { ...this.props }
					type = "Multiple"
					CustomForm = { Wrapper }
					data = { list }
					regexFunc = { (data) => { return `${data.firstName} ${data.lastName}` } }
					selectBy = { (data) => { return data.id } }
					itemJSX = { (data) => MemberPanel(data) }
					onSelect = { (selectedUsers) => {
						this.checkInMembers(selectedUsers);
					} }
				/>
			</View>
		);
	}

	renderRSVP() {
		const {
			rsvp,
			eventID,
			userID
		} = this.props;

		rsvp(eventID, userID);
	}

	renderEventListNum(iconSize) {
		const {
			privilege,
			eventList,
			eventID
		} = this.props;
		const {
			icon,
			iconContainer,
			text,
			textColor
		} = styles;

		let numRSVP = 0;
		let numAttendance;

		if (eventList && eventList[eventID]) {
			if (eventList[eventID].attendance)
				numAttendance = Object.keys(eventList[eventID].attendance).length;
			if (eventList[eventID].rsvp)
				numRSVP = Object.keys(eventList[eventID].rsvp).length;
		}

		if (privilege && privilege.board)
			return [
				<View style = { iconContainer }>
					<Ionicons style = { [icon, textColor] } name = "ios-people" size = { iconSize } color = '#000' />
					<Text style = { [text, textColor] }>{ numRSVP } { numRSVP == 1 ? "person" : "people" } RSVP'd</Text>
				</View>,
				numAttendance && <View style = { iconContainer }>
					<Ionicons style = { [icon, textColor] } name = "md-people" size = { iconSize } color = '#000' />
					<Text style = { [text, textColor] }>{ numAttendance } { numAttendance == 1 ? "person" : "people" } attended</Text>
				</View>
			];
	}

	limitRSVP(date) {
		let tempDate = date.split("-");
		let thisdate = new Date();
		let month = thisdate.getMonth() + 1;
		let year = thisdate.getFullYear();
		let day = thisdate.getDate();

		if (tempDate[0] >= parseInt(year) && tempDate[1] >= parseInt(month) && tempDate[2] > parseInt(day))
			return true;
	}

	checkInMembers(selectedUsers) {
		const {
			checkIn,
			eventID,
			points,
			id,
			firstName,
			lastName
		} = this.props;

		let userArr = Object.values(selectedUsers);
		userArr.forEach(function(user) {
			checkIn(eventID, points, user.id, { id: id, name: firstName + " " + lastName });
		});
	}

	prepend0(item) {
		let array = item.split(":");
		let hour = array[0];

		if (hour.length === 1)
			hour = "0" + hour;

		return hour + ":" + array[1] + ":" + array[2];
	}

	renderButtons() {
		let buttons = [];

		if (this.props.privilege && this.props.privilege.board) {
			buttons = <ButtonLayout>
				<Button
					title = "Open check-in"
					onPress = { this.openCheckInButton.bind(this) }
				/>
				{ this.renderPickMembers() }
				<Button
					title = "Edit event"
					onPress = { () => {
						this.props.startTimeChanged(this.prepend0(this.props.startTime));
						this.props.endTimeChanged(this.prepend0(this.props.endTime));
						this.props.goToCreateEventFromEdit(this.props.screen);
					} }
				/>
				<Button
					title = "Delete event"
					onPress = { () => Alert.alert("Confirmation", "Are you sure you want to delete", [
						{
							text: "Confirm",
							onPress: () => this.deleteButton()
						},
						{
							text: "Cancel"
						}
					]) }
				/>
			</ButtonLayout>
			;
		}

		else {
			buttons = <ButtonLayout>
				<Button
					title = "Check in"
					onPress = { () => { this.setState({ modalVisible: true }) } }
				/>
				{ this.limitRSVP(this.props.date) && <Button
					title = "RSVP"
					onPress = { () => {	this.renderRSVP() } }
				/> }

				{ !this.limitRSVP(this.props.date) && <Button
					title = "Check in"
					onPress = { () => { this.setState({ modalVisible: true }) } }
				/> }
			</ButtonLayout>
			;
		}

		return (
			<View>
				{ buttons }
			</View>
		);
	}

	render() {
		if (this.props.loading) {
			return <Spinner />;
		}
		else {
			const {
				name,
				description,
				date,
				startTime,
				endTime,
				location,
				type,
				committee
			} = this.props;
			const {
				page,
				container,
				iconContainer,
				icon,
				text,
				textColor,
				final
			} = styles;

			let viewName = type + ": " + name;
			let iconSize = 25;

			if (committee !== "") viewName = committee + ": " + name;

			return (
				<SafeAreaView style = { page }>
					<NavBar title = { viewName } back onBack = { () => Actions.pop() } />
					<View style = { container }>
						<View style = { iconContainer }>
							<Ionicons style = { [icon, textColor] } name = "md-calendar" size = { iconSize } color = '#000' />
							<Text style = { [text, textColor] }>{ this.convertNumToDate(date) }</Text>
						</View>
						<View style = { iconContainer }>
							<Ionicons style = { [icon, textColor] } name = "md-time" size = { iconSize } color = '#000' />
							<Text style = { [text, textColor] }>{ startTime }-{ endTime }</Text>
						</View>
						<View style = { iconContainer }>
							<Ionicons style = { [icon, textColor] } name = "md-pin" size = { iconSize } color = '#000' />
							<Text style = { [text, textColor] }>{ location }</Text>
						</View>
						{ description != ""
						&& <View style = { [iconContainer, { flex: 0.7 }] }>
							<Ionicons style = { [icon, textColor] } name = "md-list" size = { iconSize } color = '#000' />
							<Text style = { [text, textColor] }>{ description }</Text>
						</View> }
						{ this.renderEventListNum(iconSize) }
						<View style = { [iconContainer, final] }>
							{ this.renderAttendance() }
						</View>
					</View>
					{ this.renderCodeBox() }
					{ this.renderButtons() }
					<View style = {{ height: dimension.height * 0.08, backgroundColor: "black" }}></View>
				</SafeAreaView>
			);
		}
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

const styles = {
	container: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "flex-start",
		padding: 25,
		backgroundColor: "black"
	},
	modalText: {
		alignSelf: "center",
		fontSize: 16
	},
	modalTextInput: {
		marginTop: dimension.height * 0.05,
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
	modalContent: {
		height: dimension.height * 0.6,
		width: dimension.width * 0.9,
		padding: 12,
		backgroundColor: "white",
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
	final: {
		flex: 1
	},
	textColor: {
		color: "#e0e6ed"
	},
	iconContainer: {
		flex: 0.2,
		flexDirection: "row"
	},
	icon: {
		flex: 0.2
	},
	attendanceContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	attendance: {
		flex: 0.8,
		fontSize: 20,
		textAlign: "center"
	},
	text: {
		flex: 1,
		fontSize: 20
	},
	lineOnTop: {
		borderTopColor: "#e0e6ed",
		borderTopWidth: 1
	},
	codeText: {
		margin: 60,
		color: "#FECB00",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 50
	},
	page: {
		flex: 1,
		backgroundColor: "black"
	},
	tabBar: {
		height: dimension.height * 0.1,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#0005",
		padding: 10
	},
	tabBarText: {
		color: "#000",
		fontSize: 20,
		margin: 20,
		alignSelf: "center"
	},
	headerStyle: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		marginBottom: 10
	},
	headerTextStyle: {
		fontSize: 22,
		fontWeight: "bold"
	},
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: "#777"
	},
	textBold: {
		fontWeight: "500",
		color: "#000"
	},
	buttonText: {
		fontSize: 21,
		color: "rgb(0,122,255)"
	},
	buttonTouchable: {
		padding: 16
	},
	textStyle: {
		color: "#e0e6ed",
		fontSize: dimension.width * 0.05
	},
	fullFlex: {
		flex: 1
	}
};

const mapStateToProps = ({ events, user, members, general }) => {
	const {
		type,
		name,
		description,
		date,
		startTime,
		endTime,
		location,
		points,
		eventID,
		error,
		code,
		eventList,
		committee
	} = events;
	const {
		privilege,
		firstName,
		lastName,
		id
	} = user;
	const {
		userList
	} = members;
	const {
		filter
	} = general;

	return {
		type,
		name,
		description,
		date,
		startTime,
		endTime,
		location,
		points,
		eventID,
		error,
		privilege,
		code,
		eventList,
		userList,
		filter,
		firstName,
		lastName,
		id,
		committee
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
	rsvp,
	openCheckIn,
	closeCheckIn,
	pageLoad,
	convertNumToDate,
	fetchAllUsers,
	emailListUsers,
	filterChanged,
	fetchMemberProfile,
	startTimeChanged,
	endTimeChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);