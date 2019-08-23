import firebase, { auth } from 'firebase';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import {
    PAGE_LOAD,
    GET_COMMITTEES,
    GO_TO_COMMITTEE_FORM,
    EDIT_COMMITTEE,
    DELETE_COMMITTEE,
    COMMITTEE_DESCRIPTION_CHANGED,
    COMMITTEE_TITLE_CHANGED,
    CHAIR_CHANGED,
    FILTER_CHANGED
} from './types';

export const pageLoad = () => {
  return {
    type: PAGE_LOAD,
    payload: true
  };
};

export const getCommittees = () => {

  return (dispatch) => {
  firebase.database().ref(`/committees/`)
    .on('value', snapshot => {
      const committtees = (snapshot.val());

      dispatch({
        type: GET_COMMITTEES,
        payload: committtees,
      });
    });
  };
};

export const goToCommitteeForm = (text) => {
  Actions.CommitteeForm()
  return {
      type: GO_TO_COMMITTEE_FORM,
      payload: text
  }
};

export const addCommittee = (title, description, chair, length) => {
  return () => {
      firebase.database().ref(`/committees/${title}`).set({
              title: title,
              description: description,
              chair: chair,
              level: length
          })
          .then(() => alert('Committee Added!', 'Successful'))
          .catch((error) => alert('Committee could not be Added!', 'Failure'))
  }
};


export const editCommittee = (title, description, chair, oldTitle) => {
if (oldTitle !== null){
  var level;
  firebase.database().ref(`/committees/${oldTitle}/level`).once('value', snapshot => {
  level = snapshot.val();
  })
  return (dispatch) => {

  firebase.database().ref(`/committees/${oldTitle}`).remove()
  .then(() => {
      dispatch({
          type: DELETE_COMMITTEE,
      });
  })
  .then(() => firebase.database().ref(`/election/committees/${title}`).set({
          title: title,
          description: description,
          chair: chair,
          level: level
  }))
  .then(() => alert('Committee Edited!', 'Successful'))
  .catch((error) => alert('Committee could not be Edited!', 'Failure'))
}
}

else {
  return (dispatch) => {
      firebase.database().ref(`/committees/${title}`).update({
              title: title,
              description: description,
              chair: chair
          })
          .then(() => {
              dispatch({
                  type: EDIT_COMMITTEE,
              });
          })
          .then(() => alert('Committee Edited!', 'Successful'))
          .catch((error) => alert('Committee could not be Edited!', 'Failure'))
  }
}
};

export const deleteCommittee = (text, chair) => {
  return (dispatch) => {
      
      firebase.database().ref(`/users/${chair.id}/board`).remove()
      .then(() => firebase.database().ref(`/privileges/${chair.id}/`).update({
        board: false,
      }))

      firebase.database().ref(`/committees/${text}`).remove()
          .then(() => {
              dispatch({
                  type: DELETE_COMMITTEE,
              });
          })
          .then(() => alert('Committee Deleted!', 'Successful'))
          .catch((error) => alert('Committee could not be deleted!', 'Failure'))
  }
};

export const committeeTitleChanged = (text) => {
  return {
      type: COMMITTEE_TITLE_CHANGED,
      payload: text
  };
};

export const committeeDescriptionChanged = (text) => {
  return {
      type: COMMITTEE_DESCRIPTION_CHANGED,
      payload: text
  };
};

export const chairChanged = (text) => {
  return {
      type: CHAIR_CHANGED,
      payload: text
  };
};

export const filterChanged = (text) => {
  return {
      type: FILTER_CHANGED,
      payload: text
  };
};

export const changeLevelsCom = (committees) => {

  return () => {
    firebase.database().ref(`/committees/`).once('value', snapshot => {
    obj = snapshot.val()
    committees.forEach(function(item, index){
        obj[item.committee.title].level = index
    });
  firebase.database().ref(`/committees/`).update(obj)
  })
  .then(() => alert('Order Set!', 'Successful'))
  .catch((error) => alert('Order could not be set!', 'Failure'))
  };
};