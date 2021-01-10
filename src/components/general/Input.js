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
				placeholderTextColor = "#5B6066"
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
		color: 'white',
		fontSize: 16,
		marginVertical: 10,
		padding: 10,
		paddingTop: 20,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderColor: 'white',
		borderBottomWidth: 0.5,
		borderRadius: 1
	}
};