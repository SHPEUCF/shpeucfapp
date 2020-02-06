import React, { Component } from "react";
import { Text, View } from "react-native";

class ComingSoon extends Component {
	render() {
		return (
			<View style = { styles.container }>
				<Text>Coming Soon!</Text>
				<Text>{ this.props.title }</Text>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
};

export { ComingSoon };