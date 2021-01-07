import React, { Children } from 'react';
import { View, Text, TouchableOpacity, TextProps, TouchableOpacityProps } from 'react-native';
import { Icon } from './';

/**
 * @desc Main title for item.
 * @param {TextProps}
 */

const Title = ({ style, children, ...props }) => (
	children ? <Text style = { [styles.titleStyle, style] } { ...props }>{ children }</Text> : null
);

/**
 * @desc Subtitle text for item.
 * @param {TextProps}
 */

const Subtitle = ({ style, children, ...props }) => (
	children ? <Text style = { [styles.textStyle, style] } { ...props }>{ children }</Text> : null
);

/**
 * @typedef {Object} IconProps
 * @prop {String}   props.name   Icon name.
 * @prop {Number?}  props.size   Icon size in pixels.
 * @prop {String?}  props.color  Icon color.
 *
 * @param {...IconProps}
 */

const IconComponent = ({ size = 26, ...props }) => <Icon size = { size } { ...props } />;

/**
 * @desc Displays icon on the left.
 * @param {IconProps} props
 */

const LeftIcon = props => <IconComponent { ...props } />;

/**
 * @desc Displays icon on the right.
 * @param {IconProps} props
 */

const RightIcon = props => <IconComponent { ...props } />;

/**
 * @desc Component to display a row of information.
 * @param {TouchableOpacityProps}
 */

export const ListItem = ({ style, onPress, children, ...props }) => {
	const { containerStyle } = styles;
	const childComponents = Children.toArray(children)
		.reduce((children, child) => ({ ...children, [child.type.name]: child }), {});

	return (
		<TouchableOpacity
			style = { [containerStyle, style] }
			activeOpacity = { (!onPress) ? 1 : 0.2 }
			onPress = { onPress }
			{ ...props }
		>
			{ childComponents.LeftIcon }
			<View style = { styles.titleContainer }>
				{ childComponents.Title }
				{ childComponents.Subtitle }
			</View>
			{ childComponents.RightIcon }
		</TouchableOpacity>
	);
};

ListItem.Title = Title;
ListItem.Subtitle = Subtitle;
ListItem.LeftIcon = LeftIcon;
ListItem.RightIcon = RightIcon;

const styles = {
	containerStyle: {
		flexDirection: 'row',
		backgroundColor: 'black',
		alignItems: 'center',
		padding: 16
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'column',
		paddingHorizontal: 20
	},
	textStyle: {
		color: 'white'
	},
	titleStyle: {
		color: 'white',
		fontSize: 16
	}
};