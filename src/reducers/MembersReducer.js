// handle all things related to data for all members
import {
  FETCH_MEMBERS
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  points: 0,
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case FETCH_MEMBERS:
      return { ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        points: payload.points,
      };
    default:
      return state;
  }
};
