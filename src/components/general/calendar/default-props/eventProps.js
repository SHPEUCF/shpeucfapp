import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

const dimension = Dimensions.get('window');

export const DefaultItem = ({ event }) => {
	const { committee, type, name, location, startTime, endTime } = event;
	const { textColor, itemContainer } = styles;
	const backgroundColor = useSelector(state => state.user.activeUser.color);
	const navigation = useNavigation();
	// used to maintain event data across renders and push any updates to the active event
	const eventRef = useRef({ listener: () => null });

	useEffect(() => { eventRef.current.event = event });

	// pushes any new changes to the active event
	if (eventRef.current.event !== undefined && !_.isEqual(eventRef.current, event)) eventRef.current.listener(event);

	return (
		<TouchableOpacity onPress = { () => navigation.push('EventDetails', eventRef) }>
			<View style = { [itemContainer, { backgroundColor }] }>
				<Text style = { [{ fontWeight: 'bold' }, textColor] }>{ committee ? committee + ': ' + name : type + ': ' + name }</Text>
				<Text style = { textColor }>Time: { startTime } - { endTime }</Text>
				<Text style = { textColor }>Location: { location }</Text>
			</View>
		</TouchableOpacity>
	);
};

export const DefaultEmptyData = () => {
	const {
		textColor,
		emptyData
	} = styles;
	const backgroundColor = useSelector(state => state.user.activeUser.color);

	return (
		<View style = { [emptyData, { backgroundColor }] }>
			<Text style = { textColor }>No events to display on this day</Text>
		</View>
	);
};

const styles = {
	textColor: {
		color: 'white'
	},
	emptyData: {
		height: dimension.height * 0.15,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#21252b',
		borderRadius: 5,
		marginTop: dimension.height * 0.017
	},
	itemContainer: {
		flex: 1,
		backgroundColor: '#21252b',
		borderRadius: 5,
		padding: dimension.height * 0.020,
		marginRight: dimension.height * 0.010,
		marginTop: dimension.height * 0.02
	}
};