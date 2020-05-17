import React, { Component } from "react";
import { Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { ListItem } from "react-native-elements";
import { NavBar } from "../../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, SafeAreaView, FlatList, Dimensions, Linking, TouchableOpacity } from "react-native";
import { menuItems, developers } from "../../data/AboutItems.js";

const dimension = Dimensions.get("window");

class About extends Component {
	render() {
		const {
			textStyle,
			mainBackground,
			subBackground,
			center,
			titleStyle,
			contributorStyle,
			containerFlex,
			footer
		} = styles;

		return (
			<SafeAreaView style = { [subBackground, containerFlex] }>
				<NavBar title = "About" back onBack = { () => Actions.pop() } childComponent = { this.version() } />
				<View style = { mainBackground }>
					<FlatList
						keyExtractor = { this.keyExtractor }
						data = { menuItems }
						renderItem = { this.renderItem }
					/>
				</View>
				<View style = { containerFlex }>
					<Text style = { [textStyle, titleStyle, { fontSize: 20 }] }>Developed by:</Text>
					<View>
						<FlatList
							numColumns = { 3 }
							columnWrapperStyle = {{ justifyContent: "space-around" }}
							data = { developers }
							renderItem = { this.renderDev }
							keyExtractor = { this.keyExtractor }
						/>
					</View>
					<TouchableOpacity onPress = { () =>
						Linking.openURL("https://github.com/SHPEUCF/shpeucfapp/graphs/contributors") }
					>
						<Text style = { [textStyle, contributorStyle] }>
							...and our amazing contributors.
						</Text>
					</TouchableOpacity>
					<View style = { [center, footer] }>
						<Text style = { textStyle }>Copyright © 2018 SHPE UCF</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	keyExtractor = (item, index) => index

	version = () => {
		const {
			textStyle
		} = styles;

		return (
			<View style = {{ alignItems: "flex-end" }}>
				<Text style = { [textStyle, { fontSize: 16 }] }>
					v1.1
				</Text>
			</View>
		);
	}

	renderItem = ({	item }) => {
		const {
			mainBackground,
			textStyle,
			titleStyle
		} = styles;

		return (
			<View>
				<ListItem
					containerStyle = { mainBackground }
					onPress = { () => Linking.openURL(item.url) }
					title = { item.title }
					titleStyle = { [textStyle, titleStyle, { padding: 0 }] }
					subtitle = { item.content }
					subtitleStyle = { textStyle }
					leftIcon = { <Ionicons
						name = { item.icon }
						size = { 26 }
						color = { "#FFF" }
					/> }
					rightIcon = { <Ionicons
						name = "ios-arrow-dropright"
						size = { dimension.height * 0.025 }
						color = { "#FECB00" }
					/> }
				/>
			</View>
		);
	}

	renderDev = ({ item }) => {
		const {
			center,
			textStyle
		} = styles;

		let idx = item.name.indexOf(" ");
		let firstName = item.name.substring(0, idx);
		let lastName = item.name.substring(idx + 1);

		return (
			<TouchableOpacity onPress = { () => Linking.openURL(item.github) }>
				<View style = { center }>
					<Avatar
						size = { dimension.height * 0.09 }
						rounded
						source = {{ uri: item.pic }}
					/>
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

export { About };