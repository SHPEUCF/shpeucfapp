import React, { PureComponent } from "react";
import { TextInput } from "react-native";

/**
 * @description Input component with custom default props. *Accepts all `TextInput` props.*
 *
 * @extends TextInput
 */

export class Input extends PureComponent {
	render() {
		const { inputStyle } = styles;
		const { children, style, ...extraProps } = this.props;

		return (
			<TextInput
				style = { [inputStyle, style] }
				placeholderTextColor = "#DADFE1"
				underlineColorAndroid = "transparent"
				{ ...extraProps }
			>
				{ children }
			</TextInput>
		);
	}
}

Input.defaultProps = {
	maxLength: 45,
	autoCorrect: false,
	autoCapitalize: "sentences",
	placeholder: "Enter text here"
};

const styles = {
	inputStyle: {
		flex: 1,
		color: "#000",
		fontSize: 16,
		marginVertical: 8,
		padding: 15,
		backgroundColor: "white",
		borderRadius: 25
	}
};