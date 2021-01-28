import React from 'react';
import { Alert, Agenda } from '@/components';
import { View, Text } from 'react-native';
import { EventPanel } from '@/utils/EventPanel';

export const fullMonths = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const shortMonths = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * @description Pass in Standard time and the function returns that in Military Time.
 *
 * @param {String} standardTime Format: 'Hour:Minute (AM/PM)' (1 <= Hour <= 12); (0 <= Minute <= 59)
 *
 * @returns {String} Format: 'Hour:Minute' (1 <= Hour <= 24); (0 <= Minute <= 59)
 */

export function convertStandardToMilitaryTime(standardTime) {
	let [hour, minute] = standardTime.split(':');
	let [newHour, newMinute, period] = [parseInt(hour), ...minute.split(' ')];

	newHour = newHour === 12 ? 0 : newHour;
	newHour += period === 'AM' ? 0 : 12;
	newHour = newHour < 10 ? '0' + newHour : String(newHour);

	return `${newHour}:${newMinute}`;
}

/**
 * @description Pass in Standard time and the function returns that in Military Time.
 *
 * @param {String} militaryTime Format: 'Hour:Minute' (1 <= Hour <= 24); (0 <= Minute <= 59)
 *
 * @returns {String} Format: 'Hour:Minute (AM/PM)' (1 <= Hour <= 12); (0 <= Minute <= 59)
 */

export function convertMilitaryToStandardTime(militaryTime) {
	let [hour, minute] = militaryTime.split(':');
	const period = hour >= 12 ? 'PM' : 'AM';

	hour -= hour > 12 ? 12 : 0;
	hour = hour === 0 ? 12 : hour;

	return `${hour}:${minute} ${period}`;
}

/**
 * @description Extract month name and day from a numerical date
 *
 * @param {String} date Format: 'Year-Month-Day'
 *
 * @returns {String} Format: 'Month(Name) Day(Number)'
 */

export function convertNumToDate(date) {
	let [, month, day] = date.split('-');

	return `${shortMonths[Number(month) - 1]} ${day}`;
}

export function formatEventListForCalendar(events) {
	let dates = {};

	events.forEach((event) => {
		if (!dates[event.date])
			dates[event.date] = [event];
		else
			dates[event.date].push(event);
	});

	return dates;
}

/**
 * @description Verifies whether an events times are valid.
 *
 * @param {String}  s  Start Time
 * @param {String}  e  End Time
 */

export function timeVerification(startTime, endTime) {
	let [startHour, startMinute] = startTime.split(':');
	let [endHour, endMinute] = endTime.split(':');

	if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
		Alert.alert('Ending time must be after start time');

		return false;
	}
	else { return true }
}

/**
 * @description Changes an hour by a certain amount and returns the new hour.
 *
 * @param {string}  time    The hour that you want to change, **Must be Military Time**
 * @param {number}  amount  The amount that you want to change the hour by.
 */

export function changeHourBy(time, amount) {
	const [hour, minute] = time.split(':');
	let newHour = ((parseInt(hour) + amount) % 24).toString().padStart(2, '0');

	return `${newHour}:${minute}`;
}

/**
 * @description Filters out all events that have passed; only leaving future events.
 *
 * @param {Object[]} sortedEvents A sorted array of all the events.
 * @access     public
 */

export const filterPastEvents = sortedEvents => sortedEvents.filter(event => {
	const today = new Date();
	const [year, month, date] = event.date.split('-');

	return !(year < today.getFullYear() || month < 	today.getMonth() + 1
		|| (month == today.getMonth() + 1 && date < today.getDate()));
});

/**
 * @description Filters out all events that aren't inside of the eventIds array.
 *
 * @param {Object}    eventIds      An array of the event Ids that you want to keep.
 * @param {Object[]}  sortedEvents  An array of all the events that you are searching through.
 */

export const filterEvents = (eventIds, sortedEvents) => sortedEvents.filter((event) => event.id in eventIds);

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