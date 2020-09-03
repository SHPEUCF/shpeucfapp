import React from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height } = Dimensions.get("screen");

/**
 * @description Adds a navigation bar to the current screen.
 *
 * @typedef {Object} Props
 * @prop {String}       title           Text to display in navigation bar.
 * @prop {Boolean}      back            Display a back button to left of the title.
 * @prop {Function}     onBack          Called when back button is pressed.
 * @prop {Object}       style           Style of navigation bar.
 * @prop {JSX.Element}  childComponent  Component to display to right of title.
 * @prop {Object}       childStyle      Style of child component.
 *
 * @param {...Props}
 */

export const NavBar = ({ title, back, onBack, style, childComponent, childStyle }) => {
	const { tabBar, tabBarText, rowFlex, backButtonStyle } = styles;

	return (
		<View style = { [tabBar, style, rowFlex] }>
			{ back && <TouchableOpacity style = { backButtonStyle } onPress = { () => onBack() }>
				<Ionicons name = "ios-arrow-dropleft" size = { height * 0.03 } color = "#FECB00" />
			</TouchableOpacity> }
			<Text style = { tabBarText }>{ title }</Text>
			<View style = { childStyle }>
				{ childComponent }
			</View>
		</View>
	);
};

NavBar.defaultProps = {
	onBack: () => Actions.pop(),
	childStyle: { flex: 1, alignItems: "flex-end" }
};

const styles = {
	tabBar: {
		flexDirection: "row",
		backgroundColor: "black",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		height: height * 0.1,
		paddingHorizontal: "5%"
	},
	tabBarText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		paddingLeft: "5%"
	},
	backButtonStyle: {
		height: height * 0.04,
		width: height * 0.04,
		justifyContent: "center",
		alignItems: "center"
	}
};