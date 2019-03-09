import firebase, { auth } from 'firebase';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import {
  CREATE_EVENT,
  DELETE_EVENTS,
  CHECK_IN,
  FETCH_EVENTS,
  FETCH_CODE,
  TYPE_CHANGED,
  TITLE_CHANGED,
  NAME_CHANGED,
  DESCRIPTION_CHANGED,
  DATE_CHANGED,
  TIME_CHANGED,
  LOCATION_CHANGED,
  E_POINTS_CHANGED,
  EVENT_ID_CHANGED,
  EVENT_ERROR,
  GO_TO_CREATE_EVENT,
  GO_TO_CREATE_EVENT_FROM_EDIT,
  GO_TO_EVENT,
  GO_TO_VIEW_EVENT
} from './types';

function makeCode(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const createEvent = (typeU, nameU, descriptionU, dateU, timeU, locationU, pointsU ) => {

  firebase.database().ref('/events/').push({ 
      type: typeU,
      name: nameU,
      description: descriptionU,
      date: dateU,
      time: timeU,
      eventActive: false,
      location: locationU,
      points: pointsU,
      code:  makeCode(4)})
    .then(() => Alert.alert('Event Created','Successful'))
    .catch((error) => Alert.alert('Event Created Failed', 'Failure'));

  return (dispatch) => {  
    dispatch({
      type: CREATE_EVENT,
    });
    Actions.event();
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

export const editEvent = (typeU, nameU, descriptionU, dateU, timeU, locationU, pointsU, eventIDU ) => {

  firebase.database().ref(`/events/${eventIDU}`).update({ 
      type: typeU,
      name: nameU,
      description: descriptionU,
      date: dateU,
      time: timeU,
      location: locationU,
      points: pointsU,
    })
    .then(() => Alert.alert('Event Edited','Successful'))
    .catch((error) => Alert.alert('Event edit Failed', 'Failure'));

  return (dispatch) => {  
    dispatch({
      type: CREATE_EVENT,
    });
    Actions.event();
  }
};

export const deleteEvents = (eventIDs) => {
  firebase.database().ref('events/').update(eventIDs)
  .then(() => Alert.alert('Event Deleted', 'Successful'))
  .catch((error) => Alert.alert('Event Deletion Failed', 'Failure'));

  return (dispatch) => {
    dispatch({
      type: DELETE_EVENTS,
    });
  }
}

export const checkIn = (eventID, val) => {
  const { currentUser } = firebase.auth();
  var points;
  return (dispatch) => {
    firebase.database().ref(`events/${eventID}/eventActive`).once('value', snapshot => {
      if(snapshot.val())
        firebase.database().ref(`events/${eventID}/attendance/${currentUser.uid}`).once('value',snapshot => {
          if (!snapshot.exists()){
            firebase.database().ref(`points/${currentUser.uid}/points`).once('value', snapshot => {
              points = parseInt(snapshot.val()) + parseInt(val);
              firebase.database().ref(`events/${eventID}/attendance`).set({[currentUser.uid]: true })
              .then(() => firebase.database().ref(`points/${currentUser.uid}/points`).set(points))
              .then(() => firebase.database().ref(`users/${currentUser.uid}/events`).set({[eventID]: true }))
              .then(() => firebase.database().ref(`users/${currentUser.uid}/points`).set(points))
              .then(() => Alert.alert('Checked In', 'Successful'))
              .catch((error) => Alert.alert('Check In Failed', 'Failure'))
            })
          }
          else
            Alert.alert('You have already attended this event!', 'Failure');

          dispatch({
            type: CHECK_IN,
          });
        })
      else
        Alert.alert('Event check-in for this event is not open', 'Failure')
  })};
}


export const fetchEvents = () => {
  return (dispatch) => {
  firebase.database().ref('events/').on('value', snapshot => {
      const eventList = (snapshot.val());
      dispatch({
        type: FETCH_EVENTS,
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
        type: FETCH_CODE,
        payload: code,
      });
    });
  };
};

export const typeChanged = (text) => {
  return {
    type: TYPE_CHANGED,
    payload: text
  };
};

export const titleChanged = (text) => {
  return {
    type: TITLE_CHANGED,
    payload: text
  };
};

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};
export const descriptionChanged = (text) => {
  return {
    type: DESCRIPTION_CHANGED,
    payload: text
  };
};
export const dateChanged = (text) => {
  return {
    type: DATE_CHANGED,
    payload: text
  };
};
export const timeChanged = (text) => {
  return {
    type: TIME_CHANGED,
    payload: text
  };
};
export const locationChanged = (text) => {
  return {
    type: LOCATION_CHANGED,
    payload: text
  };
};
export const epointsChanged = (text) => {
  return {
    type: E_POINTS_CHANGED,
    payload: text
  };
};
export const eventIDChanged = (text) => {
  return {
    type: EVENT_ID_CHANGED,
    payload: text
  };
};

export const eventError = (text) => {
  return {
      type: EVENT_ERROR,
      payload: text
  };
};

export const goToCreateEvent = () => {
  return (dispatch) => {
    dispatch({
      type: GO_TO_CREATE_EVENT
    });
    Actions.createEvent();
  }
};

export const goToCreateEventFromEdit = () => {
  return (dispatch) => {
    dispatch({
      type: GO_TO_CREATE_EVENT_FROM_EDIT
    });
    Actions.createEvent();
  }
};

export const goToEvents = () => {
  return (dispatch) => {
    dispatch({
      type: GO_TO_EVENT
    });
    Actions.event();
  }
};

export const goToViewEvent = ()  => {
  return (dispatch) => {
    dispatch({
      type: GO_TO_VIEW_EVENT
    });
    Actions.eventDetails();
  }
};

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
