import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonLayout } from '@/components/';
import { formatEventListForCalendar, prepend0, DefaultAgenda } from '@/utils/events';
import { createEvent } from '@/ducks';
import { EventForm } from '@/data/FormData';
import { View, Dimensions, SafeAreaView } from 'react-native';

const { height } = Dimensions.get('screen');

const getTodaysDate = () => {
	let date = new Date();
	let month = prepend0((date.getMonth() + 1).toString());
	let year = date.getFullYear();
	let day = prepend0(date.getDate().toString());

	return `${year}-${month}-${day}`;
};

export const Events = () => {
	const { mainBackgroundColor, secondaryBackgroundColor, fullFlex } = styles;
	const [isEventFormVisible, toggleEventFormVisibility] = useState(false);
	const [targetDate, changeTargetDate] = useState(getTodaysDate());
	const { user: { activeUser: { color, privilege } }, events: { sortedEvents } } = useSelector(state => state);

	const renderButton = () => {
		return (
			<ButtonLayout>
				{ privilege && privilege.board && <Button
					title = 'Create Event'
					onPress = { () => toggleEventFormVisibility(true) }
				/> }
			</ButtonLayout>
		);
	};

	return (
		<SafeAreaView style = { [fullFlex, mainBackgroundColor] }>
			<View style = { [fullFlex, secondaryBackgroundColor] }>
				<View style = { fullFlex }>
					<EventForm
						title = 'Create Event'
						values = {{ date: targetDate }}
						visible = { isEventFormVisible }
						onSubmit = { event => createEvent(event) }
						changeVisibility = { visible => toggleEventFormVisibility(visible) }
					/>
					<DefaultAgenda
						passDate = { date => changeTargetDate(date.dateString) }
						items = { formatEventListForCalendar(sortedEvents) }
						screen = 'Events'
						color = { color }
						height = { height }
					/>
				</View>
				{ renderButton() }
			</View>
		</SafeAreaView>
	);
};

const styles = {
	mainBackgroundColor: {
		backgroundColor: '#0c0b0b'
	},
	secondaryBackgroundColor: {
		backgroundColor: 'black'
	},
	fullFlex: {
		flex: 1
	}
};