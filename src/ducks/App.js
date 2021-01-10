import firebase from 'firebase';
import { createActionTypes } from '@/utils/actions';

const ACTIONS = createActionTypes([
	'USER_STATUS'
]);

const INITIAL_STATE = {
	loggedIn: false
};

export default (state = INITIAL_STATE, { payload, type }) => {
	switch (type) {
		case ACTIONS.SHOW_FIREBASE_ERROR:
			return { ...state, error: payload	};
		case ACTIONS.LOGOUT_USER:
			return { ...state, ...INITIAL_STATE	};
		case ACTIONS.LOAD_USER_AND_PRIVILEGE:
			return { ...state, activeUser: payload	};
		default:
			return state;
	}
};

export const userStatus = () => dispatch => {
	firebase.auth().onAuthStateChanged(user =>
		dispatch({ type: ACTIONS.USER_STATUS, payload: user }));
};