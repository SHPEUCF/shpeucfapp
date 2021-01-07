import { createActionTypes } from '@/utils/actions';
import firebase from 'firebase';
// handle all things related to Elections
const ACTIONS = createActionTypes([
	'PAGE_LOAD',
	'FILTER_CHANGED'
]);

const INITIAL_STATE = {
	loading: false,
	filter: ''
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

export const pageLoad = isLoading => {
	return async dispatch => await dispatch({
		type: ACTIONS.PAGE_LOAD,
		payload: isLoading
	});
};

export const filterChanged = (text) => {
	return {
		type: ACTIONS.FILTER_CHANGED,
		payload: text
	};
};

/* FireBase Functions that don't use Redux */

export const storeImageUrl = (url, filePath) => {
	firebase.database().ref(`${filePath}/`).update({
		picture: url
	});
};