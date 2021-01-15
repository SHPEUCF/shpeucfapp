import React, { Component } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { Actions } from "react-native-router-flux";
import { View, SafeAreaView, Text, Image, StatusBar, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");
const data = [
	{
		title: "Stay Connected",
		text: "Stay up-to-date with upcoming GBMs, workshops, social events, networking oppurtunities, and more!",
		image: require("../../assets/images/welcome1.jpg")
	},
	{
		title: "Get Involved",
		text: "Subscribe to committees, RSVP to events, vote in club elections, and keep track of your points as you rise through the leaderboard ranks!",
		image: require("../../assets/images/welcome2.jpg")
	},
	{
		title: "Welcome to the Familia",
		text: "We're glad to have you join the SHPE UCF famila!\nWe can't wait to see you succeed alongside us.\n\n Now lets get you all set up. . .",
		image: require("../../assets/images/welcome3.jpg")
	}
];

export const Welcome = () => {

renderItem = ({ item }) => {
	const { title, image, text } = item;
	return (
		<View style = { styles.slide }>
			<Text style = { styles.title }>{ title }</Text>
			<Image style = { styles.image } source = { image }/>
			<Text style = { styles.text }>{ text }</Text>
		</View>
	);
};

renderPagination = (activeIndex) => {
	return (
		<View style = { styles.paginationContainer }>
			<SafeAreaView>
				<View style = { styles.paginationDots }>
					{ data.length > 1 && data.map((_, i) => (
						<TouchableOpacity
							key = { i }
							style = { [ styles.dot, 
								i === activeIndex ? { backgroundColor: "#FFC107" } 
								: { backgroundColor: "rgba(0, 0, 0, 0.2)" } 
							] }
						/>
					))}
				</View>
				<View style = { styles.buttonContainer }>
					<TouchableOpacity style = { styles.button } onPress = { () => Actions.login() }>
						<Text style = { styles.buttonText }>Let's Go!</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

return (
		<View style = {{ flex: 1 }}>
			<StatusBar translucent backgroundColor = "transparent" />
			<AppIntroSlider
				keyExtractor = { (item) => item.title }
				renderItem = { this.renderItem }
				renderPagination = { this.renderPagination }
				data = { data }
			/>
		</View>
	);
}

const styles = {
	slide: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		paddingBottom: 69,
	},
	image: {
		width: 320,
		height: 320,
		marginVertical: 32,
		marginBottom: 50
	},
	text: {
		fontFamily: "Poppins-Light",
		color: "#000000",
		textAlign: "center",
		maxWidth: width * .8
	},
	title: {
		fontFamily: "Poppins-Regular",
		fontSize: 22,
		color: "#000000",
		textAlign: "center"
	},
	paginationContainer: {
		position: "absolute",
		bottom: 16,
		left: 16,
		right: 16
	},
	paginationDots: {
		height: 50,
		margin: 16,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 4
	},
	buttonContainer: {
		flexDirection: "row",
		marginHorizontal: 24
	},
	button: {
		flex: 1,
		paddingVertical: 8,
		marginHorizontal: 8,
		borderRadius: 24,
		backgroundColor: "#FFC107"
	},
	buttonText: {
		fontFamily: "Poppins-Regular",
		color: "#ffffff",
		fontSize: 17,
		textAlign: "center"
	}
};