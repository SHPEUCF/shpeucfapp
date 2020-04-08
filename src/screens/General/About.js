import React, { Component } from "react";
import { Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { ListItem } from "react-native-elements";
import { NavBar } from "../../components/general";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, SafeAreaView, FlatList, Dimensions, Linking, TouchableOpacity } from "react-native";
import list from "../../data/AboutItems.json";

const dimension = Dimensions.get("window");

class About extends Component {
	render() {
		const {
			textColor,
			bgColor,
			center,
			titleStyle,
			contributorStyle,
			containerFlex,
			footer
		} = styles;

		return (
			<SafeAreaView style = { [{ backgroundColor: "#0c0b0b" }, containerFlex] }>
				<NavBar title = "About" back onBack = { () => Actions.pop() } childComponent = { this.version() } />
				<View style = { bgColor }>
					<FlatList
						keyExtractor = { this.keyExtractor }
						data = { list.menu }
						renderItem = { this.renderItem }
					/>
				</View>
				<View style = { containerFlex }>
					<Text style = { [textColor, titleStyle, { fontSize: 20 }] }>Developed by:</Text>
					<View>
						<FlatList
							numColumns = { 3 }
							columnWrapperStyle = {{ justifyContent: "space-around" }}
							data = { list.developers }
							renderItem = { this.renderDev }
							keyExtractor = { this.keyExtractor }
						/>
					</View>
					<TouchableOpacity onPress = { () =>
						Linking.openURL("https://github.com/SHPEUCF/shpeucfapp/graphs/contributors") }
					>
						<Text style = { [textColor, contributorStyle] }>
							...and our amazing contributors.
						</Text>
					</TouchableOpacity>
					<View style = { [center, footer] }>
						<Text style = { textColor }>Copyright © 2018 SHPE UCF</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	keyExtractor = (item, index) => index

	version = () => {
		const {
			textColor,
			size
		} = styles;

		return (
			<View style = {{ alignItems: "flex-end" }}>
				<Text style = { [textColor, size] }>
					v1.1
				</Text>
			</View>
		);
	}

	renderItem = ({	item }) => {
		const {
			titleWeight,
			bgColor,
			textColor
		} = styles;

		return (
			<View>
				<ListItem
					containerStyle = { bgColor }
					onPress = { () => Linking.openURL(item.url) }
					title = { item.title }
					titleStyle = { [titleWeight, textColor] }
					subtitle = { item.content }
					subtitleStyle = { textColor }
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
			textColor,
			textSize
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
					<Text style = { [textColor, textSize] }>{ firstName }</Text>
					<Text style = { [textColor, textSize] }>{ lastName }</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = {
	bgColor: {
		backgroundColor: "#000"
	},
	textColor: {
		color: "#FFF"
	},
	textSize: {
		fontSize: 16
	},
	center: {
		alignItems: "center"
	},
	titleStyle: {
		fontWeight: "bold",
		padding: "4%"
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