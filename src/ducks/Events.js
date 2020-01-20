import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { createActiontypes } from '../utils/actions';
// handle all things related to Elections
const ACTIONS = createActiontypes([
		'FETCH_EVENTS',
		'CREATE_EVENT',
		'EDIT_EVENT',
		'DELETE_EVENTS',
		'CHECK_IN',
		'RSVP',
		'FETCH_CODE',
		'TYPE_CHANGED',
		'COMMITTEE_CHANGED',
		'TITLE_CHANGED',
		'NAME_CHANGED',
		'DESCRIPTION_CHANGED',
		'DATE_CHANGED',
		'START_TIME_CHANGED',
		'END_TIME_CHANGED',
		'LOCATION_CHANGED',
		'E_POINTS_CHANGED',
		'EVENT_ID_CHANGED',
		'EVENT_ERROR',
		'GO_TO_CREATE_EVENT',
		'GO_TO_CREATE_EVENT_FROM_EDIT',
		'GO_TO_EVENT',
		'GO_TO_VIEW_EVENT',
		'PAGE_LOAD'
]);


const INITIAL_STATE = {
	eventList: undefined,
	type: '',
	committee: '',
	title: 'Create Event',
	name: '',
	description: '',
	date: '',
	startTime: '',
	endTime: '',
	location: '',
	points: 0,
	eventID: {},
	code: 'AAAA',
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	const { payload } = action;
	
	switch (action.type) {
		case ACTIONS.FETCH_EVENTS:
			return { ...state,
				eventList: payload
			};
		case ACTIONS.FETCH_CODE:
			return { ...state,
				code: payload
			};
		case ACTIONS.CREATE_EVENT:
			return { ...state,
				error: ''
			};
		case ACTIONS.EDIT_EVENT:
			return { ...state,
				error: ''
			};
		case ACTIONS.DELETE_EVENTS:
			return { ...state,
				type: '',
				committee: '',
				name: '',
				description: '',
				date: '',
				startTime: '',
				endTime: '',
				location: '',
				points: 0,
				eventID: '',
				error: ''
			};
		case ACTIONS.CHECK_IN:
			return state;
		case ACTIONS.RSVP:
			return state;
		case ACTIONS.TYPE_CHANGED:
			return { ...state,
				type: payload
			};
		case ACTIONS.COMMITTEE_CHANGED:
			return { ...state,
				committee: payload
			};
		case ACTIONS.TITLE_CHANGED:
			return { ...state,
				title: payload
			};
		case ACTIONS.NAME_CHANGED:
			return { ...state,
				name: payload
			};
		case ACTIONS.DESCRIPTION_CHANGED:
			return { ...state,
				description: payload
			};
		case ACTIONS.DATE_CHANGED:
			return { ...state,
				date: payload
			};
		case ACTIONS.START_TIME_CHANGED:
			return { ...state,
				startTime: payload
			};
		case ACTIONS.END_TIME_CHANGED:
			return { ...state,
				endTime: payload
			};
		case ACTIONS.LOCATION_CHANGED:
			return { ...state,
				location: payload
			};
		case ACTIONS.E_POINTS_CHANGED:
			return { ...state,
				points: payload
			};
		case ACTIONS.EVENT_ID_CHANGED:
			return { ...state,
				eventID: payload
			};
		case ACTIONS.EVENT_ERROR:
			return { ...state,
				error: payload,
			};
		case ACTIONS.GO_TO_CREATE_EVENT:
			return {...state,
				title: 'Create Event',
				type: payload.type,
				committee: payload.committee,
				name: '',
				description: '',
				startTime: '',
				endTime: '',
				location: '',
				points: payload.points,
				eventID: '',
				code: '',
				error: '',
			};
		case ACTIONS.GO_TO_CREATE_EVENT_FROM_EDIT:
			return state;
		case ACTIONS.GO_TO_EVENT:
			return {...state,
				type: '',
				committee: '',
				name: '',
				description: '',
				date: '',
				startTime: '',
				endTime: '',
				location: '',
				points: 0,
				eventID: [],
				code: '',
				error: ''
			};
		case ACTIONS.GO_TO_VIEW_EVENT:
			return state;
		default:
			return state;
	}
};

