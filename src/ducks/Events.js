import firebase from 'firebase';
import _ from 'lodash';
import { createActionTypes } from './utils';
import { convertTimeTo } from '@/utils/events';
import { Alert } from '@/components';

// handle all things related to Elections
const ACTIONS = createActionTypes([
	'STORE_SORTED_EVENTS'
]);

const INITIAL_STATE = {
	sortedEvents: []
};

export default (state = INITIAL_STATE, action) => {
	const {
		payload
	} = action;

	switch (action.type) {
		case ACTIONS.STORE_SORTED_EVENTS:
			return { ...state, sortedEvents: payload };
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
		firebase.database().ref('events/').on('value', snapshot => {
			let sortedEvents = _.orderBy(snapshot.val(), ['date', 'startTime', 'endTime'], ['asc', 'asc', 'asc']);

			// Converts all Military time to Standard Time.
			sortedEvents = sortedEvents.map(event => {
				event.startTime = convertTimeTo(event.startTime, 'standard');
				event.endTime = convertTimeTo(event.endTime, 'standard');

				return event;
			});

			dispatch({ type: ACTIONS.STORE_SORTED_EVENTS, payload: sortedEvents });
		});
	};
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
	firebase.database().ref('/events/').push({ ...event, eventActive: false, code: makeCode() })
		.then(snapshot => {
			firebase.database().ref(`/events/${snapshot.key}/id`).set(snapshot.key);
			if (event.committee)
				firebase.database().ref(`/committees/${event.committee}/events/`).update({ [snapshot.key]: true });
		})
		.then(() => Alert.alert('Event created', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Event creation failed', { type: 'error', title: 'Failure' }));
};

/**
 * Creates a random Code with the length inputted. The code omits characters that commonly look similar in popular fonts.
 *
 * @access     private
 * @param {Number=} length  The length of the code you want created.
 */

function makeCode(length = 4) {
	let text = '';
	let possible = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

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
	firebase.database().ref(`events/${event.id}`).once('value', snapshot => {
		if (snapshot.val())
			firebase.database().ref(`committees/${snapshot.val().committee}/events/`).update({ [event.id]: null });
	})
		.then(() => {
			firebase.database().ref(`/events/${event.id}`).update(event);
			if (event.committee)
				firebase.database().ref(`/committees/${event.committee}/events/`).update({ [event.id]: true });
	 })
		.then(() => Alert.alert('Event edited!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Event edit failed!', { type: 'error', title: 'Failure' }));
};

/**
 * Sends a DELETE request to firebase and deletes an event. If a committee is passed in, the event is removed from the appropriate committees section.
 *
 * @param {Event} event Event to be deleted.
 */

export const deleteEvent = (event) => {
	firebase.database().ref(`events/${event.id}`).set(null)
		.then(() => {
			firebase.database().ref(`committees/${event.committee}/events/`).update({ [event.id]: null });
		})
		.then(() => Alert.alert('Event deleted', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Event deletion failed', { type: 'error', title: 'Failure' }));
};

/**
 * Sends an UPDATE request to firebase and updates the points of the user in question. It also updates the points breakdown section of the firebase.
 *
 * @param {Event} event Event that the user will be checked into.
 * @param {User} user User that will be checked into the event
 */
export const checkIn = (event, user, showAlert = true) => {
	if (event.attendance && user.id in event.attendance) {
		Alert.alert('You have already attended this event!', { type: 'error', title: 'Failure' });

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
		.then(() => showAlert && Alert.alert('You have successfully checked in!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('You were not able to check in, Please contact the Tech Director for assistance', { type: 'error', title: 'Failure' }));
};

/**
 * Sends an UPDATE request to firebase and saves the user to the rsvp list. It also updates the points breakdown section of the firebase.
 *
 * @param {Event} event Event that the current user will rsvp to.
 */
export const rsvp = (event) => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`events/${event.id}/rsvp`).update({ [currentUser.uid]: !(currentUser.uid in event.rsvp) })
		.then(() => Alert.alert('You have successfully rsvped!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('You were not able to rsvp, Please contact the Tech Director for assistance', { type: 'error', title: 'Failure' }));
};