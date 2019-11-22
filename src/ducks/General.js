import { createActiontypes } from "../utils/actions";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";

// handle all things related to Elections
const ACTIONS = createActiontypes(["PAGE_LOAD", "FILTER_CHANGED"]);

const INITIAL_STATE = { loading: false, filter: "" };

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  if (action.type === ACTIONS.PAGE_LOAD || action.type === ACTIONS.FILTER_CHANGED)
    return { ...state, loading: payload };
  else return state;
};

export const pageLoad = () => {
  return { type: ACTIONS.PAGE_LOAD, payload: true };
};

export const filterChanged = text => {
  return { type: ACTIONS.FILTER_CHANGED, payload: text };
};
