import { createActionTypes } from './utils';
import { getAllMemberAccountsAndRankings, getAllMemberPoints } from '@/services/members';

const ACTIONS = createActionTypes([
	'STORE_ALL_MEMBER_ACCOUNTS_AND_RANKINGS',
	'STORE_ALL_MEMBER_POINTS'
]);

const INITIAL_STATE = {
	allMemberAccounts: {},
	allMemberPoints: {},
	rankedIDs: []
};

export default (state = INITIAL_STATE, { payload, type }) => {
	switch (type) {
		case ACTIONS.STORE_ALL_MEMBER_ACCOUNTS_AND_RANKINGS:
			return { ...state, allMemberAccounts: payload.allMemberAccounts, rankedIDs: payload.rankedIDs };
		case ACTIONS.STORE_ALL_MEMBER_POINTS:
			return { ...state, allMemberPoints: payload };
		default:
			return state;
	}
};

export const storeMemberAccountsAndRankings = () => dispatch =>
	getAllMemberAccountsAndRankings(true, ({ allMemberAccounts, rankedIDs }) => dispatch({
		type: ACTIONS.STORE_ALL_MEMBER_ACCOUNTS_AND_RANKINGS,
		payload: { allMemberAccounts, rankedIDs }
	}));

export const storeAllMemberPoints = () => dispatch =>
	getAllMemberPoints(true, allMemberPoints => dispatch({
		type: ACTIONS.STORE_ALL_MEMBER_POINTS,
		payload: allMemberPoints
	}));