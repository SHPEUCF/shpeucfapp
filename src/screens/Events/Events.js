import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, ButtonLayout, Agenda } from '../../components/';
import { formatEventListForCalendar, prepend0 } from '../../utils/events';
import { loadEvent, createEvent } from '../../ducks';
import { EventForm } from '../../data/FormData';
import { View, Dimensions, SafeAreaView } from 'react-native';

const dimension = Dimensions.get('window');

class Events extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 'closed',
			currentDay: this.getTodaysDate(),
			eventFormVisibility: false,
			agendaRefresh: false
	 };
	}

	didBlurSubscription = this.props.navigation.addListener('didBlur',
		() => this.setState({ agendaRefresh: !this.state.agendaRefresh })
	);

	getTodaysDate() {
		let date = new Date();
		let month = prepend0((date.getMonth() + 1).toString());
		let year = date.getFullYear();
		let day = prepend0(date.getDate().toString());

		return `${year}-${month}-${day}`;
	}

	static onRight = function() {
		Alert.alert(new Date());
	}

	render() {
		const { mainBackgroundColor, secondaryBackgroundColor, fullFlex } = styles;

		return (
			<SafeAreaView style = { [fullFlex, mainBackgroundColor] }>
				<View style = { [fullFlex, secondaryBackgroundColor] }>
					<View style = { fullFlex }>
						<EventForm
							title = 'Create Event'
							values = {{ date: this.state.currentDay }}
							visible = { this.state.eventFormVisibility }
							onSubmit = { event => createEvent(event) }
							changeVisibility = { (visible) => this.setState({ eventFormVisibility: visible }) }
						/>
						<Agenda
							passDate = { date => this.setState({ currentDay: date.dateString }) }
							items = { formatEventListForCalendar(this.props.sortedEvents) }
							style = {{ height: dimension.height * 0.73 }}
							refresh = { this.state.agendaRefresh }
						/>
					</View>
					{ this.renderButton() }
				</View>
			</SafeAreaView>
		);
	}

	renderButton() {
		const { activeUser } = this.props;

		return (
			<ButtonLayout>
				{ activeUser.privilege && activeUser.privilege.board && <Button
					title = 'Create Event'
					onPress = { () => this.setState({ eventFormVisibility: true }) }
				/> }
			</ButtonLayout>
		);
	}
}

const styles = {
	mainBackgroundColor: {
		backgroundColor: '#0c0b0b'
	},
	secondaryBackgroundColor: {
		backgroundColor: 'black'
	},
	fullFlex: {
		flex: 1
	}
};

const mapStateToProps = ({ events, user }) => {
	const { sortedEvents } = events;
	const { activeUser } = user;

	return { sortedEvents, activeUser };
};

const mapDispatchToProps = { loadEvent };

export default connect(mapStateToProps, mapDispatchToProps)(Events);