import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, NavBar, FilterList, ButtonLayout, Icon } from '@/components';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { MemberPanel } from '@/utils/MemberPanel';
import { EventForm } from '@/data/FormData';
import { convertNumToDate } from '@/utils/events';
import { deleteEvent, editEvent, checkIn, rsvp, pageLoad, getAllMemberAccounts } from '@/ducks';
import {
	View,
	TouchableOpacity,
	Modal,
	Text,
	Dimensions,
	FlatList,
	Linking,
	SafeAreaView
} from 'react-native';

const dimension = Dimensions.get('screen');

class EventDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
			eventFormVisibility: false,
			event: this.props.route.params.current.event
		 };

		// listener function for changes to the event
		this.props.route.params.current.listener = event => this.setState({ event });
	}

	componentDidMount() {
		const { activeUser } = this.props;

		if (activeUser.privilege && activeUser.privilege.board)
			getAllMemberAccounts();
	}

	onSuccess = (e) => {
		if (this.state.event.code === e.data)
			checkIn(this.state.event, this.props.activeUser);
		else
			Alert.alert('Incorrect Code');
	}

	renderCodeBox() {
		const { activeUser } = this.props;
		const { modalBackground, modalContent } = styles;

		if (activeUser.privilege && activeUser.privilege.board) {
			return (
				<Modal
					transparent = { true }
					visible = { this.state.modalVisible }>
					<View style = { modalBackground }>
						<View style = { modalContent }>
							<TouchableOpacity onPress = { () => this.setState({ modalVisible: false }) }>
								<Icon
									name = 'md-close-circle'
									size = { dimension.height * 0.05 }
									color = '#e0e6ed'
								/>
							</TouchableOpacity>
							<View style = {{ paddingTop: 20 }}></View>
							<View style = {{ alignItems: 'center', flex: 2, justifyContent: 'center' }}>
								<QRCode
									value = { this.state.event.code }
									size = { 300 }
								/>
							</View>
							<View style = {{ paddingTop: 20 }}>
							</View>
						</View>
					</View>
				</Modal>
			);
		}
		else {
			return (
				<Modal
					transparent = { true }
					animationType = { 'fade' }
					onRequestClose = { () => { Alert.alert('Modal has been closed.') } }
					visible = { this.state.modalVisible }
				>
					<SafeAreaView>
						<View style = {{ height: dimension.height, backgroundColor: 'black' }}>
							<View style = {{ flex: 0.2 }}></View>
							<View style = {{ flex: 1, justifyContent: 'flex-start' }}>
								<QRCodeScanner
									onRead = { this.onSuccess }
									fadeIn = { false }
									containerStyle = {{ flex: 0.7 }}
								/>
							</View>
							<View style = {{ flexDirection: 'row', flex: 0.9, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
								<View style = {{ flex: 0.3 }}></View>
								<View style = {{ flex: 1 }}>
									<Button
										title = 'DONE'
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
	}

	renderComponent(item) {
		const { textColor } = styles;

		if (this.props.allMemberAccounts && this.props.allMemberAccounts[item]) {
			const {
				firstName,
				lastName
			} = this.props.allMemberAccounts[item];

			return (
				<View style = {{ flex: 1 }}>
					<Text style = { [{ fontSize: 16, alignSelf: 'center' }, textColor] }>{ firstName } { lastName }</Text>
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

		columnDelimiter = args.columnDelimiter || ',';
		lineDelimiter = args.lineDelimiter || '\n';

		keys = Object.keys(data[0]);

		result = '';
		result += keys.join(columnDelimiter);
		result += lineDelimiter;

		data.forEach(function(item) {
			ctr = 0;
			keys.forEach(function(key) {
				if (ctr > 0) result += columnDelimiter;
				result += String(item[key]).replace('&', 'and').replace('\n', ' ');
				ctr++;
			});
			result += lineDelimiter;
		});

		return result;
	}

	sendListToMail(attendants) {
		const { activeUser, allMemberAccounts } = this.props;

		let users = [];
		const email = allMemberAccounts[activeUser.id].email;

		attendants.map(attendant => { users.push(allMemberAccounts[attendant]) });

		let csv = this.convertArrayOfObjectsToCSV({
			data: users
		});

		if (!csv) return;

		let data = 'Instructions:\n\
			1. Open a plain text Editor(Not microsoft Word)\n\
			2. Copy everything under the line and paste it into the text editor\n\
			3. Save the file and change the extension to .csv\n\
			4. Open the file in Excel\n\
			------------------\n\n' + csv;
		let link = `mailto:${email}?subject=event: ${this.state.event.name}&body=` + data;

		if (!Linking.canOpenURL(link)) {
			Alert.alert('Email could not be sent', { type: 'error', title: 'Failure' });
		}
		else {
			Linking.openURL(link);
			Alert.alert('Email app should be opened');
		}
	}

	renderAttendance() {
		const { activeUser } = this.props;
		const { event } = this.state;
		const {
			lineOnTop,
			attendance,
			attendanceContainer,
			icon,
			textColor,
			fullFlex
		} = styles;

		if (!event) return null;

		if (activeUser.privilege && activeUser.privilege.board && event.attendance) {
			let attendants = Object.keys(event.attendance);

			return (
				<View style = { [fullFlex, lineOnTop] }>
					<View style = { attendanceContainer }>
						<View style = { icon } />
						<Text style = { [attendance, textColor] }>Attendance</Text>
						<Icon
							style = { [icon, textColor] }
							name = 'md-mail'
							size = { 35 }
							color = '#e0e6ed'
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
		this.setState({ modalVisible: true });
	}

	confirmDelete() {
		deleteEvent(this.state.event);
		this.props.navigation.pop();
	}

	renderPickMembers() {
		const { allMemberAccounts, activeUser } = this.props;
		const { event } = this.state;

		if (!event) return null;

		let list = Object.assign({}, allMemberAccounts);
		let excludeDataProp = !event ? {} : Object.assign({}, event.attendance);
		let Wrapper = (props) => <Button
			title = 'Manual Check In'
			onPress = { props.onPress }
		/>;

		if (!excludeDataProp) excludeDataProp = { [activeUser.id]: true };
		else Object.assign(excludeDataProp, { [activeUser.id]: true });

		Object.keys(excludeDataProp).forEach(function (key) {
			delete list[key];
		});

		return (
			<View>
				<FilterList
					multiple = { true }
					CustomForm = { Wrapper }
					data = { list }
					regexFunc = { member => { return `${member.firstName} ${member.lastName}` } }
					selectBy = { member => { return member.id } }
					itemJSX = { member => <MemberPanel member = { member } variant = 'General' /> }
					onSelect = { (selectedUsers) => selectedUsers.forEach(user => checkIn(event, user, false)) }
				/>
			</View>
		);
	}

	renderEventListNum(iconSize) {
		const { activeUser } = this.props;
		const {
			icon,
			iconContainer,
			text,
			textColor
		} = styles;
		const { event } = this.state;

		let numRSVP = 0;
		let numAttendance;

		if (event) {
			if (event.attendance)
				numAttendance = Object.keys(event.attendance).length;
			if (event.rsvp)
				numRSVP = Object.keys(event.rsvp).length;
		}

		if (activeUser.privilege && activeUser.privilege.board) {
			return [
				<View style = { iconContainer }>
					<Icon style = { [icon, textColor] } name = 'people' size = { iconSize } color = '#000' />
					<Text style = { [text, textColor] }>{ numRSVP } { numRSVP == 1 ? 'person' : 'people' } RSVP'd</Text>
				</View>,
				numAttendance && <View style = { iconContainer }>
					<Icon style = { [icon, textColor] } name = 'people' size = { iconSize } color = '#000' />
					<Text style = { [text, textColor] }>{ numAttendance } { numAttendance == 1 ? 'person' : 'people' } attended</Text>
				</View>
			];
		}
	}

	limitRSVP(date) {
		let tempDate = date.split('-');
		let thisdate = new Date();
		let month = thisdate.getMonth() + 1;
		let year = thisdate.getFullYear();
		let day = thisdate.getDate();

		if (tempDate[0] >= parseInt(year) && tempDate[1] >= parseInt(month) && tempDate[2] > parseInt(day))
			return true;
	}

	renderButtons() {
		const { activeUser } = this.props;
		const { event } = this.state;

		let buttons = [];

		if (activeUser.privilege && activeUser.privilege.board) {
			buttons = <ButtonLayout>
				<Button
					title = 'Open check-in'
					onPress = { () => this.openCheckInButton() }
				/>
				{ this.renderPickMembers() }
				<Button
					title = 'Edit event'
					onPress = { () => this.setState({ eventFormVisibility: true }) }
				/>
				<Button
					title = 'Delete event'
					onPress = { () => Alert.alert('Are you sure you want to delete this event?',
						{ title: 'Confirmation', type: 'confirmation', submit: { onPress: () => this.confirmDelete() } }
					) }
				/>
			</ButtonLayout>
			;
		}
		else {
			buttons = <ButtonLayout>
				<Button
					title = 'Check in'
					onPress = { () => { this.setState({ modalVisible: true }) } }
				/>
				{ this.limitRSVP(event.date) && <Button
					title = 'RSVP'
					onPress = { () => rsvp(event) }
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
			} = this.state.event;
			const {
				page,
				container,
				iconContainer,
				icon,
				text,
				textColor,
				final
			} = styles;

			let viewName = type + ': ' + name;
			let iconSize = 25;

			if (committee) viewName = committee + ': ' + name;

			return (
				<SafeAreaView style = { page }>
					<NavBar title = { viewName } back onBack = { () => this.props.navigation.pop() } />
					<EventForm
						title = 'Edit Event'
						values = { this.state.event }
						visible = { this.state.eventFormVisibility }
						onSubmit = { event => editEvent(event) }
						changeVisibility = { visible => this.setState({ eventFormVisibility: visible }) }
					/>
					<View style = { container }>
						<View style = { iconContainer }>
							<Icon
								style = { [icon, textColor] }
								name = 'md-calendar'
								size = { iconSize }
								color = '#000' />
							<Text style = { [text, textColor] }>{ convertNumToDate(date) }</Text>
						</View>
						<View style = { iconContainer }>
							<Icon
								style = { [icon, textColor] }
								name = 'md-time'
								size = { iconSize }
								color = '#000' />
							<Text style = { [text, textColor] }>{ startTime }-{ endTime }</Text>
						</View>
						<View style = { iconContainer }>
							<Icon
								style = { [icon, textColor] }
								name = 'md-pin'
								size = { iconSize }
								color = '#000' />
							<Text style = { [text, textColor] }>{ location }</Text>
						</View>
						{ description
						&& <View style = { iconContainer }>
							<Icon
								style = { [icon, textColor] }
								name = 'md-list'
								size = { iconSize }
								color = '#000' />
							<Text style = { [text, textColor] }>{ description }</Text>
						</View> }
						{ this.renderEventListNum(iconSize) }
						<View style = { [iconContainer, final] }>
							{ this.renderAttendance() }
						</View>
					</View>
					{ this.renderCodeBox() }
					{ this.renderButtons() }
					<View style = {{ height: dimension.height * 0.08, backgroundColor: 'black' }}></View>
				</SafeAreaView>
			);
		}
	}
}

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		padding: 25,
		backgroundColor: 'black'
	},
	modalText: {
		alignSelf: 'center',
		fontSize: 16
	},
	modalTextInput: {
		marginTop: dimension.height * 0.05,
		height: 80,
		textAlign: 'center',
		width: dimension.width * 0.6,
		backgroundColor: '#e0e6ed22',
		borderColor: '#e0e6ed',
		borderRadius: 16,
		borderWidth: 3,
		borderStyle: 'solid',
		fontWeight: 'bold',
		fontSize: 60,
		color: '#E0E6ED'
	},
	modalContent: {
		height: dimension.height * 0.6,
		width: dimension.width * 0.9,
		padding: 12,
		backgroundColor: 'white',
		borderRadius: 12
	},
	modalBackground: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 0,
		height: dimension.height,
		width: dimension.width,
		backgroundColor: '#000a'
	},
	final: {
		flex: 1
	},
	textColor: {
		color: '#e0e6ed'
	},
	iconContainer: {
		paddingVertical: 5,
		flexDirection: 'row'
	},
	icon: {
		flex: 0.2
	},
	attendanceContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	attendance: {
		flex: 0.8,
		fontSize: 20,
		textAlign: 'center'
	},
	text: {
		flex: 1,
		fontSize: 20
	},
	lineOnTop: {
		borderTopColor: '#e0e6ed',
		borderTopWidth: 1
	},
	codeText: {
		margin: 60,
		color: '#FECB00',
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 50
	},
	page: {
		flex: 1,
		backgroundColor: 'black'
	},
	tabBar: {
		height: dimension.height * 0.1,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#0005',
		padding: 10
	},
	tabBarText: {
		color: '#000',
		fontSize: 20,
		margin: 20,
		alignSelf: 'center'
	},
	headerStyle: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		marginBottom: 10
	},
	headerTextStyle: {
		fontSize: 22,
		fontWeight: 'bold'
	},
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: '#777'
	},
	textBold: {
		fontWeight: '500',
		color: '#000'
	},
	buttonText: {
		fontSize: 21,
		color: 'rgb(0,122,255)'
	},
	buttonTouchable: {
		padding: 16
	},
	textStyle: {
		color: '#e0e6ed',
		fontSize: dimension.width * 0.05
	},
	fullFlex: {
		flex: 1
	}
};

const mapStateToProps = ({ user, members }) => {
	const { activeUser } = user;
	const { allMemberAccounts } = members;

	return { allMemberAccounts, activeUser };
};

const mapDispatchToProps = { checkIn, rsvp, pageLoad, getAllMemberAccounts };

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);