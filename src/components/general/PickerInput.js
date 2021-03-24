import React, { useState } from 'react';
import { View, Modal, FlatList, Dimensions, TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native';
import { Input } from './Input';
import { Icon } from './Icon';

const { height, width } = Dimensions.get('screen');

/**
 * Component to select an item from an array of data
 *
 * @typedef {Object} PickerInputProps
 * @prop {string}    title
 * @prop {string}    value
 * @prop {Array}     data
 * @prop {string}    placeholder
 * @prop {Object}    icon
 * @prop {number}    icon.size
 * @prop {string}    icon.color
 * @prop {TextStyle} icon.style
 * @prop {Function}  onSelect
 * @prop {TextStyle} inputBoxStyle
 * @prop {ViewStyle} style
 *
 * @param {PickerInputProps}
 */

export const PickerInput = ({ title, value, data, placeholder, icon, onSelect, inputBoxStyle, style }) => {
	const [visible, setVisibility] = useState(false);

	const renderSelections = ({ item }) => {
		const { itemStyle, itemTextStyle } = styles;

		return (
			<TouchableOpacity onPress = { () => onSelect(item) } style = { [itemStyle, style] }>
				<Text style = { itemTextStyle }>{ item }</Text>
			</TouchableOpacity>
		);
	};

	const renderModal = () => (
		<Modal transparent visible = { visible }>
			<View style = { modalBackground }>
				<View style = { modalStyle }>
					<Text style = { titleStyle }>{ title }</Text>
					<View style = { flatListStyle }>
						<FlatList
							data = { data }
							keyExtractor = { (item, index) => index }
							renderItem = { renderSelections }
						/>
					</View>
					<TouchableOpacity
						onPress = { () => setVisibility(false) }
						style = { [buttonStyle, buttonContainer] }
					>
						<Text style = { textStyle }>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);

	const {
		inputStyle,
		iconStyle,
		modalStyle,
		modalBackground,
		textStyle,
		buttonContainer,
		flatListStyle,
		buttonStyle,
		titleStyle
	} = styles;

	return (
		<>
			<View style = { [{ flexDirection: 'row' }, style] }>
				<Input
					value = { value }
					editable = { false }
					placeholder = { placeholder }
					style = { [inputBoxStyle, inputStyle] }
				/>
				<Icon
					onPress = { () => setVisibility(true) }
					name = 'chevron-down-circle-outline'
					style = { [icon.style, iconStyle] }
					{ ...icon }
				/>
			</View>
			{ renderModal() }
		</>
	);
};

PickerInput.defaultProps = {
	title: 'Title',
	placeholder: 'Choose an option',
	iconSize: 35,
	iconColor: 'white'
};

const styles = {
	itemStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		borderBottomColor: '#0002',
		borderBottomWidth: 1
	},
	itemTextStyle: {
		paddingTop: height * 0.03,
		paddingBottom: height * 0.03,
		flex: 1,
		fontSize: 16,
		alignSelf: 'center'
	},
	titleStyle: {
		flex: 0.13,
		alignSelf: 'center',
		fontSize: 20
	},
	buttonStyle: {
		flex: 1,
		alignSelf: 'center'
	},
	flatListStyle: {
		flex: 0.8
	},
	buttonContainer: {
		flex: 0.2,
		flexDirection: 'row',
		borderTopColor: '#0001',
		borderTopWidth: 1
	},
	textStyle: {
		flex: 1,
		alignSelf: 'center',
		fontSize: 18,
		paddingTop: 5
	},
	modalBackground: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0003',
		margin: 0,
		height: height,
		width: width
	},
	modalStyle: {
		height: height * 0.4,
		width: width * 0.8,
		backgroundColor: '#fff',
		padding: 12,
		borderRadius: 12
	},
	inputStyle: {
		flex: 1
	},
	iconStyle: {
		flex: 0.2,
		paddingLeft: 10,
		alignSelf: 'center'
	}
};