function makeCode(length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		for (var i = 0; i < length; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
}

export const createEvent = (typeU, committeeU, nameU, descriptionU, dateU, startTimeU, endTimeU, locationU, pointsU ) => {
	var committee = false;

	if (committeeU !== ''){
		committee = true;
	}

	let postRef = firebase.database().ref('/events/').push({
		type: typeU,
		committee: committeeU,
		name: nameU,
		description: descriptionU,
		date: dateU,
		startTime: startTimeU,
		endTime: endTimeU,
		eventActive: false,
		location: locationU,
		points: pointsU,
		code:  makeCode(4)
	})
	.then(snapshot => {
			if (committee === true){
			firebase.database().ref(`/committees/${committeeU}/events/`).update({ 
				[snapshot.key]: true
			})
 }
	})
		.then(() => Alert.alert('Event Created','Successful'))
		.catch((error) => Alert.alert('Event Created Failed', 'Failure'));



	return (dispatch) => {  
		dispatch({
			type: ACTIONS.CREATE_EVENT,
		})
	}
};

export const openCheckIn = (eventID) => {
		return () => {
				firebase.database().ref(`/events/${eventID}/`).update({
								eventActive: true
						})
						.catch((error) => alert('Event Check-In could not be Started!', 'Failure'))
		}
};

export const closeCheckIn = (eventID) => {
		return () => {
				firebase.database().ref(`/events/${eventID}/`).update({
								eventActive: false
						})
						.catch((error) => alert('Event Check-In could not be closed!', 'Failure'))
		}
};

export const editEvent = (typeU, committeeU, nameU, descriptionU, dateU, startTimeU, endTimeU, locationU, pointsU, eventIDU ) => {
	var committee = false;
	var pastCommittee = false

	if (committeeU !== ''){
		committee = true;
	}

	firebase.database().ref(`events/${eventIDU}`).once('value', snapshot => {
		if (snapshot.val().committee !== ''){
			firebase.database().ref(`committees/${snapshot.val().committee}/events/`).update({[eventIDU]: {}})
		}
	})
	.then(() => {firebase.database().ref(`/events/${eventIDU}`).update({
					type: typeU,
					committee: committeeU,
					name: nameU,
					description: descriptionU,
					date: dateU,
					startTime: startTimeU,
					endTime: endTimeU,
					location: locationU,
					points: pointsU,
	})})
	.then(() => {
		if (committee === true){
			firebase.database().ref(`/committees/${committeeU}/events/`).update({ 
				[eventIDU]: true
			})
		}
	})
	.then(() => Alert.alert('Event Edited', 'Successful'))
	.catch((error) => Alert.alert('Event edit Failed', 'Failure'));

	return (dispatch) => {
			dispatch({
					type: ACTIONS.EDIT_EVENT,
			});
	}
};

export const deleteEvents = (eventIDs) => {
				firebase.database().ref(`events/${eventIDs}`).once('value', snapshot => {
					if (snapshot.val().committee !== ''){
						firebase.database().ref(`committees/${snapshot.val().committee}/events/`).update({[eventIDs]: {}})
					}
				})
				.then(() => firebase.database().ref('events').update({[eventIDs]: {}}))
				.then(() => Alert.alert('Event Deleted', 'Successful'))
				.catch((error) => Alert.alert('Event Deletion Failed', 'Failure'));

		return (dispatch) => {
				dispatch({
						type: ACTIONS.DELETE_EVENTS,
				});
		}
}

export const checkIn = (eventID, val, id, board) => {
	const { currentUser } = firebase.auth();
	let points, valId = currentUser.uid;
	
	if (id) valId = id;

	if (board !== undefined && board !== null) {
		return (dispatch) => {
			firebase.database().ref(`events/${eventID}/attendance/${valId}`).once('value', snapshot => {
				firebase.database().ref(`events/${eventID}/rsvp/${valId}`).once('value', snapshot => {
					points = (snapshot.exists()) ? 1 : 0;
				})
				.then(() => firebase.database().ref(`points/${valId}/points`).once('value', snapshot => {
					points += parseInt(snapshot.val()) + parseInt(val);
					firebase.database().ref(`events/${eventID}`).once('value', snapshot => {
						var realType = snapshot.val().type;
						if (snapshot.val().committee !== '') realType = snapshot.val().committee;
						firebase.database().ref(`events/${eventID}/attendance`).update({[valId]: true})
						.then(() => {firebase.database().ref(`points/${valId}/points`).set(points)})
						.then(() => {firebase.database().ref(`points/${valId}/breakdown/${realType}/${eventID}`).update({
							points: val,
							name: snapshot.val().name,
							date: snapshot.val().date,
							committee: snapshot.val().committee,
							board: board
						})})
						.then(() => firebase.database().ref(`users/${valId}/points`).set(points))
					})
				}))
			})
		}
	}

	else {
		return (dispatch) => {
			firebase.database().ref(`events/${eventID}/eventActive`).once('value', snapshot => {
				if (snapshot.val())
					firebase.database().ref(`events/${eventID}/attendance/${valId}`).once('value', snapshot => {
						if (!snapshot.exists()) {
							firebase.database().ref(`events/${eventID}/rsvp/${valId}`).once('value', snapshot => {
								points = (snapshot.exists()) ? 1 : 0;
							})
							.then(() => firebase.database().ref(`points/${valId}/points`).once('value', snapshot => {
								points += parseInt(snapshot.val()) + parseInt(val);
								firebase.database().ref(`events/${eventID}`).once('value', snapshot => {
									var realType = snapshot.val().type;
									if (snapshot.val().committee !== '') realType = snapshot.val().committee;
									firebase.database().ref(`events/${eventID}/attendance`).update({[valId]: true})
									.then(() => firebase.database().ref(`points/${valId}/points`).set(points))
									.then(() => firebase.database().ref(`points/${valId}/breakdown/${realType}/${eventID}`).update({
										points: val,
										name: snapshot.val().name,
										date: snapshot.val().date,
										committee: snapshot.val().committee,
									}))
									.then(() => firebase.database().ref(`users/${valId}/points`).set(points))
									.then(() => Alert.alert('Checked In', 'Successful'))
									.catch((error) => Alert.alert('Check In Failed', 'Failure'))
								})
							}))
						} else Alert.alert('You have already attended this event!', 'Failure');
					}); else Alert.alert('Event check-in for this event is not open', 'Failure');
			})
		};
	}
}

export const rsvp = (eventID, id) => {
	const { currentUser } = firebase.auth();
	let points, valId = currentUser.uid;
	
	if (id) valId = id;

	return (dispatch) => {
		firebase.database().ref(`events/${eventID}/rsvp/${valId}`).once('value', snapshot => {
			if (!snapshot.exists()) {
				firebase.database().ref(`events/${eventID}/rsvp`).update({[valId]: true})
				.then(() => Alert.alert("You have RSVP'd"))
			}
			else {
				firebase.database().ref(`events/${eventID}/rsvp`).update({[valId]: null})
				.then(() => Alert.alert("You have been removed from the RSVP list"))
			}
		});
	};
}

export const fetchEvents = () => {
		return (dispatch) => {
				firebase.database().ref('events/').on('value', snapshot => {
						const eventList = (snapshot.val());
						dispatch({
								type: ACTIONS.FETCH_EVENTS,
								payload: eventList,
						});
				});
		};
};

export const fetchCode = (eventID) => {
		return (dispatch) => {
				firebase.database().ref(`events/${eventID}/code`).on('value', snapshot => {
						const code = snapshot.val();
						// Alert.alert(`${eventID} ${code}`)
						dispatch({
								type: ACTIONS.FETCH_CODE,
								payload: code,
						});
				});
		};
};

export const typeChanged = (text) => {
		return {
				type: ACTIONS.TYPE_CHANGED,
				payload: text
		};
};

export const committeeChanged = (text) => {
	return {
		type: ACTIONS.COMMITTEE_CHANGED,
		payload: text
	};
};

export const titleChanged = (text) => {
		return {
				type: ACTIONS.TITLE_CHANGED,
				payload: text
		};
};

export const nameChanged = (text) => {
		return {
				type: ACTIONS.NAME_CHANGED,
				payload: text
		};
};
export const descriptionChanged = (text) => {
		return {
				type: ACTIONS.DESCRIPTION_CHANGED,
				payload: text
		};
};
export const dateChanged = (text) => {
		return {
				type: ACTIONS.DATE_CHANGED,
				payload: text
		};
};
export const startTimeChanged = (text) => {
		return {
				type: ACTIONS.START_TIME_CHANGED,
				payload: text
		};
};
export const endTimeChanged = (text) => {
	return {
			type: ACTIONS.END_TIME_CHANGED,
			payload: text
	};
};
export const locationChanged = (text) => {
		return {
				type: ACTIONS.LOCATION_CHANGED,
				payload: text
		};
};
export const epointsChanged = (text) => {
		return {
				type: ACTIONS.E_POINTS_CHANGED,
				payload: text
		};
};
export const eventIDChanged = (text) => {
		return {
				type: ACTIONS.EVENT_ID_CHANGED,
				payload: text
		};
};

export const eventError = (text) => {
		return {
				type: ACTIONS.EVENT_ERROR,
				payload: text
		};
};

export const goToCreateEvent = (screen, props) => {
		return (dispatch) => {

				if (props === undefined || props === null){
						props = {type: "", committee: ""}
				}


				dispatch({
						type: ACTIONS.GO_TO_CREATE_EVENT,
						payload: props
				});
				if (screen === "events") Actions["createEventE"]({screen: screen})
				else if (screen === ("dashboard" + "committeepage")) Actions["createEventCPD"]({screen: screen})
				else if (screen === ("committees" + "committeepage")) Actions["createEventC"]({screen: screen})
		}
};

export const goToCreateEventFromEdit = (screen) => {
		return (dispatch) => {
				dispatch({
						type: ACTIONS.GO_TO_CREATE_EVENT_FROM_EDIT
				});

				if (screen === "dashboard")  Actions["createEventD"]({screen: screen})
				else if (screen === "events") Actions["createEventE"]({screen: screen})
				else if (screen === ("dashboard" + "committeepage")) Actions["createEventCPD"]({screen: screen})
				else if (screen === ("committees" + "committeepage")) Actions["createEventC"]({screen: screen})
		}
};

export const goToEvents = () => {
		return (dispatch) => {
				dispatch({
						type: ACTIONS.GO_TO_EVENT
				});
				Actions.event();
		}
};

export const goToViewEvent = (screen) => {
		return (dispatch) => {
				dispatch({
						type: ACTIONS.GO_TO_VIEW_EVENT
				});

				if (screen === "dashboard") Actions["eventDetailsD"]({screen: screen})
				else if (screen === "events" ) Actions["eventDetails"]({screen: screen})
				else if (screen === ("dashboard" + "committeepage")) Actions["eventDetailsCPD"]({screen: screen})
				else if (screen === ("committees" + "committeepage")) Actions["eventDetailsC"]({screen: screen})
			}
	}


// Use this function to update keys or duplicate/copy test data on Firebase -
// Be careful, especially if setting anything to null as it will delete it on Firebase.
// Delete in production
/* export const updateDuplicateDeleteOnFirebase = () => {

	return() => {
		let update = {
			"2018-01-22": [
				{id:"180122GBM", title: "First GBM", description: "First Spring 2018 General Body Meeting", location: "HEC 101", time: "6:30PM-7:30PM", type: "GBM", value: 5},
			],
			"2018-01-25": [
				{id:"180125FCM", title: "Fundraising Committee Meeting", description: "First Spring 2018 General Body Meeting", location: "HEC 101", time: "6:30PM-7:30PM", type: "GBM", value: 5},
			],
			"2018-01-31": [
				{id:"18013MTSH", title: "MentorSHPE Meeting", description: "First Spring 2018 General Body Meeting", location: "HEC 101", time: "6:30PM-7:30PM", type: "GBM", value: 5},
			],
		};
		firebase.database().ref('events').set(update);
	}
};
*/
