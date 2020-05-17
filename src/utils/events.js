/**
 * @description Pass in Standard time and the function returns that in Military Time
 *
 *
 * @param {String} standardTime Format: "Hour:Minute (AM/PM)" (1 <= Hour <= 12); (0 <= Minute <= 59)
 *
 * @returns {String} Format: "Hour:Minute" (1 <= Hour <= 24); (0 <= Minute <= 59)
 */

export function convertStandardToMilitaryTime(standardTime) {
	let time = standardTime.split(":");
	time = [parseInt(time[0]), ...time[1].split(" ")];

	time[0] = time[0] === 12 ? 0 : time[0];
	time[0] += time[2] === "AM" ? 0 : 12;
	time[0] = time[0] < 10 ? "0" + time[0] : String(time[0]);

	return `${time[0]}:${time[1]}`;
}

/**
 * @description Pass in Standard time and the function returns that in Military Time
 *
 *
 * @param {String} militaryTime Format: "Hour:Minute" (1 <= Hour <= 24); (0 <= Minute <= 59)
 *
 * @returns {String} Format: "Hour:Minute (AM/PM)" (1 <= Hour <= 12); (0 <= Minute <= 59)
 */

export function convertMilitaryToStandardTime(militaryTime) {
	let time = militaryTime.split(":");
	const period = time[0] >= 12 ? "PM" : "AM";
	time[0] -= time[0] > 12 ? 12 : 0;
	time[0] = time[0] === 0 ? 12 : time[0];

	return `${time[0]}:${time[1]} ${period}`;
}

/**
 * @description Prepends a 0 to any single digit number, otherwise returns the original number.
 *
 * @param {Number} item The number that may need a 0 prepended to it.
 *
 * @returns {String} The number as a string. It may have  a 0 prepended to it, if it was originally single digit.
 */

export const prepend0 = (number) => number < 10 ? "0" + number : number;

/**
 * @description Formats event to work with the calendar component.
 *
 * @param {Object[]} events An array of all the events that you want to format.
 */

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
 * @description Verifies whether an events times are valid
 *
 * @param {String} s Start Time
 * @param {String} e End Time
 */

export function timeVerification(startTime, endTime) {
	let start = startTime.split(":");
	let end = endTime.split(":");
	if (end[0] < start[0] || (end[0] === start[0] && end[1] <= start[1])) {
		alert("Ending time must be after start time");
		return false;
	}
	else { return true }
}

/**
 * @description Changes an hour by a certain amount and returns the new hour.
 *
 * @param {string} time   The hour that you want to change, **Must be Military Time**
 * @param {number} amount The amount that you want to change the hour by.
 */

export function changeHourBy(time, amount) {
	const [hour, minute] = time.split(":");
	let newHour = parseInt(hour) + amount;
	newHour = prepend0(newHour % 24);
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
	const [year, month, date] = event.date.split("-");

	return !(year < today.getFullYear() || month < 	today.getMonth() + 1 ||
	(month == today.getMonth() + 1 && date < today.getDate()));
});

/**
 * @description Filters out all events that aren't inside of the eventIds array.
 *
 * @param {Object} eventIds An array of the event Ids that you want to keep.
 * @param {Object[]} sortedEvents An array of all the events that you are searching through.
 */

export const filterEvents = (eventIds, sortedEvents) => sortedEvents.filter((event) => event.id in eventIds);