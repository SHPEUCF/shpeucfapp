// handle all things related to authentication
import {
  FETCH_EVENTS,
 } from '../actions/types';

const INITIAL_STATE = {
  eventList: {},
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state,
        eventList: payload
      };
    default:
      return state;
  }
};
