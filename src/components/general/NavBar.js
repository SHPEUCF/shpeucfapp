import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		text: PropTypes.string,
		back: PropTypes.boolean
	}

	render() {
		const {
			tabBar,
			tabBarText,
			childStyle
		} = styles;
		const {
			title,
			back,
			onBack,
			childComponent,
			style
		} = this.props;

		if (back)
			return (
				<View style = { [tabBar, style, { flexDirection: "row" }] }>
					<View style = {{ height: dimension.height * 0.04, width: dimension.height * 0.04, justifyContent: "center", alignItems: "center", marginLeft: "5%" }}>
						<Ionicons
							name = "md-arrow-back"
							size = { dimension.height * 0.03 }
							onPress = { onBack } style = {{ color: "#FECB00" }}
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
				<View style = { [tabBar, style, { flexDirection: "row" }] }>
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

NavBar.defaultProps = {
	back: false
};

const dimension = Dimensions.get("window");

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
	childStyle: {
		paddingRight: "3%"
	}
};

export { NavBar };