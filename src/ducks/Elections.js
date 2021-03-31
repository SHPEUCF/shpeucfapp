import { createActionTypes } from './utils';
import { getAllPositions, getAllVotes, updateElectionStatus } from '@/services/elections';

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
				...state, apply: payload.apply, election: payload.election, numOfVotes: payload.votes };
		default:
			return state;
	}
};

export const getPositions = () => dispatch => {
	getAllPositions(payload => dispatch({ type: ACTIONS.GET_POSITIONS, payload }));
};

export const getVotes = () => dispatch => {
	getAllVotes(payload => dispatch({ type: ACTIONS.GET_VOTES, payload }));
};

export const updateElection = () => dispatch => {
	updateElectionStatus(payload => dispatch({ type: ACTIONS.UPDATE_ELECTION, payload }));
};