import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonLayout, Agenda } from "../../components/";
import { formatEventListForCalendar } from "../../utils/events";
import { loadEvent } from "../../ducks";
import { EventForm } from "../../data/FormData";
import { View, Dimensions, SafeAreaView } from "react-native";

const dimension = Dimensions.get("window");
let dateStr = "";

class Events extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "closed",
			day: new Date(),
			eventFormVisibility: false,
			agendaRefresh: false
	 };
	 dateStr = this.getTodaysDate();
	}

	didBlurSubscription = this.props.navigation.addListener("didBlur",
		() => this.setState({ agendaRefresh: !this.state.agendaRefresh })
	);

	componentDidMount() {
		dateStr = this.getTodaysDate();
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

	render() {
		const { mainBackgroundColor, secondaryBackgroundColor, fullFlex } = styles;
		return (
			<SafeAreaView style = { [fullFlex, mainBackgroundColor] }>
				<View style = { [fullFlex, secondaryBackgroundColor] }>
					<View style = { [fullFlex] }>
						<EventForm
							title = "Create Event"
							initialValues = { [{ camelCaseName: "date", value: dateStr }] }
							visible = { this.state.eventFormVisibility }
							changeVisibility = { (visible) => this.setState({ eventFormVisibility: visible }) }
						/>
						<Agenda
							passDate = { (item) => dateStr = item.dateString }
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
					title = "Create Event"
					onPress = { () => this.setState({ eventFormVisibility: true }) }
				/> }
			</ButtonLayout>
		);
	}
}

const styles = {
	mainBackgroundColor: {
		backgroundColor: "#0c0b0b"
	},
	secondaryBackgroundColor: {
		backgroundColor: "black"
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