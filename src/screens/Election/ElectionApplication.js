import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, Input, NavBar, ButtonLayout } from "../../components/general";
import _ from "lodash";
import { FlatList, Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
	getPositions,
	addApplication,
	editApplication
} from "../../ducks";

const iterateesPos = ["level"];
const orderPos = ["asc"];

class ElectionApplication extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		currentlyApplying: this.props.applied,
		positionSelected: "",
		candidatePlan: "",
		index: null
	};

	componentWillMount() {
		this.props.getPositions();
	}

	render() {
		const {
			currentlyApplying
		} = this.state;

		const {
			positions,
			applied
		} = this.props;

		const {
			page,
			fullFlex
		} = styles;

		const positionsArray = _.orderBy(positions, iterateesPos, orderPos);

		const content = currentlyApplying || applied ? this.showApplication() : this.renderPositions(positionsArray);

		return (
			<SafeAreaView style = { [page, fullFlex] }>
				<NavBar
					title = "Positions"
					back
					onBack = { () => {
						return currentlyApplying ? Actions.pop() : this.setState({ currentlyApplying: false });
					} } />
				<View style = { fullFlex }>
					{ content }
				</View>
				{ this.renderButtons() }
			</SafeAreaView>
		);
	}

	findActiveApplicationPosition() {
		let activeApplicationPosition = null;
		Object.entries(this.props.positions || {}).forEach(entry => {
			Object.values(entry[1].candidates || {}).forEach(candidate => {
				if (candidate.id === this.props.id) activeApplicationPosition = entry[0];
			});
		});

		return activeApplicationPosition;
	}

	showApplication() {
		const {
			firstName,
			lastName
		} = this.props;

		const {
			candidatePlan,
			positionSelected
		} = this.state;

		const {
			fullFlex,
			halfFlex,
			textColor,
			fontLarge,
			titleStyle
		} = styles;

		let activeApplicationPosition = this.findActiveApplicationPosition();

		return (
			<View style = { fullFlex }>
				<Text style = { [fontLarge, textColor, titleStyle ] }>
					{ activeApplicationPosition || positionSelected }
				</Text>
				<Text style = { [fontLarge, textColor] }>
					{ firstName } { lastName }
				</Text>
				<Text style = { [fontLarge, textColor] }>Plan:</Text>
				{ this.renderError() }
				<Input
					numberOfLines = { 10 }
					style = { halfFlex }
					textAlignVertical = "top"
					maxLength = { 250 }
					blurOnSubmit = { true }
					multiline = { true }
					placeholder = "Please write your plan for members to read."
					value = { candidatePlan }
					onChangeText = { (plan) => this.setState({ candidatePlan: plan }) }
				/>
			</View>
		);
	}

	renderError() {
		if (this.props.error)
			return (
				<Text style = { styles.errorfontLarge }>
					{ this.props.error }
				</Text>
			);
	}

	_keyExtractor = (item, index) => index;

	renderPositions(positionsArray) {
		return (
			<FlatList
				data = { positionsArray }
				extraData = { this.state }
				keyExtractor = { this._keyExtractor }
				renderItem = { ({ item }) => this.renderPositionComponent(item) }
			/>
		);
	}

	renderPositionComponent(item) {
		const {
			fontLarge,
			fontSmall,
			textColor,
			fullFlex,
			positionContainer
		} = styles;

		return (
			<TouchableOpacity
				onPress = { () => {
					this.setState({ currentlyApplying: true, positionSelected: item.title });
				} }
				style = { [positionContainer, fullFlex] }>
				<View>
					<Text style = { [fontLarge, textColor] }>{ item.title }</Text>
					<Text style = { [fontSmall, textColor] }>{ item.description }</Text>
				</View>
				<MaterialIcons
					name = "assignment"
					color = "#FECB00"
					size = { 35 }
				/>
			</TouchableOpacity>
		);
	}

	renderButtons() {
		const {
			firstName,
			lastName,
			applied,
			picture
		} = this.props;

		const {
			currentlyApplying,
			positionSelected,
			candidatePlan
		} = this.state;

		let submitButton;

		if (currentlyApplying || applied)
			submitButton = <Button
				title = { (applied && "Edit " || "Submit ") + "Application" }
				onPress = { () => {
					if (!applied)
						addApplication(firstName, lastName, candidatePlan, positionSelected, picture);
					else
						editApplication(candidatePlan, this.findActiveApplicationPosition());
				} }
			/>;

		return (
			<ButtonLayout>
				{ submitButton }
				<Button
					title = "Cancel"
					onPress = { () => this.stopApplication() }
				/>
			</ButtonLayout>
		);
	}

	stopApplication() {
		if (!this.props.applied && this.state.currentlyApplying)
			this.setState({ currentlyApplying: false });
		else Actions.pop();
	}
}

const styles = {
	fontLarge: {
		fontSize: 20
	},
	fontSmall: {
		fontSize: 13
	},
	textColor: {
		color: "#e0e6ed"
	},
	page: {
		backgroundColor: "black",
		paddingLeft: 10,
		paddingRight: 10
	},
	fullFlex: {
		flex: 1
	},
	halfFlex: {
		flex: 0.5
	},
	positionContainer: {
		paddingTop: "8%",
		paddingBottom: "5%",
		borderBottomColor: "#FFFA",
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	titleStyle: {
		fontweight: "bold",
		fontSize: 30
	}
};

const mapStateToProps = ({ elect, user }) => {
	const {
		positions
	} = elect;

	const {
		firstName,
		lastName,
		id,
		voted,
		applied,
		picture
	} = user;

	return {
		positions,
		firstName,
		lastName,
		id,
		voted,
		applied,
		picture
	};
};

const mapDispatchToProps = {
	getPositions
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionApplication);