import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, NavBar, SortableFlatList } from "../components/general";
import Ionicons from "react-native-vector-icons/Ionicons";
import _ from "lodash";
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import {
	getCommittees,
	deleteCommittee,
	goToCommitteeForm,
	editCommittee,
	fetchAllUsers,
	addCommittee,
	chairChanged,
	committeeDescriptionChanged,
	committeeTitleChanged,
	changeLevelsCom
} from "../ducks";

const dimension = Dimensions.get("window");
const iteratees = ["level"];
const order = ["asc"];

class CommitteesBackEnd extends Component {
	constructor(props) {
		super(props);
		this.renderCommittees = this.renderCommittees.bind(this);
	}

	componentDidMount() {
		this.props.getCommittees();
		this.props.fetchAllUsers();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.committeesList !== this.props.committeesList)
			this.setState({ data: _.orderBy(this.props.committeesList, iteratees, order).map((d, index) => ({
				committee: d,
				key: `item-${index}`,
				label: index,
				backgroundColor: "#fff"
			})) });
	}

	state = {
		data: _.orderBy(this.props.committeesList, iteratees, order).map((d, index) => ({
			committee: d,
			key: `item-${index}`,
			label: index,
			backgroundColor: "#fff"
		}))
	}

	render() {
		const {
			page
		} = styles;
		const {
			committeesList
		} = this.props;

		const committeesArray = _.toArray(committeesList);

		return (
			<SafeAreaView style = { page }>
				<NavBar title = "Committees" back onBack = { () => Actions.pop() } />
				{ this.renderFlatlist(committeesArray) }
				<View style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * 0.1, width: "100%" }}>
					<View style = {{ flex: 0.45 }}>
						<Button
							onPress = { () => this.setLevels() }
							title = { "Set Order" }
						/>
					</View>
					<View style = {{ flex: 0.45 }}>
						<Button
							onPress = { () => {
								this.props.committeeTitleChanged("");
								this.props.committeeDescriptionChanged("");
								this.props.chairChanged();
								this.props.goToCommitteeForm("ADD");
							} }
							title = { "Add Committees" }
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	_keyExtractor = (item, index) => index;

	renderFlatlist() {
		return (
			<View style = {{ flex: 1 }}>
				<SortableFlatList
					data = { this.state.data }
					extraData = { this.state }
					keyExtractor = { (item) => `draggable-item-${item.key}` }
					renderItem = { this.renderCommittees }
					scrollPercent = { 5 }
					onMoveEnd = { ({
						data
					}) => this.setState({ data }) }
				/>
			</View>
		);
	}

	renderCommittees({
		item, move, moveEnd, isActive
	}) {
		const {
			containerStyle,
			contentContainerStyle,
			textColor
		} = styles;

		const color = isActive ? { backgroundColor: "#ffd70066" } : { backgroundColor: "black" };

		return (
			<TouchableOpacity
				style = { [contentContainerStyle, color] }
				onLongPress = { move }
				onPressOut = { moveEnd }>
				<View style = { containerStyle }>
					<Text style = { textColor }>{ item.committee.title }</Text>
				</View>
				<View style = { styles.buttonContainerStyle }>
					<TouchableOpacity onPress = { () => this.viewCommittee(item.committee) }>
						<Ionicons style = { textColor } name = "md-create" size = { 40 } />
					</TouchableOpacity>
				</View>
				<View style = { styles.buttonContainerStyle }>
					<TouchableOpacity onPress = { () => this.delete(item.committee) }>
						<Ionicons style = { textColor } name = "md-trash" size = { 40 } />
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	}

	delete(committee) {
		this.setState({
			data: this.state.data.filter(item => item.committee !== committee)
		});

		this.props.deleteCommittee(committee.title, committee.chair);
	}

	viewCommittee(item) {
		this.props.committeeTitleChanged(item.title);
		this.props.committeeDescriptionChanged(item.description);
		this.props.chairChanged(item.chair);
		this.props.goToCommitteeForm("EDIT");
	}

	setLevels() {
		const {
			changeLevelsCom
		} = this.props;

		changeLevelsCom(this.state.data);
	}
}

const styles = {
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
		backgroundColor: "#2C3239",
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
		margin: 5,
		justifyContent: "center"
	},
	page: {
		flex: 1,
		backgroundColor: "#0c0b0b"
	}
};

const mapStateToProps = ({ committees, members }) => {
	const {
		committeesList
	} = committees;
	const {
		userList
	} = members;

	return { committeesList, userList };
};

const mapDispatchToProps = {
	getCommittees,
	goToCommitteeForm,
	deleteCommittee,
	addCommittee,
	editCommittee,
	chairChanged,
	committeeDescriptionChanged,
	committeeTitleChanged,
	changeLevelsCom,
	fetchAllUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitteesBackEnd);