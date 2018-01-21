// handle all things related to authentication
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
  GO_TO_REGISTRATION } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loggedIn: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state,
        email: payload
      };
    case PASSWORD_CHANGED:
      return { ...state,
        password: payload
      };
    case LOGIN_USER:
      return { ...state,
        loading: true,
        error: ''
      };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        ...INITIAL_STATE,
        user: payload,
        loggedIn: true
      };
    case LOGIN_USER_FAIL:
      return { ...state,
        error: payload,
        loading: false,
        password: ''
      };
    case CREATE_USER:
      return { ...state,
        loading: true,
        error: ''
      };
    case CREATE_USER_SUCCESS:
      return { ...state,
        ...INITIAL_STATE,
        user: payload
      };
    case CREATE_USER_FAIL:
      return { ...state,
        error: payload,
        loading: false,
        email: '',
        password: ''
      };
    case LOGOUT_USER:
      return { ...state,
        loggedIn: false,
      };
    case GO_TO_LOGIN:
      return INITIAL_STATE;
    case GO_TO_REGISTRATION:
      return INITIAL_STATE;
    default:
      return state;
  }
}
