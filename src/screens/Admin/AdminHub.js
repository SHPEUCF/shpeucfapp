import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { FlatList, SafeAreaView } from "react-native";
import { ListItem } from "react-native-elements";
import { NavBar } from "../../components/general";
import Ionicons from "react-native-vector-icons/Ionicons";

const menuItems = [
	{
		title: "Election",
		icon: "check",
		screen: "ElectionAdmin",
		privilege: "president"
	},
	{
		title: "Committees",
		icon: "assignment-ind",
		screen: "CommitteesAdmin",
		privilege: "eboard"
	},
	{
		title: "Members",
		icon: "people",
		screen: "MemberAdmin",
		privilege: "eboard"
	}
];

class AdminHub extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			page
		} = styles;

		return (
			<SafeAreaView style = { page }>
				<NavBar title = "Back End" back onBack = { () => Actions.pop() } />
				<FlatList
					keyExtractor = { this.keyExtractor }
					extraData = { this.state }
					data = { menuItems }
					renderItem = { this.renderItem }
				/>
			</SafeAreaView>
		);
	}

	keyExtractor = (item, index) => index

	renderItem = ({ item }) => {
		const {
			privilege
		} = this.props;

		if (privilege && item && privilege[item.privilege] && (!("privilege" in item) || privilege[item.privilege]))
			return (
				<ListItem
					containerStyle = {{ backgroundColor: "black", borderBottomColor: "white" }}
					removeClippedSubviews = { false }
					title = { item.title }
					titleStyle = {{ color: "white" }}
					leftIcon = {{ name: item.icon, color: "white" }}
					rightIcon = { <Ionicons
						name = "ios-arrow-dropright"
						size = { 22 }
						style = {{ color: "#FECB00" }}
					/> }
					onPress = { () => Actions[item.screen]() }
				/>
			);
	}
}

const styles = {
	page: {
		flex: 1,
		backgroundColor: "#0c0b0b"
	}
};

const mapStateToProps = ({ user }) => {
	const {
		privilege
	} = user;

	return { privilege };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHub)
