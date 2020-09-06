import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Avatar } from "react-native-elements";
import FastImage from "react-native-fast-image";
import * as Progress from "react-native-progress";
import { Actions } from "react-native-router-flux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View, Dimensions, SafeAreaView } from "react-native";
import { NavBar, FilterList } from "../../components";
import { getVisitedMember, filterChanged } from "../../ducks";
import { verifiedCheckMark, rankMembersAndReturnsCurrentUser, truncateNames } from "../../utils/render";

const { height, width } = Dimensions.get("window");
const iteratees = ["points", "lastName", "firstName"];
const order = ["desc", "asc", "asc"];

class Leaderboard extends Component {
	constructor(props) {
		super(props);

		this.state = { search: false };
	}

	componentDidMount() {
		this.props.filterChanged("");
	}

	render() {
		const { screenBackground } = styles;
		const { allMemberAccounts, activeUser } = this.props;

		const sortedMembers = _.orderBy(allMemberAccounts, iteratees, order);
		const search = <Ionicons
			onPress = { () => { this.props.filterChanged(""); this.setState({ search: !this.state.search }) } }
			name = "ios-search"
			size = { height * 0.04 }
			color = "#FECB00"
		/>;

		rankMembersAndReturnsCurrentUser(sortedMembers, activeUser.id);

		return (
			<SafeAreaView style = {{ screenBackground }}>
				<NavBar back title = "Leaderboard" childComponent = { search } />
				<FilterList
					data = { sortedMembers }
					search = { this.state.search }
					placeholder = "Find user"
					regexFunc = { ({ firstName, lastName }) => `${firstName} ${lastName}` }
					onSelect = { ({ id }) => { this.props.getVisitedMember(id); Actions.OtherProfileM() } }
					itemJSX = { data => this.renderComponent(data, sortedMembers) }
				/>
			</SafeAreaView>
		);
	}

	renderComponent({ id, index, picture, color, points, paidMember, ...user }, sortedMembers) {
		const {
			row,
			position,
			progress,
			textStyle,
			indexText,
			userInfoContainer,
			userTextContainer,
			userContainerColor,
			itemContentContainer,
			contentContainerStyle
		} = styles;

		let currentUserTextStyle = (id === this.props.activeUser.id) ? userContainerColor : {};

		truncateNames(user);

		return (
			<View style = { contentContainerStyle }>
				<View style = { itemContentContainer }>
					<View style = { position }>
						<Text style = { indexText }>{ index }</Text>
					</View>
					<View>
						<View style = { userInfoContainer }>
							<View style = { userTextContainer }>
								<View style = { row }>
									<Text style = { [textStyle, { fontWeight: "bold" }, currentUserTextStyle] }>
										{ `${user.firstName} ${user.lastName}` }
									</Text>
									{ verifiedCheckMark({ paidMember }) }
								</View>
								<Text style = { [textStyle, { fontSize: 15 }, currentUserTextStyle] }>{ `Points: ${points}` }</Text>
							</View>
							{ !picture
								? <Avatar
									size = { height * 0.08 }
									rounded
									titleStyle = {{ backgroundColor: color }}
									overlayContainerStyle = {{ backgroundColor: color }}
									title = { `${user.firstName[0]}${user.lastName[0]}` }
								/>
								: <Avatar size = "large" rounded source = {{ uri: picture }} ImageComponent = { FastImage } />
							}
						</View>
						<Progress.Bar
							style = { progress }
							progress = { points / Math.max(sortedMembers[0].points, 1) }
							indeterminate = { false }
							height = { width * 0.03 }
							width = { width * 0.75 }
							color = "#ffd700"
						/>
					</View>
				</View>
			</View>
		);
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
		fontSize: width * 0.05
	},
	contentContainerStyle: {
		height: height * 0.18,
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
		fontSize: width * 0.05,
		color: "black"
	},
	position: {
		borderColor: "#FECB00",
		backgroundColor: "#FECB00",
		borderRadius: height * 0.06 * 0.5,
		marginRight: "4%",
		justifyContent: "center",
		height: height * 0.06,
		width: height * 0.06,
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
		paddingBottom: 10
	},
	userTextContainer: {
		paddingTop: 5,
		width: "62%"
	}
};

const mapStateToProps = ({ user: { activeUser }, members: { allMemberAccounts }, general: { filter } }) => (
	{ activeUser, filter, allMemberAccounts }
);
const mapDispatchToProps = { getVisitedMember, filterChanged };

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);