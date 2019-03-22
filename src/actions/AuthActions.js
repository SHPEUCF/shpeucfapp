import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  COLLEGE_CHANGED,
  MAJOR_CHANGED,
  POINTS_CHANGED,
  PRIVILEGE_CHANGED,
  PICTURE_CHANGED,
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
  EDIT_USER,
  GET_PRIVILEGE,
  GO_TO_RESET_PASSWORD,
  GO_TO_LOGIN,
  GO_TO_PROFILE,
  GO_TO_REGISTRATION,
  GO_TO_EDIT_PROFILE_FORM,
  QUOTE_CHANGED,
  NATIONALITY_CHANGED,
  DATE_BIRTH_CHANGED,
  PAGE_LOAD } from './types';

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
export const pointsChanged = (text) => {
  return {
    type: POINTS_CHANGED,
    payload: text
  };
};
export const dateBirthChanged = (text) => {
  return {
    type: DATE_BIRTH_CHANGED,
    payload: text
  };
}
export const nationalityChanged = (text) => {
  return {
    type: NATIONALITY_CHANGED,
    payload: text
  };
}
export const privilegeChanged = (text) => {
  return {
    type: PRIVILEGE_CHANGED,
    payload: text
  };
};
export const pictureChanged = (text) => {
  return {
    type: PICTURE_CHANGED,
    payload: text
  };
};

export const confirmPasswordChanged = (text) => {
  return {
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
};

export const quoteChanged = (text) => {
  return {
    type: QUOTE_CHANGED,
    payload: text
  };
};

export const registrationError = (error) => {
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
export const createUser = ({ firstName, lastName, email, college, major, points, picture, password, quote, nationality, birthday }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => createUserSuccess(dispatch, firstName, lastName, email, college, major, points, picture, quote, nationality, birthday))
      .catch((error) => createUserFail(dispatch, error))
  };
};

const createUserFail = (dispatch, error) => {
  firebase.auth().signOut();
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

const createUserSuccess = (dispatch, firstName, lastName, email, college, major, points, picture, quote, nationality, birthday) => {
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/`).set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      college: college,
      major: major,
      points: points,
      picture: picture,
      quote: quote,
      nationality: nationality,
      birthday: birthday,
      id: currentUser.uid
    })
    .then(() => firebase.database().ref(`/points/${currentUser.uid}/`).set({
      firstName: firstName,
      lastName: lastName,
      points: points,
      id: currentUser.uid
    }))
    .then(() => firebase.database().ref(`/privileges/${currentUser.uid}/`).set({
      firstName: firstName,
      lastName: lastName,
      user: true,
      board: false,
      eboard: false,
      president: false,
      id: currentUser.uid
    }))
    .then(() => currentUser.sendEmailVerification())
    .then(() => firebase.auth().signOut())
    .then(() => Alert.alert('Account Created',
      `Please verify your email ${emailU} then log in using your credentials.`));

  dispatch({
    type: CREATE_USER_SUCCESS,
  });
};

export const editUser = ( firstName, lastName, email, college, major, points, quote, nationality, birthday ) => {
  return (dispatch) => {
  const {
    currentUser
  } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/`).update({
      firstName: firstName,
      lastName: lastName,
      email: email,
      college: college,
      major: major,
      points: points,
      quote: quote,
      nationality: nationality,
      birthday: birthday
    })
    .then(() => firebase.database().ref(`/points/${currentUser.uid}/`).update({
      firstName: firstName,
      lastName: lastName,
      points: points,
    }))
    .then(() => firebase.database().ref(`/privileges/${currentUser.uid}/`).update({
      firstName: firstName,
      lastName: lastName,
      user: true,
      board: false,
      eboard: false,
      president: false
    }))
    .then(() => Alert.alert('Account Updated'));

  dispatch({
    type: EDIT_USER,
  });
}
};

export const getPrivilege = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    if ( currentUser != null ) {
      firebase.database().ref(`/privileges/${currentUser.uid}/`)
        .on('value', snapshot => {
          dispatch({
            type: GET_PRIVILEGE,
            payload: snapshot.val(),
          })
          dispatch({
            type: PAGE_LOAD,
            payload: false
          });
      })
    };
  };
}





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
  loadUser();
  dispatch({
    type: ENTER_APP,
    payload: user
  });
};

export const loadUser = (userID) => {
  const { currentUser } = firebase.auth();
  var id = (typeof userID === "undefined") ? currentUser.uid : userID;
  return (dispatch) => {
    if ( currentUser != null ) {
      firebase.database().ref(`/users/${id}/`).on('value', snapshot => {
        dispatch({
          type: LOAD_USER,
          payload: snapshot.val()
        });
        dispatch({
          type: PAGE_LOAD,
          payload: false
        });
      })
    }
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

export const goToProfile = () => {
  return (dispatch) => {
    dispatch({ type: GO_TO_PROFILE });
    Actions.profile();
  }
};

export const goToRegistration = () => {
  return (dispatch) => {
    dispatch({ type: GO_TO_REGISTRATION });
    Actions.registration();

  }
};

export const goToEditProfileForm = () => {
  return (dispatch) => {
    dispatch({
      type: GO_TO_EDIT_PROFILE_FORM
    });
    Actions.EditProfileForm();
  }
};
