import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Text, Dimensions, FlatList, Linking, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "react-native-router-flux";
import QRCodeScanner from "react-native-qrcode-scanner";
import QRCode from "react-native-qrcode-svg";
import { MemberPanel } from "@/utils/render";
import { EventForm } from "@/data/FormData";
import { convertArrayOfObjectsToCSV, convertNumToDate } from "@/utils/events";
import { Alert, Button, NavBar, FilterList, ButtonLayout, Icon } from "@/components";
import { deleteEvent, editEvent, checkIn, rsvp } from "@/ducks";

const { height, width } = Dimensions.get("screen");

export const EventDetails = () => {
	const [modalVisible, setModalVisibility] = useState(false);
	const [formVisible, setFormVisibility] = useState(false);
	const dispatch = useDispatch();
	const {
		events: { activeEvent },
		user: { activeUser },
		members: { allMemberAccounts }
	} = useSelector(state => state);

	const {
		name,
		description,
		date,
		startTime,
		endTime,
		location,
		type,
		committee,
		code,
		attendance
	} = activeEvent;
	const {
		lineOnTop,
		attendanceTitle,
		attendanceContainer,
		icon,
		textColor,
		fullFlex,
		iconContainer,
		text,
		page,
		container
	} = styles;

	const renderQR = () => {
		const { modalBackground, modalContent } = styles;

		return (activeUser.privilege && activeUser.privilege.board)
			? <Modal transparent visible = { modalVisible }>
				<View style = { modalBackground }>
					<View style = { modalContent }>
						<TouchableOpacity onPress = { () => setModalVisibility(false) }>
							<Icon name = "md-close-circle" size = { height * 0.05 } color = '#e0e6ed' />
						</TouchableOpacity>
						<View style = {{ alignItems: "center", flex: 2, justifyContent: "center", paddingVertical: 20 }}>
							<QRCode value = { code } size = { 300 } />
						</View>
					</View>
				</View>
			</Modal>
			: <Modal transparent visible = { modalVisible }>
				<SafeAreaView>
					<View style = {{ height: height, backgroundColor: "black" }}>
						<View style = {{ flex: 1, justifyContent: "flex-start" }}>
							<QRCodeScanner
								fadeIn = { false }
								containerStyle = {{ flex: 0.7 }}
								onRead = { ({ data: qrcode }) => (code === qrcode)
									? dispatch(checkIn(activeEvent, activeUser))
									: Alert.alert("Incorrect code") }
							/>
						</View>
						<View style = {{ flexDirection: "row", flex: 0.9, alignItems: "center", justifyContent: "center", width: "100%" }}>
							<View style = {{ flex: 1 }}>
								<Button title = "DONE" onPress = { () => setModalVisibility(false) } />
							</View>
						</View>
					</View>
				</SafeAreaView>
			</Modal>;
	};

	const renderAttendance = () => {
		if (activeUser.privilege && activeUser.privilege.board && attendance) {
			return (
				<View style = { [fullFlex, lineOnTop] }>
					<View style = { attendanceContainer }>
						<Text style = { [attendanceTitle, textColor] }>Attendance</Text>
						<Icon
							style = { [icon, textColor] }
							name = "md-mail"
							size = { 35 }
							color = "#e0e6ed"
							onPress = { () => sendAttendanceToMail(Object.keys(attendance)) }
						/>
					</View>
					<FlatList
						data = { Object.keys(attendance) }
						numColumns = { 2 }
						renderItem = { ({ item }) => renderAttendant(item) }
					/>
				</View>
			);
		}
	};

	const renderAttendant = (attendant) => {
		const { firstName, lastName } = allMemberAccounts[attendant];

		return <View style = {{ flex: 1 }}>
			<Text style = { [{ fontSize: 16, alignSelf: "center" }, textColor] }>{ firstName } { lastName }</Text>
		</View>;
	};

	const renderPickMembers = () => {
		let list = { ...allMemberAccounts };
		let excludeDataProp = { ...attendance, [activeUser.id]: true };
		let Wrapper = props => <Button title = "Manual Check In" onPress = { props.onPress } />;

		Object.keys(excludeDataProp).forEach(key => delete list[key]);

		return <FilterList
			multiple
			CustomForm = { Wrapper }
			data = { list }
			regexFunc = { ({ firstName, lastName }) => `${firstName} ${lastName}` }
			selectBy = { ({ id }) => id }
			itemJSX = { data => MemberPanel(data) }
			onSelect = { selectedUsers => selectedUsers.forEach(user => dispatch(checkIn(activeEvent, user, false))) }
		/>;
	};

	const renderEventStats = () => {
		let numAttendance = attendance && Object.keys(attendance).length;
		let numRSVP = activeEvent.rsvp && Object.keys(activeEvent.rsvp).length || 0;

		if (activeUser.privilege && activeUser.privilege.board) {
			return [
				<View style = { iconContainer }>
					<Icon style = { [icon, textColor] } name = "ios-people" size = { 25 } color = '#000' />
					<Text style = { [text, textColor] }>{ numRSVP } { numRSVP === 1 ? "person" : "people" } RSVP'd</Text>
				</View>,
				numAttendance && <View style = { iconContainer }>
					<Icon style = { [icon, textColor] } name = "md-people" size = { 25 } color = '#000' />
					<Text style = { [text, textColor] }>{ numAttendance } { numAttendance === 1 ? "person" : "people" } attended</Text>
				</View>
			];
		}
	};

	const renderButtons = () => {
		const confirmDelete = () => { deleteEvent(activeEvent); Actions.pop() };

		return (
			(activeUser.privilege && activeUser.privilege.board)
				? <ButtonLayout>
					<Button title = "Open check-in" onPress = { () => setModalVisibility(true) } />
					{ renderPickMembers() }
					<Button title = "Edit event" onPress = { () => setFormVisibility(true) } />
					<Button
						title = "Delete event"
						onPress = { () => Alert.alert("Are you sure you want to delete this event?",
							{ title: "Confirmation", type: "confirmation", submit: { onPress: confirmDelete } }) }
					/>
				</ButtonLayout>
				: <ButtonLayout>
					<Button title = "Check in" onPress = { () => setModalVisibility(true) } />
					{ limitRSVP(date) && <Button title = "RSVP" onPress = { () => dispatch(rsvp(activeEvent)) } /> }
				</ButtonLayout>
		);
	};

	const limitRSVP = (eventDate) => {
		let [year, month, day] = eventDate.split("-");
		let date = new Date();

		return (year >= date.getFullYear()) && (month >= date.getMonth() + 1) && (day > date.getDate());
	};

	const sendAttendanceToMail = attendants => {
		let users = [];
		const email = allMemberAccounts[activeUser.id].email;

		attendants.map(attendant => users.push(allMemberAccounts[attendant]));

		let data = `
			Instructions:
				1. Open a plain text editor.
				2. Copy everything under the line and paste it into the text editor.
				3. Save the file and change the extension to .csv
				4. Open the file in Excel.
			------------------------------------------------------------------------
			${convertArrayOfObjectsToCSV(users)}
		`;
		let link = `mailto:${email}?subject=event: ${name}&body=${data}`;

		if (!Linking.canOpenURL(link)) {
			Alert.alert("Email could not be sent", { type: "error", title: "Failure" });
		}
		else {
			Linking.openURL(link);
			Alert.alert("Email app should be opened");
		}
	};

	const menuItems = [
		{ iconName: "md-calendar", info: convertNumToDate(date) },
		{ iconName: "md-time", info: startTime - endTime },
		{ iconName: "md-pin", info: location },
		{ iconName: "md-list", info: description }
	];

	return (
		<SafeAreaView style = { page }>
			<NavBar title = { `${committee || type}: ${name}` } back />
			<EventForm
				title = "Edit Event"
				values = { activeEvent }
				visible = { formVisible }
				onSubmit = { event => editEvent(event) }
				changeVisibility = { visible => setFormVisibility(visible) }
			/>
			<View style = { container }>
				{ menuItems.map(({ iconName, info }) =>
					info && <View style = { iconContainer }>
						<Ionicons style = { [icon, textColor] } name = { iconName } size = { 25 } color = "black" />
						<Text style = { [text, textColor] }>{ info }</Text>
					</View>
						|| <View />
				) }
				{ renderEventStats() }
				<View style = { [iconContainer, fullFlex] }>
					{ renderAttendance() }
				</View>
			</View>
			{ renderQR() }
			{ renderButtons() }
		</SafeAreaView>
	);
};

const styles = {
	container: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "flex-start",
		padding: 25,
		backgroundColor: "black"
	},
	modalContent: {
		height: height * 0.6,
		width: width * 0.9,
		padding: 12,
		backgroundColor: "white",
		borderRadius: 12
	},
	modalBackground: {
		justifyContent: "center",
		alignItems: "center",
		margin: 0,
		height: height,
		width: width,
		backgroundColor: "#000a"
	},
	textColor: {
		color: "#e0e6ed"
	},
	iconContainer: {
		paddingVertical: 5,
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
	attendanceTitle: {
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
	page: {
		flex: 1,
		backgroundColor: "black"
	},
	fullFlex: {
		flex: 1
	}
};