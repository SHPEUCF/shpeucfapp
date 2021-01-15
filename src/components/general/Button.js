import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Button = ({
	onPress,
	title,
	buttonStyle,
	textStyle,
	accessibilityLabel,
	numberOfLines,
	disabled,
	testID,
	height,
	width
}) => {
	const {
		bStyle,
		tStyle
	} = styles;

	return (
		<TouchableOpacity onPress = { onPress }>
			<View style = { [bStyle, buttonStyle, { height }, { width }] }>
				<Text
					style = { [tStyle, textStyle] }
					accessibilityLabel = { accessibilityLabel }
					numberOfLines = { numberOfLines }
					disabled = { disabled }
					testID = { testID }
					adjustsFontSizeToFit
				>
					{ title }
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = {
	tStyle: {
		flex: 1,
		color: '#000',
		textAlign: 'center',
		fontSize: 18
	},
	bStyle: {
		flexDirection: "row",
		backgroundColor: "#FFC107",
		borderRadius: 20,
		padding: 7
	}
};

Button.defaultProps = {
	buttonStyle: styles.bStyle,
	textStyle: styles.tStyle,
	numberOfLines: 1,
	title: "Put a Title!"
};

export { Button };