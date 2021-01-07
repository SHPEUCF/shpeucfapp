import firebase from 'firebase';
import { createActionTypes } from '@/utils/actions';

// Handle all things related to Events
const ACTIONS = createActionTypes([
	'GET_ALL_MEMBER_ACCOUNTS',
	'GET_ALL_MEMBER_POINTS',
	'GET_VISITED_MEMBER'
]);

const INITIAL_STATE = {
	visitedMember: {
		firstName: '',
		color: '#21252b',
		flag: '',
		lastName: '',
		email: '',
		major: 'Do not wish to disclose',
		picture: '',
		points: 0,
		privilege: {},
		country: 'Do not wish to disclose',
		gender: 'Do not wish to disclose',
		birthday: '0000-00-00',
		paidMember: false,
		id: '',
		voted: false,
		applied: false,
		userCommittees: {}
	},
	allMemberAccounts: {},
	allMemberPoints: {}
};

export default (state = INITIAL_STATE, action) => {
	const { payload } = action;

	switch (action.type) {
		case ACTIONS.GET_ALL_MEMBER_ACCOUNTS:
			return { ...state, allMemberAccounts: payload };
		case ACTIONS.GET_ALL_MEMBER_POINTS:
			return { ...state, allMemberPoints: payload };
		case ACTIONS.GET_VISITED_MEMBER:
			return { ...state, visitedMember: payload };
		default:
			return state;
	}
};

export const getAllMemberAccounts = () => {
	return dispatch => {
		firebase.database().ref('/users/').on('value', snapshot => {
			dispatch({
				type: ACTIONS.GET_ALL_MEMBER_ACCOUNTS,
				payload: snapshot.val()
			});
		});
	};
};

export const getAllMemberPoints = () => {
	return dispatch => {
		firebase.database().ref('/points')
			.on('value', snapshot => {
				dispatch({
					type: ACTIONS.GET_ALL_MEMBER_POINTS,
					payload: snapshot.val()
				});
			});
	};
};

export const getVisitedMember = (id) => {
	const { currentUser } = firebase.auth();

	return dispatch => {
		if (currentUser) {
			firebase.database().ref(`/users/${id}/`).on('value', snapshot => {
				dispatch({
					type: ACTIONS.GET_VISITED_MEMBER,
					payload: snapshot.val()
				});
			});
		}
	};
};