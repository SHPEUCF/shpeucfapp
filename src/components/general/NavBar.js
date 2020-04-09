import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const dimension = Dimensions.get("window");

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		back: PropTypes.boolean
	}

	render() {
		const {
			tabBar,
			tabBarText,
			rowFlex,
			backButtonStyle
		} = styles;
		const {
			title,
			back,
			onBack,
			style,
			childComponent,
			childStyle
		} = this.props;

		if (back)
			return (
				<View style = { [tabBar, style, rowFlex] }>
					<View style = { backButtonStyle }>
						<Ionicons
							name = "ios-arrow-dropleft"
							size = { dimension.height * 0.03 }
							color = { "#FECB00" }
							onPress = { onBack }
						/>
					</View>
					<View>
						<Text style = { tabBarText }>{ title }</Text>
					</View>
					<View style = { childStyle }>
						{ childComponent }
					</View>
				</View>
			);
		else
			return (
				<View style = { [tabBar, style, rowFlex] }>
					<View>
						<Text style = { tabBarText }>{ title }</Text>
					</View>
					<View style = { childStyle }>
						{ childComponent }
					</View>
				</View>
			);
	}
}

const styles = {
	tabBar: {
		justifyContent: "flex-start",
		backgroundColor: "black",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		height: dimension.height * 0.1
	},
	tabBarText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		paddingLeft: "5%"
	},
	backButtonStyle: {
		height: dimension.height * 0.04,
		width: dimension.height * 0.04,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "5%"
	},
	rowFlex: {
		flexDirection: "row"
	}
};

NavBar.defaultProps = {
	back: false,
	childStyle: {
		flex: 1,
		padding: "3.5%"
	}
};

export { NavBar };