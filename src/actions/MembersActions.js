import firebase from 'firebase';
import _ from 'lodash';

import {
  FETCH_MEMBERS_POINTS
} from './types.js';

export const fetchMembersPoints = () => {

  return (dispatch) => {
  firebase.database().ref(`/points`)
    .on('value', snapshot => {
      const membersPoints = (snapshot.val());

      dispatch({
        type: FETCH_MEMBERS_POINTS,
        payload: membersPoints,
      });
    });
  };
};
