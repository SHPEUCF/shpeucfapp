import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { NavBar, CollapsibleView } from "../../components";
import { Text, SafeAreaView, SectionList, View } from "react-native";
const data = require("../../data/conferences.json");

class Conference extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { viewBackgroud, sectionContainer, sectionText } = styles;

		return (
			<SafeAreaView style = { viewBackgroud }>
				<NavBar title = "Conferences" back onBack = { () => Actions.pop() } />

				<SectionList
					sections = { data }
					keyExtractor = { (item, index) => index }
					renderItem = { ({ item }) => (
						<CollapsibleView headerTitle = { item.header }
							headerSubTitle1 = { item.location }
							headerSubTitle2 = { `${new Date(item.start).toDateString()} to ${new Date(item.end).toDateString()}` }
							bodyText = { item.summary }
							showHRImage = { true }
							headerImage = { item.picture }
							 />
					) }
					renderSectionHeader = { ({ section: { title } }) => (
						<View style = { sectionContainer }>
							<Text style = { sectionText }>{ title }</Text>
						</View>
					) }
				/>
			</SafeAreaView>
		);
	}
}

const styles = {
	viewBackgroud: {
		backgroundColor: "black",
		flex: 1
	},
	sectionContainer: {
		backgroundColor: "#21252b",
		padding: 10,
		marginHorizontal: 8,
		marginVertical: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		overflow: "hidden"

	},
	sectionText: {
		textAlign: "center",
		color: "#e0e6ed",
		fontSize: 35,
		fontWeight: "bold"
	}
};

export { Conference };