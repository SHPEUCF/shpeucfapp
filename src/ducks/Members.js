import { createActionTypes } from '@/utils/actions';
import { getAllMemberAccountsandRankings, getAllMemberPoints } from '@/services/members';

// Handle all things related to Events
const ACTIONS = createActionTypes([
	'STORE_ALL_MEMBER_ACCOUNTS_AND_RANKINGS',
	'STORE_ALL_MEMBER_POINTS'
]);

const INITIAL_STATE = {
	allMemberAccounts: {},
	allMemberPoints: {},
	rankedIds: []
};

export default (state = INITIAL_STATE, action) => {
	const { payload } = action;

	switch (action.type) {
		case ACTIONS.STORE_ALL_MEMBER_ACCOUNTS_AND_RANKINGS:
			return { ...state, allMemberAccounts: payload.allMemberAccounts, rankedIds: payload.rankedIds };
		case ACTIONS.STORE_ALL_MEMBER_POINTS:
			return { ...state, allMemberPoints: payload };
		default:
			return state;
	}
};

export const storeMemberAccountsandRankings = () => dispatch =>
	getAllMemberAccountsandRankings(true).then(({ allMemberAccounts, rankedIds }) => dispatch({
		type: ACTIONS.STORE_ALL_MEMBER_ACCOUNTS_AND_RANKINGS,
		payload: { allMemberAccounts, rankedIds }
	}));

export const storeAllMemberPoints = () => dispatch =>
	getAllMemberPoints(true).then(allMemberPoints => dispatch({
		type: ACTIONS.STORE_ALL_MEMBER_POINTS,
		payload: allMemberPoints
	}));