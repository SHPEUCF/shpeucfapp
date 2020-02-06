import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, NavBar } from "../components/general";
import { Text, View } from "react-native";
import {
	getPositions,
	goToOtherProfile,
	pageLoad,
	getPrivilege,
	addApplication,
	candidateFNameChanged,
	candidateLNameChanged,
	candidatePlanChanged,
	candidatePositionChanged,
	goToCandidateForm,
	vote,
	editApplication
} from "../ducks";

class Election extends Component {
	render() {
		const {
			election,
			apply
		} = this.props;
		const {
			page,
			content,
			textStyle,
			textColor
		} = styles;

		let applyButton;
		let voteButton;

		if (apply)
			applyButton = <Button
				title = "Run For Office"
				onPress = { () => { Actions.ElectionApplication()	} }
			/>;
		if (election)
			voteButton = <Button
				title = "Vote"
				onPress = { () => {
					!this.props.voted ? Actions.ElectionBallot() : alert("You already voted!");
				} }
			/>;

		return (
			<View style = { page }>
				<NavBar
					title = "Election Candidates"
					back
					onBack = { () => Actions.pop() }
				/>
				<View style = { content }>
					<View style = {{ flex: 0.6, paddingTop: 30 }}>
						<Text style = { [textStyle, { fontWeight: "bold" }, textColor] }>"Don't Boo, Vote"</Text>
						<Text style = { [textStyle, { fontWeight: "bold", alignSelf: "center" }, textColor] }>{ /* whitespace */ }- Barack Obama</Text>
					</View>
				</View>
				{ /* <Text style={[textStyle, textColor]}>Your vote today is having a huge impact on the path that SHPE UCF is paving for the future</Text> */ }
				{ applyButton }
				{ voteButton }
			</View>
		);
	}
}

const styles = {
	page: {
		flex: 1,
		backgroundColor: "#2C3239",
		paddingBottom: 10
	},
	textStyle: {
		flex: 0.2,
		fontSize: 20

	},
	textColor: {
		color: "#e0e6ed"
	},
	content: {
		flex: 1,
		padding: 20
	}
};

const mapStateToProps = ({ elect, user }) => {
	const {
		election,
		positions,
		candidatePlan,
		apply
	} = elect;
	const {
		firstName,
		lastName,
		id,
		voted,
		applied
	} = user;

	return { election, positions, candidatePlan, firstName, lastName, id, voted, apply, applied };
};

const mapDispatchToProps = {
	getPositions,
	goToOtherProfile,
	pageLoad,
	getPrivilege,
	addApplication,
	goToCandidateForm,
	candidateFNameChanged,
	candidateLNameChanged,
	candidatePlanChanged,
	candidatePositionChanged,
	vote,
	editApplication
};

export default connect(mapStateToProps, mapDispatchToProps)(Election);