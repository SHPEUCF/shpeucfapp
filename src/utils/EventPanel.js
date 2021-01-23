import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@/components';
import { convertNumToDate } from '@/utils/events';
import _ from 'lodash';

const { width, height } = Dimensions.get('screen');

export const EventPanel = ({ event, screen }) => {
	const { committee, type, date, name, location, startTime, endTime } = event;
	const backgroundColor = useSelector(state => state.user.activeUser.color);
	const navigation = useNavigation();
	// used to maintain event data across renders and push any updates to the active event
	const eventRef = useRef({ listener: () => null });

	useEffect(() => { eventRef.current.event = event });

	// pushes any new changes to the active event
	if (eventRef.current.event !== undefined && !_.isEqual(eventRef.current, event)) eventRef.current.listener(event);

	if (screen === 'Events') {
		const { itemContainer, textColor } = styles;

		return (
			<TouchableOpacity onPress = { () => navigation.push('EventDetails', eventRef) }>
				<View style = { [itemContainer, { backgroundColor }] }>
					<Text style = { [{ fontWeight: 'bold' }, textColor] }>{ committee ? committee + ': ' + name : type + ': ' + name }</Text>
					<Text style = { textColor }>Time: { startTime } - { endTime }</Text>
					<Text style = { textColor }>Location: { location }</Text>
				</View>
			</TouchableOpacity>
		);
	}

	else if (screen === 'Dashboard') {
		const {
			eventItem,
			eventItemInnerContainer,
			eventTextStyle,
			leaderboardArrow,
			eventTextContainer,
			gold
		} = styles;

		return (
			<TouchableOpacity
				style = { eventItem }
				onPress = { () => { navigation.push('EventDetails', eventRef) } }
			>
				<View style = { eventItemInnerContainer }>
					<View style = { eventTextContainer }>
						<Text style = { eventTextStyle }>{ committee || type }: { name }</Text>
						<Text style = { eventTextStyle }>
							{ convertNumToDate(date) } - { startTime } - { endTime }
						</Text>
					</View>
					<View style = { leaderboardArrow }>
						<Icon name = 'chevron-forward-circle-outline' size = { height * 0.025 } style = { gold } />
					</View>
				</View>
			</TouchableOpacity>
		);
	}
};

const styles = {
	itemContainer: {
		flex: 1,
		backgroundColor: '#21252b',
		borderRadius: 5,
		padding: height * 0.020,
		marginRight: height * 0.010,
		marginTop: height * 0.02
	},
	eventEmptyText: {
		fontSize: 20,
		textAlign: 'center',
		padding: 20,
		height: 150
	},
	eventItem: {
		backgroundColor: '#21252b',
		flex: 1,
		borderBottomWidth: 5
	},
	leaderboardArrow: {
		color: '#FECB00',
		width: width * 0.06,
		alignItems: 'center'
	},
	eventTextContainer: {
		flex: 1,
		alignItems: 'flex-start',
		paddingLeft: 20
	},
	eventItemInnerContainer: {
		flexDirection: 'row',
		height: 150,
		alignItems: 'center',
		paddingRight: 20
	},
	eventTextStyle: {
		color: 'white',
		fontSize: width * 0.035
	},
	gold: {
		color: '#FECB00'
	},
	textColor: {
		color: '#e0e6ed'
	}
};