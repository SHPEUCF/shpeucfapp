import firebase from 'firebase';
import { createActionTypes } from '@/utils/actions';

const ACTIONS = createActionTypes([
	'GET_POSITIONS',
	'GET_VOTES',
	'UPDATE_ELECTION'
]);

const INITIAL_STATE = {
	election: false,
	apply: false,
	numOfVotes: 0,
	positions: [],
	votes: []
};

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case ACTIONS.GET_POSITIONS:
			return { ...state, positions: payload };
		case ACTIONS.GET_VOTES:
			return { ...state, votes: payload };
		case ACTIONS.UPDATE_ELECTION:
			return {
				...state,
				apply: payload.apply,
				election: payload.election,
				numOfVotes: payload.votes
			};
		default:
			return state;
	}
};

export const getPositions = () => dispatch => {
	firebase.database().ref('/election/positions').on('value', snapshot =>
		dispatch({ type: ACTIONS.GET_POSITIONS, payload: snapshot.val() })
	);
};

export const getVotes = () => dispatch => {
	firebase.database().ref('voting').on('value', snapshot =>
		dispatch({ type: ACTIONS.GET_VOTES, payload: snapshot.val() })
	);
};

export const updateElection = () => dispatch => {
	firebase.database().ref('/election/').on('value', snapshot => {
		if (snapshot.exists())
			dispatch({ type: ACTIONS.UPDATE_ELECTION, payload: snapshot.val() });
	});
};