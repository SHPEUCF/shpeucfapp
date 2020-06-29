import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Input, Button, ButtonLayout } from "../general";
import { Actions } from "react-native-router-flux";
import {
	addPosition,
	editPosition,
	positionTitleChanged,
	positionDescriptionChanged,
	deletePosition
} from "../../ducks";

class PositionForm extends Component {
	// EventCreationError(text) {
	// 	this.props.eventError(text);
	// }
	constructor(props) {
		super(props);
		this.state = { oldTitle: this.props.positionTitle };
	}

	renderError() {
		if (this.props.error)
			return (
				<View>
					<Text style = { styles.errorTextStyle }>
						{ this.props.error }
					</Text>
				</View>
			);
	}

	onButtonPress() {
		const {
			positionTitle,
			candidatePlan,
			positionDescription,
			positions
		} = this.props;

		let length = positions && positions ? Object.entries(positions).length : 0;

		if (positionTitle === "") {
			// this.EventCreationError('Please enter a Candidate Name');
		}
		else if (candidatePlan === "") {
			// this.EventCreationError('Please enter a Plan of action');
		}
		else if (positionDescription === "") {
			// this.EventCreationError('Please enter a position');
		}
		else {
			if (this.props.title === "ADD")
				this.props.addPosition(positionTitle, positionDescription, length);
			else
			if (this.state.oldTitle !== positionTitle)
				this.props.editPosition(positionTitle, positionDescription, this.state.oldTitle);
			else
				this.props.editPosition(positionTitle, positionDescription, null);

			Actions.ElectionPositions();
		}
	}

	render() {
		return (
			<SafeAreaView style = { styles.formContainerStyle }>
				<View style = { styles.headerStyle }>
					<Text style = { styles.headerTextStyle }>{ this.props.title + " POSITION" }</Text>
					{ /* <Text style={styles.headerSubtitleStyle}>Registration</Text> */ }
				</View>
				<ScrollView
					ref = { (ref) => this.scrollView = ref }
					style = { styles.scrollView }>
					{ /* <RkAvoidKeyboard> */ }
					<View>
						<Input
							placeholder = "Position Title"
							value = { this.props.positionTitle }
							onChangeText = { this.props.positionTitleChanged.bind(this) }
						/>
						<Input
							placeholder = "Position Description"
							value = { this.props.positionDescription }
							onChangeText = { this.props.positionDescriptionChanged.bind(this) }
						/>
					</View>
					{ this.renderError() }
				</ScrollView>
				<ButtonLayout>
					<Button
						title = "Submit"
						onPress = { this.onButtonPress.bind(this) }
					/>
					<Button
						title = "Cancel"
						onPress = { Actions.ElectionPositions.bind(this) }
					/>
				</ButtonLayout>
			</SafeAreaView>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: "#E1E1E1",
		justifyContent: "flex-end"
	},
	formContainerStyle: {
		flex: 1,
		backgroundColor: "#0c0b0b"
	},
	headerStyle: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 40,
		marginBottom: 10
	},
	headerTextStyle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#e0e6ed"
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: "center",
		color: "red",
		fontWeight: "bold",
		padding: 10
	},
	pickerTextInput: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	scrollView: {
		backgroundColor: "black",
		height: "50%",
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: "5%",
		paddingRight: "5%"
	},
};

const mapStateToProps = ({ elect }) => {
	const {
		positionTitle,
		positionDescription,
		title,
		positions
	} = elect;

	return { positionTitle, positionDescription, title, positions };
};

const mapDispatchToProps = {
	addPosition,
	editPosition,
	positionTitleChanged,
	positionDescriptionChanged,
	deletePosition
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionForm);