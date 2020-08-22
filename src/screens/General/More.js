import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Dimensions, SafeAreaView, Image } from "react-native";

const { height } = Dimensions.get("screen");

const menuItems = [
	{
		title: "Leaderboard",
		icon: "format-align-left",
		screen: "LeaderboardM",
		userPrivilege: "user"
	},
	{
		title: "Voting",
		icon: "done",
		screen: "ElectionBallot",
		userPrivilege: "paidMember"
	},
	{
		title: "E-Board Application",
		icon: "assignment",
		screen: "ElectionApplication",
		userPrivilege: "paidMember"
	},
	{
		title: "Committees",
		icon: "assignment-ind",
		screen: "Committees",
		userPrivilege: "user"
	},
	{
		title: "About",
		icon: "info",
		screen: "About",
		userPrivilege: "user"
	},
	{
		title: "BackEnd",
		icon: "settings",
		screen: "AdminHub",
		userPrivilege: "eboard"
	}
];

class More extends Component {
	render() {
		const { alignSelf, header, mainBackgroundColor, secondaryBackgroundColor, fullFlex } = styles;
		const imageUrl = "../../assets/images/";

		return (
			<SafeAreaView style = { [mainBackgroundColor, fullFlex] }>
				<View style = { [header, secondaryBackgroundColor] }>
					<Image
						source = { require(`${imageUrl}SHPE_UCF_Logo.png`) }
						style = { alignSelf }
						height = { height * 0.06 }
						resizeMode = "contain"
					/>
				</View>
				<View style = { fullFlex }>
					{ menuItems.map(tab => this.renderMenu(tab)) }
				</View>
				<View style = { [fullFlex, mainBackgroundColor] }>
					<Image
						source = { require(`${imageUrl}SHPE_logo_FullColor-RGB-2x.png`) }
						style = { alignSelf }
						height = { 80 }
						resizeMode = "contain"
					/>
				</View>
			</SafeAreaView>
		);
	}

	renderMenu = ({	title, icon, screen, userPrivilege }) => {
		const { election, activeUser: { privilege, apply } } = this.props;
		const { mainBackgroundColor, bottomBorder, primaryTextColor, secondaryTextColor } = styles;

		if ((title === "Voting" && !election) || (title === "E-Board Application" && !apply)) return null;

		if (privilege && privilege[userPrivilege]) {
			return <ListItem
				containerStyle = { [mainBackgroundColor, bottomBorder] }
				removeClippedSubviews = { false }
				title = { title }
				titleStyle = { primaryTextColor }
				leftIcon = {{ name: icon, color: "white" }}
				rightIcon = { <Ionicons name = "ios-arrow-dropright" size = { 22 } style = { secondaryTextColor } /> }
				onPress = { () => Actions[screen]() }
			/>;
		}
	}
}

const styles = {
	header: {
		height: "10%",
		justifyContent: "center"
	},
	mainBackgroundColor: {
		backgroundColor: "black"
	},
	secondaryBackgroundColor: {
		backgroundColor: "#FECB00"
	},
	bottomBorder: {
		borderBottomWidth: 1,
		borderColor: "black"
	},
	fullFlex: {
		flex: 1
	},
	primaryTextColor: {
		color: "white"
	},
	secondaryTextColor: {
		color: "#FECB00"
	},
	alignSelf: {
		alignSelf: "center"
	}
};

const mapStateToProps = ({ user: { activeUser }, general: { loading }, elect: { election, apply } }) => (
	{ loading, election, apply, activeUser }
);

export default connect(mapStateToProps)(More);