import React, { Component } from "react";
import { Avatar, Icon, colors } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { ListItem } from "react-native-elements";
import { NavBar } from "../../components";
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Animated, Platform, UIManager, LayoutAnimation } from "react-native";
import { menuItems, developers } from "../../data/AboutItems.js";

export class Conference extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const { container } = styles;

		return (
			<View style = { [container] }>
				
			</View>
		);
	}
}

const styles = {
	container: {
		marginHorizontal: 8,
		backgroundColor: "#21252b",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		overflow: "hidden"
	},
	headerContainer: {
		flexDirection: "row",
		paddingVertical: 20,
		paddingHorizontal: 10,
		alignSelf: "baseline"

	},
	hrTextContainer: {
		flex: 1,
		marginHorizontal: 8
	},
	textStyle: {
		textAlign: "left",
		color: "#e0e6ed"
	},
	hrTitleText: {
		fontSize: 25
	},
	hrSubTxt1: {
		fontSize: 16,
		paddingTop: 8
	},
	hrSubTxt2: {
		fontSize: 12,
		paddingTop: 5
	},
	pictureStyle: {
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		overflow: "hidden"
	},
	bodyCollapseStyle: {
		paddingHorizontal: 10,
		paddingBottom: 20
	},
	bodyTextStyle: {
		fontSize: 16
	}
};