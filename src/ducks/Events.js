import firebase from "firebase";
import _ from "lodash";
import { createActionTypes } from "../utils/actions";
import { convertMilitaryToStandardTime } from "../utils/events";

// handle all things related to Elections
const ACTIONS = createActionTypes([
	"STORE_SORTED_EVENTS",
	"LOAD_EVENT",
	"PAGE_LOAD"
]);

const INITIAL_STATE = {
	activeEvent: {},
	sortedEvents: []
};

export default (state = INITIAL_STATE, action) => {
	const {
		payload
	} = action;

	switch (action.type) {
		case ACTIONS.STORE_SORTED_EVENTS:
			return { ...state, sortedEvents: payload };
		case ACTIONS.LOAD_EVENT:
			return { ...state, activeEvent: payload };
		default:
			return state;
	}
};

/**
 * Types
 * @typedef {Object} Event:
 * 		@property {Object=}   attendance
 * 		@property {String}    code
 * 		@property {String=}   committee
 * 		@property {String}    date
 * 		@property {String}    description
 * 		@property {String}    startTime
 * 		@property {String}    endTime
 * 		@property {Object=}   rsvp
 * 		@property {String}    location
 * 		@property {Number}    points
 * 		@property {String}    type
 * @typedef {Object} User:
 *		@property {String}    id
 *		@property {Number}    points
 */

/* Redux Action Creators */

/**
 * @description Makes a firebase call that pulls in all the events.
 *
 * The events are stored in sortedEvents
 *
 * @access     public
 */

export const getEvents = () => {
	return (dispatch) => {
		firebase.database().ref("events/").on("value", snapshot => {
			let sortedEvents = _.orderBy(snapshot.val(), ["date", "startTime", "endTime"], ["asc", "asc", "asc"]);

			// Converts all Military time to Standard Time.
			sortedEvents = sortedEvents.map(event => {
				event.startTime = convertMilitaryToStandardTime(event.startTime);
				event.endTime = convertMilitaryToStandardTime(event.endTime);

				return event;
			});

			dispatch({ type: ACTIONS.STORE_SORTED_EVENTS, payload: sortedEvents });
		});
	};
};

/**
 * Loads the specified event to the store to be pulled in by some other page.
 *
 * Needs to be passed through mapDispatchToProps
 *
 * @access     public
 * @param {Event}   event The event you want to load into the redux.
 */

export const loadEvent = (event) => {
	return (dispatch) => dispatch({ type: ACTIONS.LOAD_EVENT, payload: event });
};

/* FireBase Functions that don't use Redux */

/**
 * Sends a POST request to firebase and creates an event. If a committee is passed in, the event is added to the appropriate committees section.
 *
 * ***DO NOT PASS IN THROUGH mapDispatchToProps***
 *
 * @access     public
 * @param {Event} event  The event you want to store in the database().
 */

export const createEvent = (event) => {
	firebase.database().ref("/events/").push({ ...event, eventActive: false, code: makeCode() })
		.then(snapshot => {
			firebase.database().ref(`/events/${snapshot.key}/id`).set(snapshot.key);
			if (event.committee)
				firebase.database().ref(`/committees/${event.committee}/events/`).update({ [snapshot.key]: true });
		})
		.then(() => alert("Event created", "Successful"))
		.catch(() => alert("Event creation failed", "Failure"));
};

/**
 * Creates a random Code with the length inputted. The code omits characters that commonly look similar in popular fonts.
 *
 * @access     private
 * @param {Number=} length  The length of the code you want created.
 */

function makeCode(length = 4) {
	let text = "";
	let possible = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

	for (let i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

/**
 * Sends an UPDATE request to firebase and edits an event.
 * If the event is a committee event, the event is removed from the previous committees section and added to the new committees section.
 *
 * @access     public
 * @param {Event} event The event you want to edit.
 */

export const editEvent = (event) => {
	firebase.database().ref(`events/${event.id}`).once("value", snapshot => {
		if (snapshot.val())
			firebase.database().ref(`committees/${snapshot.val().committee}/events/`).update({ [event.id]: null });
	})
		.then(() => {
			firebase.database().ref(`/events/${event.id}`).update(event);
			if (event.committee)
				firebase.database().ref(`/committees/${event.committee}/events/`).update({ [event.id]: true });
	 })
		.then(() => alert("Event edited!", "Successful"))
		.catch(() => alert("Event edit failed!", "Failure"));
};

/**
 * Sends a DELETE request to firebase and deletes an event. If a committee is passed in, the event is removed from the appropriate committees section.
 *
 * @param {Event} event Event to be deleted.
 */

export const deleteEvent = (event) => {
	firebase.database().ref("events").update({ [event.id]: null })
		.then(() => {
			firebase.database().ref(`committees/${event.committee}/events/`).update({ [event.id]: null });
		})
		.then(() => alert("Event deleted", "Successful"))
		.catch(() => alert("Event deletion failed", "Failure"));
};

/**
 * Sends an UPDATE request to firebase and updates the points of the user in question. It also updates the points breakdown section of the firebase.
 *
 * @param {Event} event Event that the user will be checked into.
 * @param {User} user User that will be checked into the event
 */
export const checkIn = (event, user, showAlert = true) => {
	if (event.attendance && user.id in event.attendance) {
		alert("You have already attended this event!", "Failure");
		return;
	}
	const rsvpBonus = event.rsvp && user.id in event.rsvp ? 1 : 0;

	const pointsAfterCheckIn = user.points + event.points + rsvpBonus;

	firebase.database().ref(`events/${event.id}/attendance`).update({ [user.id]: true })
		.then(() => { firebase.database().ref(`users/${user.id}/points`).set(pointsAfterCheckIn) })
		.then(() => { firebase.database().ref(`points/${user.id}/points`).set(pointsAfterCheckIn) })
		.then(() => {
			firebase.database().ref(`points/${user.id}/breakdown/${event.type}/${event.id}`)
				.set({
					type: event.type,
					date: event.date,
					name: event.name,
					points: event.points + rsvpBonus,
					rsvp: rsvpBonus === 1
				});
		})
		.then(() => showAlert && alert("You have successfully checked in!", "Success"))
		.catch(() => alert("You were not able to check in, Please contact the Tech Director for assistance", "Failure"));
};

/**
 * Sends an UPDATE request to firebase and saves the user to the rsvp list. It also updates the points breakdown section of the firebase.
 *
 * @param {Event} event Event that the current user will rsvp to.
 */
export const rsvp = (event) => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`events/${event.id}/rsvp`).update({ [currentUser.uid]: !(currentUser.uid in event.rsvp) })
		.then(() => alert("You have successfully rsvped!", "Success"))
		.catch(() => alert("You were not able to rsvp, Please contact the Tech Director for assistance", "Failure"));
};