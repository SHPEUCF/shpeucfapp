import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';

const dimension = Dimensions.get('window');

class ButtonLayout extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		icon: PropTypes.shape({})
	}

	render() {
		const {
			buttonContainer,
			doubleLayer
		} = styles;

		const {
			icon,
			children,
			containerStyle
		} = this.props;

		let buttonIndex = 0;
		let realButtons = [];
		let length;
		let layers = [];
		let iconVar;

		if (!children) {
			return null;
		}
		else if (!children.length) {
			if (children) {
				layers.push(
					this.renderSingleButton(children)
				);
			}
			// else return null;
		}
		else {
			children.forEach(function(child) {
				if (child) realButtons.push(child);
			});
		}

		length = realButtons.length;

		if (length % 2 === 1) {
			layers.push(
				this.renderSingleButton(realButtons[buttonIndex])
			);
			buttonIndex++;
		}

		for (; buttonIndex + 2 <= length; buttonIndex += 2) {
			iconVar = null;

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
			<View style = { containerStyle }>
				{ layers.map((item, index) =>
					<View>
						{ this.renderLayer(item, index) }
					</View>
				) }
			</View>
		);
	}

	renderLayer(item, index) {
		let layerPadding = {};

		if (index !== 0) layerPadding = { paddingTop: dimension.height * 0.02 };

		return (
			<View style = { layerPadding }>
				{ item }
			</View>
		);
	}

	renderSingleButton(item) {
		const {
			buttonContainer,
			singleLayer
		} = styles;

		return (
			<View style = { singleLayer }>
				<View style = { buttonContainer }>
					{ item }
				</View>
			</View>
		);
	}
}

const styles = {
	layoutContainer: {
		justifyContent: 'center',
		paddingTop: dimension.height * 0.03,
		paddingBottom: dimension.height * 0.03
	},
	buttonContainer: {
		flex: 0.45
	},
	singleLayer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	doubleLayer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	}
};

ButtonLayout.defaultProps = {
	containerStyle: styles.layoutContainer
};

export { ButtonLayout };