import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Alert, Button, SortableFlatList, NavBar, ButtonLayout, Icon } from '@/components';
import { getPositions } from '@/ducks';
import { deletePosition, changeLevels } from '@/services/elections';

const { height } = Dimensions.get('screen');

export const ElectionPositions = ({ navigation }) => {
	const { positions } = useSelector(({ elect }) => elect);
	const [orderedPositions, setOrderedPositions] = useState([]);
	const mounted = useRef(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!mounted.current) {
			dispatch(getPositions());
			mounted.current = true;
		}
		setOrderedPositions(_.orderBy(positions, ['level'], ['asc']));
	}, [positions]);

	const renderPositions = ({ item: position, move, moveEnd, isActive }) => {
		const { containerStyle, buttonContainerStyle, positionContainer, textColor } = styles;
		const color = isActive ? { backgroundColor: '#ffd70066' } : { backgroundColor: 'black' };

		const confirmDelete = () => Alert.alert(`Are you sure you want to delete the ${position.title} position?`,
			{ type: 'confirmation',	submit: () => deletePosition(position.title) }
		);

		return (
			<TouchableOpacity style = { [positionContainer, color] } onLongPress = { move } onPressOut = { moveEnd }>
				<View style = { containerStyle }>
					<Text style = { textColor }>{ position.title }</Text>
				</View>
				<View style = { buttonContainerStyle }>
					<TouchableOpacity onPress = { () => navigation.push('PositionForm', { action: 'EDIT', position }) }>
						<Icon style = { textColor } name = 'md-create' size = { 40 } />
					</TouchableOpacity>
				</View>
				<View style = { buttonContainerStyle }>
					<TouchableOpacity onPress = { () => confirmDelete() }>
						<Icon style = { textColor } name = 'md-trash' size = { 40 } />
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style = { styles.page }>
			<NavBar title = 'Positions' back />
			<View style = {{ flex: 1 }}>
				<SortableFlatList
					data = { orderedPositions }
					renderItem = { renderPositions }
					scrollPercent = { 5 }
					keyExtractor = { ({ key }) => `position-${key}` }
					onMoveEnd = { ({ data }) => setOrderedPositions(data) }
				/>
			</View>
			<ButtonLayout>
				<Button title = 'Add Positions' onPress = { () =>	navigation.push('PositionForm', { action: 'ADD' }) } />
				<Button title = 'Set Order' onPress = { () => changeLevels(orderedPositions) } />
			</ButtonLayout>
		</SafeAreaView>
	);
};

const styles = {
	containerStyle: {
		flex: 25,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	positionContainer: {
		margin: 1,
		height: height * 0.09,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	textColor: {
		color: '#e0e6ed'
	},
	buttonContainerStyle: {
		flex: 5,
		margin: 5,
		justifyContent: 'center'
	},
	page: {
		flex: 1,
		backgroundColor: '#0c0b0b'
	}
};