import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { NavBar, Button, ButtonLayout } from "../../components";
import _ from "lodash";
import { FlatList,	Text,	SafeAreaView,	Dimensions, View } from "react-native";
import {
	openElection,
	closeElection,
	getVotes,
	getPositions,
	closeApplications,
	openApplications,
	fetchMemberProfile
} from "../../ducks";

const dimension = Dimensions.get("window");
const iterateesCan = ["votes"];
const orderCan = ["desc"];
let winners = [];

class ElectionAdmin extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getVotes();
		this.props.getPositions();
	}

	render() {
		const {
			content,
			buttonContainerStyling,
			page,
			textColor
		} = styles;
		const {
			votes,
			positions
		} = this.props;

		let positionOrder = [];

		if (positions && votes) {
			const votesArray = Object.entries(votes);
			votesArray.forEach(function(item) {
				let posTitle = item[0];

				if (positions[posTitle])
					positionOrder[positions[posTitle].level] = [item[1], posTitle];
			});
		}

		return (
			<SafeAreaView style = { page }>
				<NavBar title = "Election" back onBack = { () => Actions.pop() } />
				<View style = { content }>
					<Text style = { textColor }>Total Votes: { this.props.numOfVotes }</Text>
				</View>
				<View style = {{ flex: 20 }}>
					{ this.renderFlatlist(positionOrder) }
				</View>
				<ButtonLayout>
					<View style = { buttonContainerStyling }>
						{ this.openOrClose() }
					</View>
					<View style = { buttonContainerStyling }>
						{ this.applyOpenOrClose() }
					</View>
					<View style = { buttonContainerStyling }>
						<Button
							onPress = { () => Actions.ElectionPositions() }
							title = { "Manage Positions" }
						>
						</Button>
					</View>
					<View style = { buttonContainerStyling }>
						<Button
							onPress = { () => Actions.ElectionCandidates() }
							title = { "Manage Candidates" }
						>
						</Button>
					</View>
				</ButtonLayout>
			</SafeAreaView>
		);
	}

	_keyExtractor = (item, index) => index;

	renderFlatlist(positionOrder) {
		return (
			<FlatList
				data = { positionOrder }
				extraData = { this.state }
				keyExtractor = { this._keyExtractor }
				renderItem = { ({ item, index	}) => this.renderVotes(item, index) }
			/>
		);
	}

	openOrClose() {
		if (this.props.election)
			return (
				<Button
					onPress = { () => this.props.closeElection() }
					title = { "Close Election" }
				/>
			);
		else
			return (
				<Button
					onPress = { () => this.props.openElection() }
					title = { "Open Election" }
				/>
			);
	}

	applyOpenOrClose() {
		if (this.props.apply)
			return (
				<Button
					onPress = { () => this.props.closeApplications() }
					title = { "Close Applications" }
				/>
			);
		else
			return (
				<Button
					onPress = { () => this.props.openApplications() }
					title = { "Open Applications" }
				/>
			);
	}

	renderVotes(item, index) {
		if (!item) return;

		const {
			containerStyle,
			contentContainerStyle,
			textColor
		} = styles;

		const candidatesArray = _.orderBy(item[0], iterateesCan, orderCan);
		let i = 0;
		let winnerIds = [candidatesArray[0]];
		let winnerString = `${candidatesArray[0].firstName} ${candidatesArray[0].lastName}`;

		while (i + 1 < candidatesArray.length && candidatesArray[i].votes === candidatesArray[i + 1].votes) {
			let nextCandidate = candidatesArray[i + 1];

			winnerIds.push(nextCandidate);
			winnerString = `${winnerString}, ${nextCandidate.firstName} ${nextCandidate.lastName}`;
			i++;
		}

		winners[index] = { String: winnerString, Ids: winnerIds, Position: item[1] };

		return (
			<View>
				<View style = { contentContainerStyle }>
					<View style = { containerStyle }>
						<Text style = { [{ fontWeight: "bold" }, textColor] }>{ item[1] }: { winners[index].String }</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = {
	tabBar: {
		height: dimension.height * 0.1,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "#0005"
	},
	tabBarText: {
		color: "#000",
		fontSize: 20,
		margin: 20,
		alignSelf: "center"
	},
	content: {
		flex: 1,
		margin: 10
	},
	containerStyle: {
		flex: 25,
		justifyContent: "center",
		alignItems: "flex-start",

		paddingVertical: 10,
		paddingHorizontal: 15
	},
	containerTextStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: "#ffd700",

		paddingVertical: 10,
		paddingHorizontal: 15
	},
	contentContainerStyle: {
		margin: 1,
		height: dimension.height * 0.09,
		flex: 1,
		flexDirection: "row",
		justifyContent: "center"

	},
	textColor: {
		color: "#e0e6ed"
	},
	buttonContainerStyle: {
		flex: 5,
		margin: 5
	},
	page: {
		flex: 1,
		backgroundColor: "black"
	}
};

const mapStateToProps = ({ elect, members }) => {
	const {
		election,
		votes,
		apply,
		numOfVotes,
		positions
	} = elect;
	const {
		firstName,
		lastName
	} = members;

	return { election, votes, apply, numOfVotes, firstName, lastName, positions };
};

const mapDispatchToProps = {
	openElection,
	closeElection,
	getVotes,
	getPositions,
	closeApplications,
	openApplications,
	fetchMemberProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(ElectionAdmin);
