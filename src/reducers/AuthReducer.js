// handle all things related to authentication
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  GO_TO_LOGIN,
  GO_TO_REGISTRATION } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: payload };
      break;
    case PASSWORD_CHANGED:
      return { ...state, password: payload };
      break;
    case LOGIN_USER:
      return { ...state,
        loading: true,
        error: '' };
        break;
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: payload };
      break;
    case LOGIN_USER_FAIL:
      return { ...state, error: payload, loading: false, password: '' };
    case CREATE_USER:
      return { ...state,
        loading: true,
        error: '' };
        break;
    case CREATE_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: payload };
      break;
    case CREATE_USER_FAIL:
      return { ...state, error: payload, loading: false, email: '', password: ''};
      break;
    case GO_TO_LOGIN:
      return INITIAL_STATE;
      break;
    case GO_TO_REGISTRATION:
      return INITIAL_STATE;
      break;
    default:
      return state;
  }
}
