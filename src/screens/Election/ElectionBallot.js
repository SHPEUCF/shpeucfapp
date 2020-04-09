import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, NavBar, ButtonLayout } from "../../components/general";
import { Avatar } from "react-native-elements";
import _ from "lodash";
import { FlatList, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
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
} from "../../ducks";

const dimension = Dimensions.get("window");
const iterateesPos = ["level"];
const orderPos = ["asc"];
const iterateesCandidate = ["lastName", "firstName"];
const orderCandidate = ["asc", "asc"];
let dict = [];

class ElectionBallot extends Component {
	constructor(props) {
		super(props);
		this.renderCandidate = this.renderCandidate.bind(this);
	}

	state = {
		index: null,
		isBallotShow: true,
		isCandidate: false,
		applyPos: null,
		listCandidates: null,
		application: "Submit"
	};

	componentWillMount() {
		this.props.getPositions();
	}

	render() {
		const {
			page,
			contentStyle
		} = styles;
		const {
			positions
		} = this.props;

		const positionsArray = _.orderBy(positions, iterateesPos, orderPos);

		return (
			<SafeAreaView style = { page }>
				{ this.renderNavBar() }
				<View style = { contentStyle }>
					{ this.showBallot(positionsArray) }
					{ this.renderCandidate() }
				</View>
				{ this.renderButtons() }
			</SafeAreaView>
		);
	}

	_keyExtractor = (item, index) => index;

	showBallot(positionsArray) {
		if (!this.state.isBallotShow) return null;

		return (
			<FlatList
				data = { positionsArray }
				extraData = { this.state }
				keyExtractor = { this._keyExtractor }
				renderItem = { ({
					item, index
				}) =>
					this.renderCandidatesList(item, index) }
			/>
		);
	}

	renderCandidatesComponent(item) {
		const {
			containerStyle,
			contentContainerStyle,
			textStyle,
			textColor,
			candidateContainer
		} = styles;

		if (item.approved)
			return (
				<TouchableOpacity
					style = { candidateContainer }
					onPress = { () => {
						dict[this.state.index] = {
							key: item.position,
							value: item.id,
							first: item.firstName,
							last: item.lastName
						};
						this.setState({ isCandidate: false });
						this.setState({ isBallotShow: true });
					} }>
					<Text style = { [{ fontWeight: "bold", fontSize: 20, alignSelf: "center" }, textColor] }>
						{ item.firstName + " " + item.lastName }
					</Text>
					<View style = {{ flex: 1 }}>
						{ this.renderPicture(item) }
						<View style = { contentContainerStyle }>
							<View style = { containerStyle }>
								<Text style = { [textStyle, textColor] }>Plan: { item.plan }</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			);
	}

	renderPicture(item) {
		const {
			headerInfoContainer
		} = styles;

		return (
			<View style = { headerInfoContainer }>
				<Avatar
					xlarge
					rounded
					source = {{ uri: item.picture }}
					activeOpacity = { 0.7 }
				/>
			</View>
		);
	}

	renderCandidate() {
		const {
			tab,
			textStyle,
			textColor
		} = styles;

		if (!this.state.isCandidate) return null;

		return (
			<View style = {{ flex: 1 }}>
				<View style = { [tab, { flex: 0.05, backgroundColor: "#2C3239" }] }>
					<Text style = { [textStyle, textColor, { alignSelf: "center" }] }>{ this.state.applyPos }</Text>
				</View>
				<FlatList
					data = { this.state.listCandidates }
					extraData = { this.state }
					keyExtractor = { this._keyExtractor }
					renderItem = { ({
						item
					}) =>
						this.renderCandidatesComponent(item) }
				/>
				{ this.renderPositionVote() }
			</View>
		);
	}

	renderPositionVote() {
		const {
			tab,
			textStyle,
			textColor
		} = styles;
		let vote = dict[this.state.index];

		if (vote)
			return (
				<View style = { tab }>
					<View style = {{ flex: 2, alignItems: "center", justifyContent: "center" }}>
						<Text style = { [textStyle, textColor] }>You are voting for: { vote.first } { vote.last }</Text>
					</View>
				</View>
			);
	}

	renderCandidatesList(item, index) {
		const {
			container,
			textStyle,
			textColor
		} = styles;

		return (
			<View>
				<TouchableOpacity onPress = { () => {
					this.setState({
						isBallotShow: false,
						isCandidate: true,
						listCandidates: _.orderBy(item.candidates, iterateesCandidate, orderCandidate),
						applyPos: item.title,
						index: index
					});
					this.renderCandidate();
				} }>
					<View style = { [container, { flexDirection: "row" }] }>
						<Text style = { [textStyle, textColor, { flex: 6 }] }>{ `${item.title}` }</Text>
						<View style = {{ alignContent: "flex-start", width: 200 }}>
							{ this.renderAllVotes(index) }
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	renderAllVotes(index) {
		const {
			textStyle,
			textColor
		} = styles;

		let vote = dict[index];

		if (vote)
			return (
				<Text style = { [textStyle, textColor] }> { vote.first } { vote.last }</Text>
			);
	}

	renderButtons() {
		const {
			vote,
			id
		} = this.props;
		const {
			isBallotShow
		} = this.state;

		if (!isBallotShow)
			return (
				<Button title = "Ballot" onPress = { () => {
					this.setState({ isCandidate: false, isBallotShow: true });
				} } />
			);
		else
			return (
				<ButtonLayout>
					<Button
						title = "Submit" onPress = { () => {
							vote(id, dict);
							dict = [];
							Actions.popTo("Election");
						} }
					/>
					<Button
						title = "Cancel"
						onPress = { () => { Actions.pop() } }
					/>
				</ButtonLayout>
			);
	}

	renderNavBar() {
		const {
			isBallotShow
		} = this.state;

		return (
			<NavBar
				title = "Positions"
				back
				onBack = { () => {
					if (isBallotShow)
						Actions.pop();
					else
						this.setState({ isCandidate: false, isBallotShow: true });
				} }
			/>
		);
	}
}

const styles = {
	textColor: {
		color: "#e0e6ed"
	},
	textStyle: {
		fontWeight: "bold",
		fontSize: 18
	},
	page: {
		backgroundColor: "black",
		flex: 1
	},
	tab: {
		flexDirection: "row",
		paddingTop: 24,
		paddingBottom: 12,
		borderBottomWidth: 2,
		borderColor: "lightgrey",
		width: dimension.width * 1,
		alignItems: "center",
		justifyContent: "center"
	},
	contentStyle: {
		flex: 0.98
	},
	button: {
		paddingTop: dimension.height * 0.015,
		paddingBottom: dimension.height * 0.015,
		marginBottom: 8
	},
	buttonContainer: {
		flex: 0.2
	},
	candidateContainer: {
		flex: 1,
		backgroundColor: "#2C3239",
		padding: 20,
		borderBottomWidth: 1,
		borderColor: "#e0e6ed22"
	},
	container: {
		alignItems: "center",
		height: dimension.height * 0.1,
		backgroundColor: "black",
		padding: 10,
		paddingTop: 20,
		paddingBottom: 20
	},
	headerInfoContainer: {
		paddingTop: 15,
		paddingBottom: 15,
		flex: 0.6,
		backgroundColor: "#2C3239",
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: "gray",
		borderBottomWidth: 1,
		padding: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(ElectionBallot);
