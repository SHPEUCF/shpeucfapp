import React from 'react';
import { Agenda } from '@/components';
import { View, Text } from 'react-native';
import { EventPanel } from './';

export const DefaultAgenda = ({ passDate, items, screen, color, height }) => {
	const EmptyEventPanel = () => {
		const textColor = { color: '#e0e6ed' };
		const emptyData = {
			height: height * 0.15,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#21252b',
			borderRadius: 5,
			marginTop: height * 0.017
		};

		return (
			<View style = { [emptyData, { color }] }>
				<Text style = { textColor }>No events to display on this day</Text>
			</View>
		);
	};

	return <Agenda
		passDate = { passDate }
		items = { items }
		style = {{ height: height * 0.73 }}
		renderItem = { event => <EventPanel event = { event } variant = { screen } /> }
		renderEmptyData = { () => <EmptyEventPanel /> }
		renderEmptyDate = { () => <View></View> }
		rowHasChanged = { (r1, r2) => r1 !== r2 }
		pastScrollRange = { 24 }
		futureScrollRange = { 24 }
		theme = {{
			backgroundColor: 'black',
			calendarBackground: '#21252b',
			agendaDayTextColor: '#fff',
			agendaDayNumColor: '#fff',
			dayTextColor: '#fff',
			monthTextColor: '#FECB00',
			textSectionTitleColor: '#FECB00',
			textDisabledColor: '#999',
			selectedDayTextColor: '#000',
			selectedDayBackgroundColor: '#FECB00',
			todayTextColor: '#44a1ff',
			textDayFontSize: 15,
			textMonthFontSize: 16,
			textDayHeaderFontSize: 14,
			selectedDotColor: 'black'
		}}
	/>;
};