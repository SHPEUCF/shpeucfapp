import React from 'react';

/**
 * @desc Icon component from react-native-vector-icons.
 *
 * @typedef {Object} IconProps
 * @prop {Number}                                     props.size   Icon size.
 * @prop {String}                                     props.name   Icon name.
 * @prop {String}                                     props.color  Icon color.
 * @prop {'AntDesign' | 'Entypo' | 'EvilIcons'
 *       |'Feather' | 'FontAwesome' | 'FontAwesome5'
 *       | 'Fontisto' | 'Foundation' | 'Ionicons'
 *       | 'MaterialIcons' | 'MaterialCommunityIcons'
 *       | 'Octicons' | 'Zocial' | 'SimpleLineIcons'} [type=]      Type of icon component.
 *
 * @param {...IconProps}
 */

export const Icon = ({ type, ...props }) => {
	let IconComponent = (() => {
		switch (type) {
			case 'AntDesign':
				return require('react-native-vector-icons/AntDesign').default;
			case 'Entypo':
				return require('react-native-vector-icons/Entypo').default;
			case 'EvilIcons':
				return require('react-native-vector-icons/EvilIcons').default;
			case 'Feather':
				return require('react-native-vector-icons/Feather').default;
			case 'FontAwesome':
				return require('react-native-vector-icons/FontAwesome').default;
			case 'FontAwesome5':
				return require('react-native-vector-icons/FontAwesome5').default;
			case 'Fontisto':
				return require('react-native-vector-icons/Fontisto').default;
			case 'Foundation':
				return require('react-native-vector-icons/Foundation').default;
			case 'MaterialIcons':
				return require('react-native-vector-icons/MaterialIcons').default;
			case 'MaterialCommunityIcons':
				return require('react-native-vector-icons/MaterialCommunityIcons').default;
			case 'Octicons':
				return require('react-native-vector-icons/Octicons').default;
			case 'Zocial':
				return require('react-native-vector-icons/Zocial').default;
			case 'SimpleLineIcons':
				return require('react-native-vector-icons/SimpleLineIcons').default;
			default:
				return require('react-native-vector-icons/Ionicons').default;
		}
	})();

	return (
		<IconComponent { ...props } />
	);
};