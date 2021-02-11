import firebase from 'firebase';
import { createActionTypes } from '@/utils/actions';
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, version } from '@env';

const ACTIONS = createActionTypes([
	'USER_STATUS',
	'VERIFY_APP_VERSION'
]);

const INITIAL_STATE = {
	isLoggedIn: false,
	hasCorrectVersion: false
};

export default (state = INITIAL_STATE, { payload, type }) => {
	switch (type) {
		case ACTIONS.USER_STATUS:
			return { ...state, isLoggedIn: payload };
		case ACTIONS.VERIFY_APP_VERSION:
			return { ...state, hasCorrectVersion: payload };
		default:
			return state;
	}
};

export const userStatus = () => dispatch => {
	firebase.auth().onAuthStateChanged(user =>
		dispatch({ type: ACTIONS.USER_STATUS, payload: !!user }));
};

export const verifyAppVersion = () => dispatch =>
	firebase.database().ref('/version').once('value', snapshot => {
		dispatch({ type: ACTIONS.VERIFY_APP_VERSION, payload: snapshot.val() == version });
	});

export const initializeFirebase = () => {
	const config = { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId };

	if (!firebase.apps.length)
		firebase.initializeApp(config);
};