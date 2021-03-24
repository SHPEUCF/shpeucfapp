import { createActionTypes } from './utils';
import { getAllCommittees } from '@/services/committees';

const ACTIONS = createActionTypes([
	'GET_COMMITTEES'
]);

const INITIAL_STATE = {
	committeesList: []
};

export default (state = INITIAL_STATE, { type, payload }) => {
	switch (type) {
		case ACTIONS.GET_COMMITTEES:
			return { ...state, committeesList: payload };
		default:
			return state;
	}
};

export const getCommittees = () => dispatch => {
	getAllCommittees(payload => dispatch({ type: ACTIONS.GET_COMMITTEES, payload }));
};