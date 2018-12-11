import firebase from 'firebase';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import {
  FETCH_EVENTS,
  CREATE_EVENT,
  TYPE_CHANGED,
  NAME_CHANGED,
  DESCRIPTION_CHANGED,
  DATE_CHANGED,
  TIME_CHANGED,
  LOCATION_CHANGED,
  E_POINTS_CHANGED,
  EVENT_ERROR,
  GO_TO_CREATE_EVENT,
  GO_TO_EVENT
} from './types';


export const createEvent = (typeU, nameU, descriptionU, dateU, timeU, locationU, pointsU ) => {

  firebase.database().ref('/events/' + dateU)
    .push({ 
      type: typeU,
      name: nameU,
      description: descriptionU,
      date: dateU,
      time: timeU,
      location: locationU,
      points: pointsU })
    .then(() => Alert.alert('Event Created','Successful'))
    .catch((error) => Alert.alert('Event Created Failed', 'Failure'));

  return (dispatch) => {  
    dispatch({
      type: CREATE_EVENT,
    });
  }
};

export const fetchEvents = () => {

  return (dispatch) => {
  firebase.database().ref('events')
    .on('value', snapshot => {
      const eventList = (snapshot.val());
      dispatch({
        type: FETCH_EVENTS,
        payload: eventList,
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

export const goToEvents = () => {
  return (dispatch) => {
    dispatch({
      type: GO_TO_EVENT
    });
    Actions.event();
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
