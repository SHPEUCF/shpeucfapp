import React from "react";
import { View, Dimensions, ViewStyle } from "react-native";

const { height } = Dimensions.get("screen");

/**
 * @desc Component to properly layout multiple button children,
 *       displaying them in rows with a max of two buttons per row.
 *
 * @typedef {Object} Props
 * @prop {Object}      icon            Icon to be displayed.
 * @prop {Number}      icon.layer      Position to display icon in between buttons.
 * @prop {JSX.Element} icon.data       Icon element.
 * @prop {ViewStyle}   containerStyle  Style for the button children container.
 *
 * @param {...Props}
 */

export const ButtonLayout = ({ icon, children, containerStyle }) => {
	const { buttonContainer, singleLayer, doubleLayer, layoutContainer } = styles;

	let buttonIndex = 0;
	let realButtons = [];
	let layers = [];
	let length;
	let iconVar;

	const renderSingleButton = item => (
		<View style = { singleLayer }>
			<View style = { buttonContainer }>
				{ item }
			</View>
		</View>
	);

	if (!children)
		return null;
	else if (children && !children.length)
		layers.push(renderSingleButton(children));
	else
		children.forEach(child => child && realButtons.push(child));

	if ((length = realButtons.length) % 2 === 1) {
		layers.push(renderSingleButton(realButtons[buttonIndex]));
		buttonIndex++;
	}

	for (; buttonIndex + 2 <= length; buttonIndex += 2, iconVar = null) {
		if (icon && Math.trunc(buttonIndex / 2) + 1 === icon.layer)
			iconVar = icon.data;

		layers.push(
			<View style = { doubleLayer }>
				<View style = { buttonContainer }>
					{ realButtons[buttonIndex] }
				</View>
				{ iconVar }
				<View style = { buttonContainer }>
					{ realButtons[buttonIndex + 1] }
				</View>
			</View>
		);
	}

	return (
		<View style = { containerStyle || layoutContainer }>
			{ layers.map((item, index) =>
				<View style = { index && { paddingTop: height * 0.02 } } key = { index }>
					{ item }
				</View>
			) }
		</View>
	);
};

const styles = {
	layoutContainer: {
		justifyContent: "center",
		paddingVertical: height * 0.03
	},
	buttonContainer: {
		flex: 0.45
	},
	singleLayer: {
		flexDirection: "row",
		justifyContent: "space-evenly"
	},
	doubleLayer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center"
	}
};