// handle all things related to data for all members
import {
  FETCH_MEMBERS_POINTS
} from '../actions/types';

const INITIAL_STATE = {
  membersPoints: []
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case FETCH_MEMBERS_POINTS:
      return { ...state,
        membersPoints: payload,
      }
    default:
      return state;
  }
};
