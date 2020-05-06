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

	return `${time[0]}:${time[1]} ${period}`;
}

/**
 * @description Prepends a 0 to any single digit number, otherwise returns the original number.
 *
 * @param {Number} item The number that may need a 0 prepended to it.
 *
 * @returns {String} The number as a string. It may have  a 0 prepended to it, if it was originally single digit.
 */

export const prependZero = (number) => number < 10 ? "0" + number : number;

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
 * @description Filters out all events that have passed; only leaving future events.
 *
 * @param {Object[]} sortedEvents A sorted array of all the events.
 * @access     public
 */

export const filterPastEvents = sortedEvents => sortedEvents.filter(event => {
	const today = new Date();
	const [year, month, date] = event.date.split("-");

	return !(year < today.getFullYear() || month < 	today.getMonth() + 1 || date < today.getDate());
});

/**
 * @description Filters out all events that aren't inside of the eventIds array.
 *
 * @param {Object} eventIds An array of the event Ids that you want to keep.
 * @param {Object[]} sortedEvents An array of all the events that you are searching through.
 */

export const filterEvents = (eventIds, sortedEvents) => sortedEvents.filter((event) => event.id in eventIds);