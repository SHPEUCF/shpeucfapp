import firebase from 'firebase';
import _ from 'lodash';
import { Alert } from 'react-native';

import {
  FETCH_EVENTS,
  CREATE_EVENT_SUCCESS,
} from './types';


const createEvent = (dispatch, type, title, description, date, time, location, value ) => {

  firebase.database().ref(`/events`)
    .push({ type, title, description, date, time, location, value })
    .then(() => Alert.alert('Event Created',
      `Successful`));

  dispatch({
    type: CREATE_EVENT_SUCCESS,
  });
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



