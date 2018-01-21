import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  GO_TO_LOGIN,
  GO_TO_REGISTRATION } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => loginUserFail(dispatch, error));
  };
};

export const loginUserFail = (dispatch, error) => {
  let errorMessage;

  switch (error.code) {
    case 'auth/user-not-found':
      errorMessage = 'There is no user record corresponding to this identifier';
      break;
    case 'auth/invalid-email':
      errorMessage = 'Enter a valid email';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Incorrect credentials';
      break;
    case 'auth/network-request-failed':
      errorMessage = 'Network error. Check your Internet connectivity.';
      break;
    default:
    errorMessage = error.message;
  }
  console.log(error);

  dispatch({
    type: LOGIN_USER_FAIL,
    payload: errorMessage
  });
};

export const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

export const goToLogIn = () => {
  return (dispatch) => {
    dispatch({ type: GO_TO_LOGIN });

    Actions.login();
  }
};

export const goToRegistration = () => {
  return (dispatch) => {
    dispatch({ type: GO_TO_REGISTRATION });

    Actions.registration();
  }

};

export const createUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => createUserSuccess(dispatch, user))
      .catch((error) => createUserFail(dispatch, error));
  };
};

const createUserFail = (dispatch, error) => {
  let errorMessage;

  switch (error.code) {
    case 'auth/user-not-found':
      errorMessage = 'There is no user record corresponding to this identifier';
      break;
    case 'auth/invalid-email':
      errorMessage = 'Enter a valid email';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Incorrect credentials';
      break;
    default:
    errorMessage = error.message;
  }
  console.log(error);

  dispatch({
    type: CREATE_USER_FAIL,
    payload: errorMessage
  });
};

const createUserSuccess = (dispatch, user) => {
  dispatch({
    type: CREATE_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

    firebase.auth().signOut();
    Actions.login();
  };
};
