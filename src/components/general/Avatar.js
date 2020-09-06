import React from "react";
import FastImage from "react-native-fast-image";
import { TouchableOpacity, Text, Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

/**
 * @description Avatar component to be used with images or text.
 *
 * @typedef {Object} Props
 * @prop {String}                                    title       Text to display instead of an image.
 * @prop {Object}                                    titleStyle  Style of text style.
 * @prop {'square'|'circle'|'rounded'}               shape       Shape of Avatar.
 * @prop {Number|'small'|'medium'|'large'|'xlarge'}  size        Size of Avatar.
 * @prop {{uri: String}}                             source      Image source.
 * @prop {Function}                                  onPress     Called when the Avatar is pressed.
 * @prop {Object}                                    style       Additional style for Avatar.
 *
 * @param {...Props}
 */

export const Avatar = ({ title, titleStyle, shape = "circle", size = "medium", source, onPress, style }) => {
	let borderRadius;

	switch (size) {
		case "small":
			size = height * 0.05;
			break;
		case "medium":
			size = height * 0.09;
			break;
		case "large":
			size = height * 0.15;
			break;
		case "xlarge":
			size = height * 0.3;
	}

	switch (shape) {
		case "circle":
			borderRadius = size / 2;
			break;
		case "rounded":
			borderRadius = 15;
	}

	const { center } = styles;

	return (
		<TouchableOpacity
			activeOpacity = { (!onPress) ? 1 : 0.2 }
			onPress = { () => onPress && onPress() }
			style = { [style, center, { height: size, width: size, borderRadius }] }
		>
			{ source
				? <FastImage style = {{ height: size, width: size, borderRadius }} source = { source } />
				: <Text style = { [titleStyle, { fontSize: size / 2, color: "white" } ] }>{ title }</Text>
			}
		</TouchableOpacity>
	);
};

const styles = {
	center: {
		justifyContent: "center",
		alignItems: "center"
	}
};