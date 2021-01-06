import React, { Component } from "react";
import { Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { ListItem } from "react-native-elements";
import { NavBar } from "@/components";
import { version } from "../../../app.json";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, SafeAreaView, FlatList, Dimensions, Linking, TouchableOpacity } from "react-native";
import { menuItems, developers } from "@/data/AboutItems.js";

const { height } = Dimensions.get("window");

export class About extends Component {
	render() {
		const { textStyle, mainBackground, subBackground, center, titleStyle, contributorStyle, containerFlex, footer } = styles;

		return (
			<SafeAreaView style = { [subBackground, containerFlex] }>
				<NavBar
					back
					title = "About"
					childComponent = { <Text style = { [textStyle, { fontSize: 16, textAlign: "right" }] }>{ version }</Text> }
				/>
				<View style = { mainBackground }>
					{ menuItems.map(tab => this.renderTabs(tab)) }
				</View>
				<View style = { containerFlex }>
					<Text style = { [textStyle, titleStyle, { fontSize: 20 }] }>Developed by:</Text>
					<View style = {{ flexDirection: "row", justifyContent: "space-around" }}>
						{ developers.map(dev => this.renderDev(dev)) }
					</View>
					<TouchableOpacity onPress = { () => Linking.openURL("https://github.com/SHPEUCF/shpeucfapp/graphs/contributors") }>
						<Text style = { [textStyle, contributorStyle] }>...and our amazing contributors.</Text>
					</TouchableOpacity>
					<View style = { [center, footer] }>
						<Text style = { textStyle }>Copyright © 2018 SHPE UCF</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	renderTabs = ({	url, title, content, icon }) => {
		const { mainBackground, textStyle, titleStyle } = styles;

		return <ListItem
			containerStyle = { mainBackground }
			onPress = { () => Linking.openURL(url) }
			title = { title }
			titleStyle = { [textStyle, titleStyle, { padding: 0 }] }
			subtitle = { content }
			subtitleStyle = { textStyle }
			leftIcon = { <Ionicons name = { icon } size = { 26 } color = "white" /> }
			rightIcon = { <Ionicons name = "ios-arrow-dropright" size = { height * 0.025 } color = "#FECB00" /> }
		/>;
	}

	renderDev = ({ name, pic, github }) => {
		const { center, textStyle } = styles;

		const [firstName, lastName] = name.split(" ");

		return (
			<TouchableOpacity onPress = { () => Linking.openURL(github) }>
				<View style = { center }>
					<Avatar size = { height * 0.09 } rounded source = {{ uri: pic }} />
				</View>
				<View style = { center }>
					<Text style = { [textStyle, { fontSize: 16 }] }>{ firstName }</Text>
					<Text style = { [textStyle, { fontSize: 16 }] }>{ lastName }</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = {
	mainBackground: {
		backgroundColor: "#000"
	},
	subBackground: {
		backgroundColor: "#0c0b0b"
	},
	textStyle: {
		color: "#FFF",
		fontSize: 14
	},
	center: {
		alignItems: "center"
	},
	titleStyle: {
		fontWeight: "bold",
		padding: "4%",
		fontSize: 16
	},
	containerFlex: {
		flex: 1
	},
	contributorStyle: {
		alignSelf: "center",
		fontSize: 18,
		fontWeight: "bold",
		marginTop: "3%"
	},
	footer: {
		flex: 0.95,
		justifyContent: "flex-end"
	}
};