import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, Input, NavBar } from "../../components/general";
import _ from "lodash";
import { FlatList, Text, View, Dimensions } from "react-native";
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

class ElectionApplication extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		isApplyShow: false,
		index: null,
		isListShow: true,
		applyPos: null,
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
			<View style = { page }>
				{ this.renderNavBar() }
				<View style = { contentStyle }>
					{ this.showListPosition(positionsArray) }
					{ this.showApplyPosition() }
				</View>
				{ this.renderButtons() }
			</View>
		);
	}

	showApplyPosition() {
		const {
			applyTitle,
			applyInput,
			textColor,
			textStyle
		} = styles;

		if (!this.state.isApplyShow) return null;

		return (
			<View style = {{ flex: 1 }}>
				<View style = {{ flex: 1, margin: 8 }}>
					<Text style = { [applyTitle, textColor] }>{ this.state.applyPos }</Text>
					<View style = {{ marginTop: 10, marginBottom: 8 }}>
						<Text style = { [textStyle, textColor] }>Name: { this.props.firstName } { this.props.lastName }</Text>
					</View>
					<Text style = { [textStyle, textColor] }>Plan:</Text>
					{ this.renderError() }
					<View style = {{ flex: 1 }}>
						<Input style = { applyInput }
							blurOnSubmit = { true }
							multiline = { true }
							placeholder = "Please write your plan for members to read."
							value = { this.props.candidatePlan }
							onChangeText = { this.onPlanChange.bind(this) }
						/>
					</View>
				</View>
			</View>
		);
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

	_keyExtractor = (item, index) => index;

	showListPosition(positionsArray) {
		if (!this.state.isListShow) return null;

		return (
			<View>
				<FlatList
					data = { positionsArray }
					extraData = { this.state }
					keyExtractor = { this._keyExtractor }
					renderItem = { ({ item }) => {
						if (this.props.applied)
							return this.renderListPositionApplied(item);
						else
							return this.renderListPositionComponent(item);
					} }
				/>
			</View>
		);
	}

	renderListPositionComponent(item) {
		const {
			button,
			textStyle,
			textColor
		} = styles;
		this.state.application = "Submit";

		return (
			<View style = {{ flex: 1, margin: 8, borderBottomWidth: 1, borderColor: "grey" }}>
				<View style = {{ marginBottom: 10 }}>
					<Text style = { [textStyle, textColor] }>Position: { item.title }</Text>
				</View>
				<View style = {{ marginLeft: 12, marginRight: 10, marginBottom: 8 }}>
					<Text style = { [textStyle, textColor] }>Role: { item.description }</Text>
				</View>
				<View style = { button } >
					<Button
						title = { `Apply for ${item.title}` }
						onPress = { () => { this.setState({ isListShow: false }); this.setState({ isApplyShow: true }); this.setState({ applyPos: item.title }) } } />
				</View>
			</View>
		);
	}

	renderListPositionApplied(item) {
		const {
			textStyle,
			textColor
		} = styles;

		return (
			<View style = {{ flex: 1, margin: 8, borderBottomWidth: 1, borderColor: "grey" }}>
				<View style = {{ marginBottom: 10 }}>
					<Text style = { [textStyle, textColor] }>Position: { `${item.title}` }</Text>
				</View>
				<View style = {{ marginLeft: 12, marginRight: 10, marginBottom: 8 }}>
					<Text style = { [textStyle, textColor] }>Role: { `${item.description}` }</Text>
				</View>
				{ this.renderEditButton(item) }
			</View>
		);
	}

	renderEditButton(item) {
		const {
			button
		} = styles;
		const {
			id
		} = this.props;

		let query = _.get(item, ["candidates", id], null);

		this.state.application = "Edit";

		if (query && !query.approved)
			return (
				<View style = { button } >
					<Button
						title = { "Edit Application" }
						onPress = { () => {
							this.setState({ isListShow: false, isApplyShow: true, applyPos: item.title });
							this.props.candidatePlanChanged(query.plan);
						} } />
				</View>
			);
		else if (query && query.approved)
			return (
				<View style = {{ marginLeft: 12, marginRight: 10, marginBottom: 8 }}>
					<Text style = {{ fontSize: 16, fontWeight: "400", lineHeight: 25 }}>You've been approved! Good Luck!</Text>
				</View>
			);
	}

	onPlanChange(text) {
		this.props.candidatePlanChanged(text);
	}

	renderButtons() {
		const {
			firstName,
			lastName,
			candidatePlan,
			addApplication,
			buttonContainer,
			picture
		} = this.props;
		const {
			application,
			applyPos,
			isListShow
		} = this.state;

		let p1;

		if (!isListShow)
			p1 = <Button
				title = { application }
				onPress = { () => {
					if (application === "Submit")
						addApplication(firstName, lastName, candidatePlan, applyPos, picture);
					else
						editApplication(candidatePlan, applyPos);
					this.setState({ isApplyShow: false, isListShow: true });
				} }
			/>;

		return (
			<View style = { buttonContainer }>
				{ p1 }
				<Button
					title = "Cancel"
					onPress = { () => {
						if (isListShow)
							Actions.pop();
						else
							this.setState({ isApplyShow: false, isListShow: true, applyPos: null });
					} }
				/>
			</View>
		);
	}

	renderNavBar() {
		const {
			isListShow
		} = this.state;

		return (
			<NavBar
				title = "Positions"
				back
				onBack = { () => {
					if (isListShow)
						Actions.pop();
					else
						this.setState({ isApplyShow: false, isListShow: true, applyPos: null });
				} }
			/>
		);
	}
}

const styles = {
	applyTitle: {
		alignSelf: "center",
		fontSize: 20,
		fontWeight: "bold"
	},
	containerStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	contentStyle: {
		flex: 1
	},
	textStyle: {
		fontSize: 18
	},
	textColor: {
		color: "#e0e6ed"
	},
	button: {
		paddingTop: dimension.height * 0.015,
		paddingBottom: dimension.height * 0.015,
		marginBottom: 8
	},
	buttonContainer: {
		flex: 0.4
	},
	page: {
		backgroundColor: "#2C3239",
		flex: 1
	},
	applyInput: {
		flex: 0.4,
		textAlignVertical: "top",
		height: dimension.height * 0.3
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
		applied,
		picture
	} = user;

	return {
		election,
		positions,
		candidatePlan,
		firstName,
		lastName,
		id,
		voted,
		apply,
		applied,
		picture
	};
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

export default connect(mapStateToProps, mapDispatchToProps)(ElectionApplication);

