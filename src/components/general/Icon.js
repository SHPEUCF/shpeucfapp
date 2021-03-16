import React from 'react';

/**
 * @desc Icon component from react-native-vector-icons.
 *
 * @typedef {Object} IconProps
 * @prop {number}                                     props.size   Icon size.
 * @prop {string}                                     props.name   Icon name.
 * @prop {string}                                     props.color  Icon color.
 * @prop {'AntDesign' | 'EvilIcons' | 'FontAwesome'
 *       | 'MaterialIcons' | 'IonIcons'} [type=]      Type of icon component.
 *
 * @param {IconProps}
 */

export const Icon = ({ type, ...props }) => {
	let IconComponent = (() => {
		switch (type) {
			case 'AntDesign':
				return require('react-native-vector-icons/AntDesign').default;
			case 'EvilIcons':
				return require('react-native-vector-icons/EvilIcons').default;
			case 'FontAwesome':
				return require('react-native-vector-icons/FontAwesome').default;
			case 'MaterialIcons':
				return require('react-native-vector-icons/MaterialIcons').default;
			default:
				return require('react-native-vector-icons/Ionicons').default;
		}
	})();

	return (
		<IconComponent { ...props } />
	);
};