import firebase from 'firebase';

import {
  USER_FETCH
} from './types.js';

export const userFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/`)
    .on('value', snapshot => {
      dispatch({
        type: USER_FETCH,
        payload: snapshot.val(),
      });
    });
  };
};
