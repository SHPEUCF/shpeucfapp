// handle all things related to user account
import {
  USER_FETCH
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case USER_FETCH:
      return { ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
      };
    default:
      return state;
  }
};
