import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { FlatList, View, Dimensions, SafeAreaView, Image } from "react-native";
import { connect } from "react-redux";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPrivilege, pageLoad, updateElection } from "../../ducks";

const dimension = Dimensions.get("window");

const menuItems = [
	{
		title: "Leaderboard",
		icon: "format-align-left",
		screen: "LeaderboardM",
		privilege: "user"
	},
	{
		title: "Election",
		icon: "done",
		screen: "Election",
		privilege: "user"
	},
	{
		title: "Committees",
		icon: "assignment-ind",
		screen: "Committees",
		privilege: "user"
	},
	{
		title: "About",
		icon: "info",
		screen: "About",
		privilege: "user"
	},
	{
		title: "BackEnd",
		icon: "settings",
		screen: "BackEnd",
		privilege: "eboard"
	}
];

var imageUrl = "../../assets/images/";

class More extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		};
	}

	render() {
		return (
			<SafeAreaView style = {{ backgroundColor: "#0c0b0b", flex: 1 }}>
				<View style = {{ height: dimension.height * 0.1, backgroundColor: "#FECB00", borderBottomWidth: 1, borderColor: "black", justifyContent: "center" }}>
					<Image
						source = { require(imageUrl + "SHPE_UCF_Logo.png") }
						style = {{ alignSelf: "center" }}
						height = { dimension.height * 0.06 }
						resizeMode = "contain"
					/>
				</View>
				<View>
					<FlatList
						removeClippedSubviews = { false }
						extraData = { this.props }
						keyExtractor = { this.keyExtractor }
						data = { menuItems }
						renderItem = { this.renderItem }
					/>
				</View>
				<View style = {{ justifyContent: "center", flex: 1, flexDirection: "row", backgroundColor: "black" }}>
					<Image
						source = { require(imageUrl + "SHPE_logo_FullColor-RGB-2x.png") }
						style = {{ alignSelf: "center" }}
						height = { dimension.height * dimension.width * 0.00025 }
						resizeMode = "contain"
					/>
				</View>
			</SafeAreaView>
		);
	}

	_onRefresh = () => {
		this.setState({ refreshing: false });
	}

	keyExtractor = (item, index) => index

	renderItem = ({	item }) => {
		const {
			election,
			privilege,
			apply
		} = this.props;

		if (item.title === "Election" && (!election && !apply || !privilege.paidMember))
			return null;
		if (privilege && privilege[item.privilege])
			return (
				<View>
					<ListItem
						containerStyle = {{ backgroundColor: "black", borderBottomColor: "black" }}
						removeClippedSubviews = { false }
						title = { item.title }
						titleStyle = {{ color: "white" }}
						leftIcon = {{ name: item.icon, color: "white" }}
						rightIcon = { <Ionicons
							name = "ios-arrow-dropright"
							size = { dimension.height * 0.025 }
							style = {{ color: "#FECB00" }}
						/> }
						onPress = { () => Actions[item.screen]() }
					/>
				</View>
			);
	}
}

const mapStateToProps = ({ user, general, elect }) => {
	const {
		privilege,
		dashColor
	} = user;
	const {
		loading
	} = general;
	const {
		election,
		apply
	} = elect;

	return { privilege, loading, election, apply, dashColor };
};

const mapDispatchToProps = {
	getPrivilege,
	pageLoad,
	updateElection
};

export default connect(mapStateToProps, mapDispatchToProps)(More);
