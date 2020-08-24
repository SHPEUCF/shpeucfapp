import React from "react";
import { View, Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

export const ButtonLayout = props => {
	const { buttonContainer, singleLayer, doubleLayer, layoutContainer } = styles;
	const { icon, children, containerStyle } = props;

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
				<View>
					<View style = { index && { paddingTop: height * 0.02 } }>
						{ item }
					</View>
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