import firebase from 'firebase';

import {
  FETCH_MEMBERS
} from './types.js';

export const fetchMembers = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/`)
    .on('value', snapshot => {
      dispatch({
        type: FETCH_MEMBERS,
        payload: snapshot.val(),
      });
    });
  };
};
