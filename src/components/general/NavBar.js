import React from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height } = Dimensions.get("screen");

export const NavBar = props => {
	const { tabBar, tabBarText, rowFlex, backButtonStyle } = styles;
	const { title, back, onBack, style, childComponent, childStyle } = props;

	return (
		<View style = { [tabBar, style, rowFlex] }>
			{ back && <View style = { backButtonStyle }>
				<Ionicons name = "ios-arrow-dropleft" size = { height * 0.03 } color = "#FECB00" onPress = { onBack } />
			</View> }
			<Text style = { tabBarText }>{ title }</Text>
			<View style = { childStyle }>
				{ childComponent }
			</View>
		</View>
	);
};

NavBar.defaultProps = {
	back: false,
	onBack: () => Actions.pop()
};

const styles = {
	tabBar: {
		justifyContent: "flex-start",
		backgroundColor: "black",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		height: height * 0.1
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
		alignItems: "center",
		marginLeft: "5%"
	},
	rowFlex: {
		flexDirection: "row"
	}
};