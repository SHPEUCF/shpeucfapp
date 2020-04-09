import { createActionTypes } from "../utils/actions";

// handle all things related to Elections
const ACTIONS = createActionTypes([
	"PAGE_LOAD",
	"FILTER_CHANGED"
]);

const INITIAL_STATE = {
	loading: false,
	filter: ""
};

export default (state = INITIAL_STATE, action) => {
	const {
		payload
	} = action;

	switch (action.type) {
		case ACTIONS.PAGE_LOAD:
			return {
				...state,
				loading: payload
			};
		case ACTIONS.FILTER_CHANGED:
			return {
				...state,
				filter: payload
			};
		default:
			return state;
	}
};

export const pageLoad = () => {
	return {
		type: ACTIONS.PAGE_LOAD,
		payload: true
	};
};

export const filterChanged = (text) => {
	return {
		type: ACTIONS.FILTER_CHANGED,
		payload: text
	};
};