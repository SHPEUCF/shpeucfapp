import { Alert } from '@/components';

export const shortMonths = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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

/**
 * Convert given time to the format given, returned as an array of strings.
 *
 * @param {string}                  time    Initial time string: 'HH:MM [AM/PM]'
 * @param {'standard' | 'military'} format  Time format
 */

export const convertTimeTo = (time, format) => {
	let [hour, minute, period] = time.split(/[: ]/);

	switch (format) {
		case 'standard':
			if (!period) {
				period = (hour >= 12) ? 'PM' : 'AM';
				hour -= (hour > 12) ? 12 : 0;
			}

			return [String(hour || 12), minute, period];
		case 'military':
			if (period)
				hour = (hour == 12 ? 0 : parseInt(hour)) + (period === 'PM' ? 12 : 0);

			return [String(hour).padStart(2, '0'), minute];
	}
};

/**
 * Extract month name and day from a numerical date
 *
 * @param {String} date Format: 'Year-Month-Day'
 *
 * @returns {String} Format: 'Month(Name) Day(Number)'
 */

export const convertNumToDate = date => {
	let [, month, day] = date.split('-');

	return `${shortMonths[Number(month) - 1]} ${day}`;
};

export const formatEventListForCalendar = events => {
	let dates = {};

	events.forEach((event) => {
		if (!dates[event.date])
			dates[event.date] = [event];
		else
			dates[event.date].push(event);
	});

	return dates;
};

/**
 * Verifies whether an events times are valid.
 *
 * @param {String} startTime  Start Time
 * @param {String} endTime    End Time
 */

export const timeVerification = (startTime, endTime) => {
	let [startHour, startMinute] = startTime.split(':');
	let [endHour, endMinute] = endTime.split(':');
	let validTime = endHour >= startHour || (endHour !== startHour && endMinute > startMinute);

	if (!validTime)
		Alert.alert('Ending time must be after start time');

	return validTime;
};

/**
 * Changes an hour by a certain amount and returns the new hour.
 *
 * @param {string} time    Hour to be changed (**Must be Military Time**)
 * @param {number} amount  Amount to change the hour by
 */

export const changeHourBy = (time, amount) => {
	const [hour, minute] = time.split(':');
	let newHour = ((parseInt(hour) + amount) % 24).toString().padStart(2, '0');

	return `${newHour}:${minute}`;
};

/**
 * Filters out all events that have passed; only leaving future events.
 *
 * @param {Object[]} sortedEvents A sorted array of all the events.
 */

export const filterPastEvents = sortedEvents => sortedEvents.filter(event => {
	const today = new Date();
	const [year, month, date] = event.date.split('-');

	return !(year < today.getFullYear() || month < 	today.getMonth() + 1
		|| (month == today.getMonth() + 1 && date < today.getDate()));
});

/**
 * Filters out all events that aren't inside of the eventIds array.
 *
 * @param {Object}   eventIds      An array of the event Ids that you want to keep.
 * @param {Object[]} sortedEvents  An array of all the events that you are searching through.
 */

export const filterEvents = (eventIds, sortedEvents) => sortedEvents.filter((event) => event.id in eventIds);