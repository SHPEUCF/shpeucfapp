import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { NavBar, FilterList, Avatar, ProgressBar, Icon } from "@/components";
import _ from "lodash";
import { Text, View, Dimensions, SafeAreaView } from "react-native";
import { verifiedCheckMark, rankMembersAndReturnsCurrentUser, truncateNames } from "@/utils/render";
import {
	getAllMemberPoints,
	getVisitedMember,
	pageLoad,
	getPrivilege,
	loadUser,
	filterChanged
} from "@/ducks";

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
		this.props.getAllMemberPoints();
	}

	keyExtractor = (item, index) => index;

	render() {
		const {
			screenBackground
		} = styles;
		const {
			allMemberAccounts,
			activeUser
		} = this.props;

		const sortedMembers = _.orderBy(allMemberAccounts, iteratees, order);

		rankMembersAndReturnsCurrentUser(sortedMembers, activeUser.id);

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
			userTextContainer,
			row
		} = styles;

		let currentUserTextStyle = item.id === this.props.activeUser.id ? userContainerColor : {};

		truncateNames(item);

		return (
			<View style = { contentContainerStyle }>
				<View style = { itemContentContainer }>
					<View style = { index }>
						<Text style = { indexText }>{ item.index }</Text>
					</View>
					<View >
						<View style = { userInfoContainer }>
							<View style = { userTextContainer }>
								<View style = { row }>
									<Text style = { [textStyle, { fontWeight: "bold" }, currentUserTextStyle] }>
										{ `${item.firstName} ${item.lastName}` }
									</Text>
									{ verifiedCheckMark(item) }
								</View>
								<Text style = { [textStyle, { fontSize: 15 }, currentUserTextStyle] }>
									Points: { item.points }
								</Text>
							</View>
							{ item.picture
								? <Avatar source = { item.picture } />
								: <Avatar
									title = { item.firstName[0].concat(item.lastName[0]) }
									titleStyle = {{ backgroundColor: item.color }}
								/> }
						</View>
						<ProgressBar
							style = { progress }
							progress = { item.points / Math.max(sortedMembers[0].points, 1) }
							height = { dimension.width * 0.03 }
							width = { dimension.width * 0.75 }
							color = "#ffd700"
						/>
					</View>
				</View>
			</View>
		);
	}

	searchButton() {
		return (
			<View style = {{ alignItems: "flex-end" }}>
				<Icon
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

	callUser(id) {
		this.props.pageLoad();
		this.props.getVisitedMember(id);
		Actions.OtherProfileM();
	}
}

const styles = {
	row: {
		alignItems: "center",
		flexDirection: "row"
	},
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
		color: "#FECB00"
	},
	progress: {
		marginTop: 10,
		justifyContent: "center",
		height: 13,
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
		paddingTop: 5,
		width: "62%"
	}
};

const mapStateToProps = ({ user, members, general }) => {
	const { allMemberAccounts } = members;
	const { activeUser } = user;
	const { filter } = general;

	return { activeUser, filter, allMemberAccounts };
};

const mapDispatchToProps = {
	getAllMemberPoints,
	getVisitedMember,
	pageLoad,
	getPrivilege,
	loadUser,
	filterChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);