import React, { Component } from "react";
import { GeneralContent, NavBar } from "../components/general";
import { View, SafeAreaView } from "react-native";
import { Actions } from "react-native-router-flux";

class Version extends Component {
	render() {
		const {
			title, content, footer
		} = this.props;

		return (
			<SafeAreaView style = {{ backgroundColor: "#0c0b0b", flex: 1 }}>
				<NavBar title = "Version" back onBack = { () => Actions.pop() } />
				<View style = {{ backgroundColor: "black", flex: 1 }}>
					<GeneralContent
						title = { title }
						content = { content }
						footer = { footer }
					/>
				</View>
			</SafeAreaView>
		);
	}
}

export { Version };