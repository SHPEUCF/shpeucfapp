import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loadEvent } from '../../../../ducks';
import { goToViewEvent } from '../../../../utils/router';

const dimension = Dimensions.get('window');

export const DefaultItem = ({ item }) => {
	const { committee, type, name, id, location, startTime, endTime } = item;
	const { textColor, itemContainer } = styles;

	const state = useSelector(state => state);
	const dispatch = useDispatch();

	// used to access previous item props data after rerendering
	const itemRef = useRef();
	const previousItemData = itemRef.current;

	let viewName = committee ? committee + ': ' + name : type + ': ' + name;

	// stores item props data so that it can be accessed after the component rerenders
	useEffect(() => { itemRef.current = item });

	// reloads the active event if the item prop data changed upon rerender
	if (!_.isEqual(previousItemData, item) && state.events.activeEvent.id === id
		&& !_.isEqual(state.events.activeEvent, item)) dispatch(loadEvent(item));

	return (
		<TouchableOpacity onPress = { () => viewEvent(item, dispatch) }>
			<View style = { [itemContainer, { backgroundColor: state.user.activeUser.color }] }>
				<Text style = { [{ fontWeight: 'bold' }, textColor] }>{ viewName }</Text>
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
	const color = useSelector(state => state.user.activeUser.color);

	return (
		<View style = { [emptyData, { backgroundColor: color }] }>
			<Text style = { textColor }>No events to display on this day</Text>
		</View>
	);
};

const viewEvent = (item, dispatch) => {
	dispatch(loadEvent(item));
	goToViewEvent('events');
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