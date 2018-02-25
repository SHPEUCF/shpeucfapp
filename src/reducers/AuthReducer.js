// handle all things related to authentication
import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  MAJOR_CHANGED,
  COLLEGE_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  REGISTRATION_ERROR,
  VERIFIED_USER,
  LOGIN_USER,
  ENTER_APP,
  LOAD_USER,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  GO_TO_LOGIN,
  GO_TO_REGISTRATION } from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  college: '',
  major: '',
  password: '',
  confirmPassword: '',
  user: null,
  loggedIn: null,
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case FIRST_NAME_CHANGED:
      return { ...state,
        firstName: payload
      };
    case LAST_NAME_CHANGED:
      return { ...state,
        lastName: payload
      };
    case EMAIL_CHANGED:
      return { ...state,
        email: payload
      };
    case COLLEGE_CHANGED:
      return { ...state,
        college: payload
      };
    case MAJOR_CHANGED:
      return { ...state,
        major: payload
      };
    case PASSWORD_CHANGED:
      return { ...state,
        password: payload
      };
    case CONFIRM_PASSWORD_CHANGED:
      return { ...state,
        confirmPassword: payload
      };
    case REGISTRATION_ERROR:
      return { ...state,
        error: payload,
      };
    case CREATE_USER:
      return { ...state,
        loading: true,
        error: ''
      };
    case CREATE_USER_SUCCESS:
      return { ...state,
        ... INITIAL_STATE,
      };
    case CREATE_USER_FAIL:
      return { ...state,
        error: payload,
        loading: false,
      };
    case LOGIN_USER:
      return { ...state,
        loading: true,
        error: ''
      };
    case ENTER_APP:
      return { ...state,
        ...INITIAL_STATE,
        user: payload,
        loggedIn: true
      };
    case LOAD_USER:
      return { ...state,
        ...INITIAL_STATE,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        major: payload.major,
      };
    case LOGIN_USER_FAIL:
      return { ...state,
        error: payload,
        loading: false,
        password: ''
      };
      case LOGOUT_USER:
        return { ...state,
          ...INITIAL_STATE,
        };
    case GO_TO_LOGIN:
      return INITIAL_STATE;
    case GO_TO_REGISTRATION:
      return INITIAL_STATE;
    default:
      return state;
  }
}
