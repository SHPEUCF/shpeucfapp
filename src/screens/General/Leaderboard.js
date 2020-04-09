import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { NavBar, FilterList } from "../../components/general";
import _ from "lodash";
import * as Progress from "react-native-progress";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View, Dimensions, SafeAreaView } from "react-native";
import { rankMembers } from "../../utils/actions";
import {
	fetchMembersPoints,
	fetchMemberProfile,
	goToOtherProfile,
	pageLoad,
	getPrivilege,
	loadUser,
	filterChanged
} from "../../ducks";
import { StableAvatar } from "../../utils/actions";

const dimension = Dimensions.get("window");
const iteratees = ["points", "lastName", "firstName"];
const order = ["desc", "asc", "asc"];

class Leaderboard extends Component {
	constructor(props) {
		super(props);
		this.state = { search: false };
	}

	componentDidMount() {
		this.props.filterChanged("");
		this.props.loadUser();
		this.props.fetchMembersPoints();
	}

	keyExtractor = (item, index) => index;

	render() {
		const {
			screenBackground
		} = styles;

		const sortedMembers = _.orderBy(this.props.userList, iteratees, order);
		rankMembers(sortedMembers, this.props.id);

		return (
			<SafeAreaView style = { screenBackground }>
				<NavBar
					title = "Leaderboard"
					back
					onBack = { () => Actions.pop() }
					childComponent = { this.searchButton() }
					childStyle = {{ flex: 1, paddingRight: "10%" }}
				/>
				<FilterList
					title = { "Members" }
					type = "Searchbar"
					data = { sortedMembers }
					search = { this.state.search }
					placeholder = "Find user"
					regexFunc = { (data) => { return `${data.firstName} ${data.lastName}` } }
					onSelect = { (data) => this.callUser(data.id) }
					itemJSX = { (data) => this.renderComponent(data, sortedMembers) }
				/>
			</SafeAreaView>
		);
	}

	renderComponent(item, sortedMembers) {
		const {
			contentContainerStyle,
			progress,
			textStyle,
			index,
			indexText,
			userContainerColor,
			itemContentContainer,
			userInfoContainer,
			userTextContainer
		} = styles;

		let backgroundColor = item.id === this.props.id ? userContainerColor : {};

		return (
			<View style = { [contentContainerStyle, backgroundColor] }>
				<View style = { itemContentContainer }>
					<View style = { index }>
						<Text style = { indexText }>{ item.index }</Text>
					</View>
					<View >
						<View style = { userInfoContainer }>
							<View style = { userTextContainer }>
								<Text style = { [textStyle, { fontWeight: "bold" }] }>
									{ `${item.firstName} ${item.lastName}` }
								</Text>
								<Text style = { [textStyle, { fontSize: dimension.width * 0.04 }] }>
									Points: { item.points }
								</Text>
							</View>
							{ item.picture === ""
							&& <Avatar
								size = { dimension.height * 0.08 }
								rounded
								titleStyle = {{ backgroundColor: item.color }}
								overlayContainerStyle = {{ backgroundColor: item.color }}
								title = { item.firstName[0].concat(item.lastName[0]) }
							/>	}
							{ item.picture !== ""
							&& <StableAvatar
								item = { item }
							/> }
						</View>
						<Progress.Bar
							style = { progress }
							progress = { item.points / Math.max(sortedMembers[0].points, 1) }
							indeterminate = { false }
							height = { dimension.width * 0.03 }
							width = { dimension.width * 0.75 }
							color = { "#ffd700" }
						/>
					</View>
				</View>
			</View>
		);
	}

	searchButton() {
		return (
			<View style = {{ alignItems: "flex-end" }}>
				<Ionicons
					onPress = { () => {
						this.props.filterChanged("");
						this.setState({ search: !this.state.search });
					} }
					name = { "ios-search" }
					size = { dimension.height * 0.04 }
					color = { "#FECB00" }
				/>
			</View>
		);
	}

	viewBreakDown() {
		Actions.pointsBreakDown();
	}

	callUser(id) {
		this.props.pageLoad();
		this.props.fetchMemberProfile(id);
		this.props.goToOtherProfile();
	}
}

const styles = {
	screenBackground: {
		flex: 1,
		backgroundColor: "#0c0b0b"
	},
	textStyle: {
		color: "#e0e6ed",
		fontSize: dimension.width * 0.05
	},
	contentContainerStyle: {
		height: dimension.height * 0.18,
		backgroundColor: "black",
		alignItems: "flex-start",
		paddingHorizontal: 15
	},
	userContainerColor: {
		backgroundColor: "#FECB00"
	},
	progress: {
		justifyContent: "center",
		height: dimension.width * 0.03,
		borderColor: "#2C3239",
		backgroundColor: "#2C3239"
	},
	indexText: {
		alignSelf: "center",
		fontWeight: "700",
		fontSize: dimension.width * 0.05,
		color: "black"
	},
	index: {
		borderColor: "#FECB00",
		backgroundColor: "#FECB00",
		borderRadius: dimension.height * 0.06 * 0.5,
		marginRight: "4%",
		justifyContent: "center",
		height: dimension.height * 0.06,
		width: dimension.height * 0.06,
		elevation: 1,
		alignItems: "center"
	},
	itemContentContainer: {
		flexDirection: "row",
		 flex: 1,
		 alignItems: "center"
	},
	userInfoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingBottom: 20
	},
	userTextContainer: {
		paddingTop: 5
	}
};

const mapStateToProps = ({ user, members, general }) => {
	const {
		membersPoints,
		userList
	} = members;
	const {
		picture,
		id
	} = user;
	const {
		filter
	} = general;

	return { membersPoints, id, picture, filter, userList };
};

const mapDispatchToProps = {
	fetchMembersPoints,
	fetchMemberProfile,
	goToOtherProfile,
	pageLoad,
	getPrivilege,
	loadUser,
	filterChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);