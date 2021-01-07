import React from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity, Text, Dimensions, TextStyle, ViewStyle } from 'react-native';
import { Icon } from './';

const { height } = Dimensions.get('screen');

/**
 * @description Avatar component to be used with images or text.
 *
 * @typedef {Object} AvatarProps
 * @prop {'square'|'circle'|'rounded'}               shape       Shape of Avatar.
 * @prop {Number|'small'|'medium'|'large'|'xlarge'}  size        Size of Avatar.
 * @prop {String}                                    source      Image source.
 * @prop {String}                                    title       Text to display instead of an image.
 * @prop {TextStyle}                                 titleStyle  Style of text style.
 * @prop {Boolean}                                   showEdit    Show edit button for Avatar.
 * @prop {Function}                                  onPress     Called when the Avatar is pressed.
 * @prop {ViewStyle}                                 style       Additional style for Avatar.
 *
 * @param {...AvatarProps}
 */

export const Avatar = ({ shape = 'circle', size = 'medium', source, title, titleStyle, onPress, showEdit, style }) => {
	let borderRadius;

	switch (size) {
		case 'small':
			size = height * 0.05;
			break;
		case 'medium':
			size = height * 0.09;
			break;
		case 'large':
			size = height * 0.15;
			break;
		case 'xlarge':
			size = height * 0.3;
	}

	switch (shape) {
		case 'circle':
			borderRadius = size / 2;
			break;
		case 'rounded':
			borderRadius = 15;
	}

	const { center, editButton } = styles;
	let avatarSize = { height: size, width: size, borderRadius };

	return (
		<TouchableOpacity
			activeOpacity = { (showEdit || !onPress) ? 1 : 0.2 }
			onPress = { () => !showEdit && onPress && onPress() }
			style = { [center, avatarSize, style] }
		>
			{ source // Show image or title text
				? <FastImage style = { avatarSize } source = {{ uri: source }} />
				: <Text style = { [center, avatarSize, { fontSize: size / 2, color: 'white' }, titleStyle] }>{ title }</Text>
			}
			{ showEdit && <TouchableOpacity
				onPress = { onPress }
				style = { [editButton, center, { height: size / 4, width: size / 4, borderRadius: size / 8 }] }
			>
				<Icon type = 'MaterialIcons' name = 'edit' size = { size / 6 } color = 'white' />
			</TouchableOpacity>
			}
		</TouchableOpacity>
	);
};

const styles = {
	center: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	editButton: {
		backgroundColor: '#21252B',
		position: 'absolute',
		elevation: 5,
		bottom: 0,
		right: 0
	}
};