import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner, Icon, CountryFlag, EventPanel } from '@/components';
import { ColorPicker } from 'react-native-color-picker';
import { loadCommittee } from '@/ducks';
import { editUser } from '@/services/user';
import { filterPastEvents, fullMonths } from '@/utils/events';
import { Leaderboard } from './Leaderboard';
import FavoriteCommittees from './FavoriteCommittees';
import {
	Text,
	View,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	Linking,
	Modal,
	SafeAreaView,
	StatusBar
} from 'react-native';

const { width, height } = Dimensions.get('screen');

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { colorPickerVisible: false };
	}

	didBlurSubscription = this.props.navigation.addListener('didBlur',
		() => { this.setState({ refresh: true }) }
	);

	render() {
		return !this.props.user.firstName ? <Spinner /> : this.renderContent();
	}

	renderContent() {
		const { page, dashCommittees, dashboardContent } = styles;
		const { user, committeesList, navigation } = this.props;

		return (
			<SafeAreaView style = { page }>
				<StatusBar backgroundColor = '#0c0b0b' barStyle = 'light-content' />
				<ScrollView>
					{ this.renderHeader() }
					<View style = { dashboardContent }>
						{ this.renderEvents() }
						<View style = { dashCommittees }>
							<View style = {{ flex: 1 }}>
								<Leaderboard navigation = { navigation } />
							</View>
							<View style = {{ flex: 1 }}>
								<FavoriteCommittees
									committeesList = { committeesList }
									userCommittees = { user.userCommittees }
									loadCommittee = { this.props.loadCommittee }
									navigation = { navigation }
								/>
							</View>
						</View>
					</View>
					{ this.renderButtonLinks() }
					{ this.renderFooter() }
				</ScrollView>
				{ this.renderColorPicker() }
			</SafeAreaView>
		);
	}

	renderHeader() {
		const { headerContainer, headerOptionsContainer, textColor, greetingContainer } = styles;
		const date = new Date();

		return (
			<View style = { [headerContainer, { backgroundColor: this.props.user.color } ] }>
				<View style = { greetingContainer }>
					<Text style = { [textColor, { fontSize: 20 }] }>
						{ date.getHours() >= 12 ? 'Good evening' : 'Good morning' }, { this.props.user.firstName }.
					</Text>
					<Text style = { textColor }>Today is { fullMonths[date.getMonth()] } { date.getDate() }</Text>
				</View>
				<View style = { headerOptionsContainer }>
					<CountryFlag />
					<Icon
						type = 'FontAwesome'
						style = {{ color: 'white' }}
						name = 'chevron-down'
						onPress = { () => this.setState({ colorPickerVisible: true }) }
						size = { 15 }
					/>
				</View>
			</View>
		);
	}

	renderEvents() {
		const { upcomingEvents, eventListContainerFull, eventEmptyText, title, textColor } = styles;
		const events = filterPastEvents(this.props.sortedEvents) || [];

		return (
			<View>
				<View style = { upcomingEvents }>
					<Text style = { [title, textColor] }>Upcoming Events</Text>
				</View>
				<View style = { eventListContainerFull }>
					{ !events.length && <Text style = { [textColor, eventEmptyText ] }>No Upcoming Events</Text>
				|| events.slice(0, 3).map(event => <EventPanel event = { event } variant = { 'Dashboard' } />) }
				</View>
			</View>
		);
	}

	renderColorPicker() {
		return (
			<Modal visible = { this.state.colorPickerVisible } transparent = { true }>
				<View style = { [styles.modalBackground, { backgroundColor: 'transparent' }] }>
					<ColorPicker
						defaultColor = '#21252b'
						oldColor = { this.props.user.color }
						onColorSelected = { color => {
							editUser({ color });
							this.setState({ colorPickerVisible: false });
						} }
						style = { [styles.modalContent, { backgroundColor: 'black' }] }
					/>
				</View>
			</Modal>
		);
	}

	renderButtonLinks() {
		const { socialMediaButton, socialMediaContainer, buttonRowContainer, black } = styles;

		let buttonLinks = [
			['https://shpeucf2018-2019.slack.com/', 'slack'],
			['https://www.facebook.com/shpeucfchapter/', 'facebook'],
			['https://www.shpeucf.com/', 'globe'],
			['https://www.instagram.com/shpeucf/?hl=en', 'instagram']
		];

		return (
			<View style = { socialMediaContainer }>
				<View style = { buttonRowContainer }>
					{ buttonLinks.map(([link, icon], index) =>
						<TouchableOpacity
							key = { index }
							style = { socialMediaButton }
							onPress = { () => Linking.openURL(link) }
						>
							<Icon type = 'FontAwesome' style = { black } name = { icon } size = { height * 0.04 } />
						</TouchableOpacity>
					) }
				</View>
			</View>
		);
	}

	renderFooter() {
		const { footer, footerText, black, textColor } = styles;

		return (
			<View style = { footer }>
				<View style = { footerText }>
					<Text style = { black }>SHPE </Text>
					<Text style = { textColor }>UCF</Text>
				</View>
			</View>
		);
	}
}

const styles = {
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	},
	headerContainer: {
		paddingLeft: '4%',
		justifyContent: 'center',
		flexDirection: 'row',
		height: 100
	},
	greetingContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	textColor: {
		color: '#e0e6ed'
	},
	socialMediaButton: {
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#FECB00',
		width: height * 0.07,
		height: height * 0.07,
		borderRadius: 15,
		paddingBottom: '2%',
		marginBottom: '2%',
		marginLeft: '2%',
		marginRight: '2%'
	},
	title: {
		fontSize: 18,
		fontWeight: '500'
	},
	modalBackground: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 0,
		height: height,
		width: width,
		backgroundColor: '#000a'
	},
	modalContent: {
		height: '50%',
		width: '80%',
		padding: 10,
		backgroundColor: '#21252b'
	},
	index: {
		color: '#000',
		borderColor: '#FECB00',
		backgroundColor: '#FECB00',
		borderStyle: 'solid',
		borderRadius: height * 0.05 * 0.5,
		justifyContent: 'center',
		alignItems: 'center',
		height: height * 0.05,
		width: height * 0.05
	},
	socialMediaContainer: {
		flex: 0.2,
		alignItems: 'center',
		height: 150
	},
	buttonRowContainer: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	footer: {
		height: 50,
		justifyContent: 'center',
		backgroundColor: '#FECB00',
		width: '100%'
	},
	footerText: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	dashCommittees: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingTop: 10,
		height: 400
	},
	dashboardContent: {
		paddingLeft: '5%',
		paddingRight: '5%'
	},
	headerOptionsContainer: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingLeft: '2%',
		paddingRight: '2%'
	},
	black: {
		color: 'black'
	},
	upcomingEvents: {
		alignItems: 'center',
		height: 100,
		justifyContent: 'center',
		padding: 20
	},
	eventListContainerFull: {
		backgroundColor: '#21252b'
	},
	eventEmptyText: {
		fontSize: 20,
		textAlign: 'center',
		padding: 20,
		height: 150
	},
};

const mapStateToProps = ({ user, members, events, elect, committees }) => {
	const { allMemberPoints } = members;
	const { sortedEvents } = events;
	const { election } = elect;
	const { committeesList } = committees;

	return {
		user,
		allMemberPoints,
		sortedEvents,
		election,
		committeesList
	};
};

const mapDispatchToProps = { loadCommittee };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);