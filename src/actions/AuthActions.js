import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  COLLEGE_CHANGED,
  MAJOR_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  RESET_PASSWORD,
  REGISTRATION_ERROR,
  SHOW_FIREBASE_ERROR,
  VERIFIED_USER,
  ENTER_APP,
  LOGIN_USER,
  LOAD_USER,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  GO_TO_RESET_PASSWORD,
  GO_TO_LOGIN,
  GO_TO_REGISTRATION } from './types';



export const firstNameChanged = (text) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text
  };
};
export const lastNameChanged = (text) => {
  return {
    type: LAST_NAME_CHANGED,
    payload: text
  };
};
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
export const collegeChanged = (text) => {
  return {
    type: COLLEGE_CHANGED,
    payload: text
  };
};
export const majorChanged = (text) => {
  return {
    type: MAJOR_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const confirmPasswordChanged = (text) => {
  return {
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
};

export const registrationError = (dispatch, error) => {
  return (dispatch) => {
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error
    });
  }
};

const showFirebaseError = (dispatch, error) => {
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

  dispatch({
    type: SHOW_FIREBASE_ERROR,
    payload: errorMessage
  });
};

// Registration Actions
export const createUser = ({ firstName, lastName, email, college, major, password }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => createUserSuccess(dispatch, user, firstName, lastName, email, college, major))
      .catch((error) => createUserFail(dispatch, error))
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

  dispatch({
    type: CREATE_USER_FAIL,
    payload: errorMessage
  });
};

const createUserSuccess = (dispatch, user, firstName, lastName, email, college, major) => {
  const { currentUser } = firebase.auth();
  emailVerified = false;
  firebase.database().ref(`/users/${currentUser.uid}/`)
    .set({ firstName, lastName, email, college, major, emailVerified})
    .then(() => currentUser.sendEmailVerification())
    .then(() => firebase.auth().signOut())
    .then(() => Alert.alert('Account Created',
      `Please verify your email ${email} then log in using your credentials.`));

  dispatch({
    type: CREATE_USER_SUCCESS,
  });
};

// Login Actions
const isVerifiedUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: VERIFIED_USER });
  }
}

export const resetPassword = ({ email }) => {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD });

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => Alert.alert('Reset Started',
        `If an account with email ${email} exists, a reset password email will be sent. Please check your email.`))
      .then(() => Actions.login())
      .catch(error => showFirebaseError(dispatch, error));
  };
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => loginUserFail(dispatch, error));
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: ENTER_APP,
    payload: user
  });
};

export const loadUser = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    if ( currentUser != null ) {
      firebase.database().ref(`/users/${currentUser.uid}/`)
        .on('value', snapshot => {
          dispatch({
            type: LOAD_USER,
            payload: snapshot.val(),
          });
      });
    };
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

  dispatch({
    type: LOGIN_USER_FAIL,
    payload: errorMessage
  });
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

    firebase.auth().signOut()
      .then(Actions.login())
      .then(Alert.alert('Signed Out', 'Have a great day!'));
  };
};

export const goToResetPassword = () => {
  return (dispatch) => {
    dispatch({ type: GO_TO_RESET_PASSWORD });
    Actions.resetPassword();
  }
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
