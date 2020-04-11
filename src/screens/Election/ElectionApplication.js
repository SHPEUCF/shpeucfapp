import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, Input, NavBar, ButtonLayout } from "../../components/general";
import _ from "lodash";
import { FlatList, Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar } from "react-native-elements";
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
		currentlyApplying: false,
		candidate: {
			approved: false,
			firstName: "",
			lastName: "",
			picture: "",
			position: "",
			plan: "",
			id: ""
		},
		index: null,
		positions: {}
	};

	componentWillReceiveProps(nextProps, prevState) {
		const {
			positions,
			id
		} = nextProps;

		if (positions !== prevState.positions) {
			let candidate = Object.assign({}, this.state.candidate);

			// Searches for current user within Candidates
			Object.entries(positions || {}).forEach(entry => {
				Object.values(entry[1].candidates || {}).forEach(possibleCandidate => {
					if (possibleCandidate.id === id) candidate = Object.assign({}, possibleCandidate);
				});
			});

			this.setState({ positions, candidate });
		}
	}

	componentDidMount() {
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

		const shouldShowApplication = currentlyApplying || applied;

		const content = shouldShowApplication ? this.showApplication() : this.renderPositions(positionsArray);

		return (
			<KeyboardAwareScrollView
				style = {{ backgroundColor: "#0c0b0b" }}
				resetScrollToCoords = {{ x: 0, y: 0 }}
				contentContainerStyle = {{ flexGrow: 1 }}
				scrollEnabled = { true }
				enableOnAndroid = { true }
			>
				<SafeAreaView style = { [page, fullFlex] }>
					<NavBar
						title = "Positions"
						back
						onBack = { () => {
							return !shouldShowApplication || applied
								? Actions.pop() : this.setState({ currentlyApplying: false });
						} } />
					<View style = { fullFlex }>
						{ content }
					</View>
					{ this.renderButtons() }
				</SafeAreaView>
			</KeyboardAwareScrollView>
		);
	}

	showApplication() {
		const {
			firstName,
			lastName,
			picture
		} = this.props;

		const {
			candidate,
			positionSelected
		} = this.state;

		const {
			fullFlex,
			textColor,
			fontLarge,
			titleStyle,
			inputContainer,
			column
		} = styles;

		return (
			<View style = { [fullFlex, column ] }>
				<Text style = { [fontLarge, textColor, titleStyle ] }>
					{ candidate.position || positionSelected }
				</Text>
				<Avatar
					size = { 200 }
					rounded
					titleStyle = { fontLarge }
					source = {{ uri: picture }}
				/>
				<Text style = { [fontLarge, textColor] }>
					{ firstName } { lastName }
				</Text>
				<Input
					numberOfLines = { 10 }
					style = { inputContainer }
					textAlignVertical = "top"
					maxLength = { 250 }
					blurOnSubmit = { true }
					multiline = { true }
					placeholder = "Please write your plan for members to read."
					value = { candidate.plan }
					onChangeText = { (plan) => {
						let tempCandidate = Object.assign(candidate);
						tempCandidate.plan = plan;
						this.setState({ candidate: tempCandidate });
					 } }
				/>
			</View>
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
				style = { [positionContainer, fullFlex] }
			>
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
			candidate,
			positionSelected
		} = this.state;

		let submitButton;

		if (currentlyApplying || applied)
			submitButton = <Button
				title = { (applied && "Edit " || "Submit ") + "Application" }
				onPress = { () => {
					if (!applied) {
						addApplication(firstName, lastName, candidate.plan,
									   positionSelected, picture);
						Actions.pop();
					}
					else {
						editApplication(candidate);
						Actions.pop();
					}
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
		else
			Actions.pop();
	}
}

const styles = {
	fontLarge: {
		fontSize: 20
	},
	fontSmall: {
		fontSize: 13
	},
	column: {
		justifyContent: "space-between",
		alignItems: "center"
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
	inputContainer: {
		flex: 0.5,
		width: "80%"
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
		fontWeight: "bold",
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