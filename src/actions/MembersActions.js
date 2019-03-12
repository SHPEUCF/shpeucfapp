import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import {
  FIRST_NAME_CHANGED_MEMBER,
  LAST_NAME_CHANGED_MEMBER,
  EMAIL_CHANGED_MEMBER,
  COLLEGE_CHANGED_MEMBER,
  MAJOR_CHANGED_MEMBER,
  POINTS_CHANGED_MEMBER,
  PRIVILEGE_CHANGED_MEMBER,
  PICTURE_CHANGED_MEMBER,
  PASSWORD_CHANGED_MEMBER,
  CONFIRM_PASSWORD_CHANGED_MEMBER,
  FETCH_MEMBERS_POINTS,
  FETCH_MEMBER_PROFILE,
  EDIT_MEMBER,
  GO_TO_OTHER_PROFILE,
  GO_TO_EDIT_OTHER_PROFILE_FORM,
  QUOTE_CHANGED_MEMBER,
  PAGE_LOAD,
  DATE_BIRTH_CHANGED_MEMBER,
  NATIONALITY_CHANGED_MEMBER,
  FETCH_FILTERS
} from './types.js';

export const firstNameChangedMember = (text) => {
  return {
    type: FIRST_NAME_CHANGED_MEMBER,
    payload: text
  };
};
export const lastNameChangedMember = (text) => {
  return {
    type: LAST_NAME_CHANGED_MEMBER,
    payload: text
  };
};
export const emailChangedMember = (text) => {
  return {
    type: EMAIL_CHANGED_MEMBER,
    payload: text
  };
};
export const collegeChangedMember = (text) => {
  return {
    type: COLLEGE_CHANGED_MEMBER,
    payload: text
  };
};
export const majorChangedMember = (text) => {
  return {
    type: MAJOR_CHANGED_MEMBER,
    payload: text
  };
};

export const passwordChangedMember = (text) => {
  return {
    type: PASSWORD_CHANGED_MEMBER,
    payload: text
  };
};
export const pointsChangedMember = (text) => {
  return {
    type: POINTS_CHANGED_MEMBER,
    payload: text
  };
};
export const privilegeChangedMember = (text) => {
  return {
    type: PRIVILEGE_CHANGED_MEMBER,
    payload: text
  };
};
export const pictureChangedMember = (text) => {
  return {
    type: PICTURE_CHANGED_MEMBER,
    payload: text
  };
};
export const nationalitychangedMember = (text) => {
  return {
    type: NATIONALITY_CHANGED_MEMBER,
    payload: text
  };
};
export const datebirthchangedMember = (text) => {
  return {
    type: DATE_BIRTH_CHANGED_MEMBER,
    payload: text
  };
};
export const fetchFilters = (text) => {
  return {
    type: FETCH_FILTERS,
    payload: text
  };
};

export const confirmPasswordChangedMember = (text) => {
  return {
    type: CONFIRM_PASSWORD_CHANGED_MEMBER,
    payload: text
  };
};

export const quoteChangedMember = (text) => {
  return {
    type: QUOTE_CHANGED_MEMBER,
    payload: text
  };
};


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

export const fetchMemberProfile = (userID) => {
  const { currentUser } = firebase.auth();
  var id = (typeof userID === "undefined") ? currentUser.uid : userID;
  return (dispatch) => {
    if ( currentUser != null ) {
      firebase.database().ref(`/users/${id}/`).on('value', snapshot => {
          dispatch({
            type: FETCH_MEMBER_PROFILE,
            payload: snapshot.val()
          }
        );
          dispatch({
            type: PAGE_LOAD,
            payload: false
          }
        );

      })
    }
  };
};

export const editMember = ( firstNameU, lastNameU, emailU, collegeU, majorU, pointsU, quoteU, idU, nationalityU, date_birthU ) => {
  return (dispatch) => {

  firebase.database().ref(`/users/${idU}/`).update({
      firstName: firstNameU,
      lastName: lastNameU,
      email: emailU,
      college: collegeU,
      major: majorU,
      points: pointsU,
      quote: quoteU,
      nationality: nationalityU,
      date_of_birth: date_birthU
    })
    .then(() => firebase.database().ref(`/points/${idU}/`).update({
      firstName: firstNameU,
      lastName: lastNameU,
      points: pointsU,
    }))
    .then(() => firebase.database().ref(`/privileges/${idU}/`).update({
      firstName: firstNameU,
      lastName: lastNameU,
      user: true,
      board: false,
      eboard: false,
      president: false
    }))
    .then(() => Alert.alert('Account Updated'));

  dispatch({
    type: EDIT_MEMBER,
  });
}
};

export const goToOtherProfile = () => {
  return (dispatch) => {
    dispatch({
      type: GO_TO_OTHER_PROFILE
    });
    Actions.OtherProfile();
  }
};

export const goToEditOtherProfileForm = () => {
  return (dispatch) => {
    dispatch({
      type: GO_TO_EDIT_OTHER_PROFILE_FORM
    });
    Actions.EditOtherProfileForm();
  }
};
