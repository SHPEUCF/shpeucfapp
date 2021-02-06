import { createActionTypes } from '@/utils/actions';
import { loadCurrentUser } from '@/services/user';

const ACTIONS = createActionTypes([
	'LOAD_USER_AND_PRIVILEGE'
]);

/**
 * @typedef {Object} UserState
 * @prop {string}  id              User's ID assigned by Firebase
 * @prop {string}  firstName       User's first name
 * @prop {string}  lastName        User's last name
 * @prop {string}  email           User's knights email
 * @prop {string}  flag            User's flag of preference
 * @prop {string}  picture         User's profile picture
 * @prop {number}  points          Total points for current semester
 * @prop {Object}  privilege       User privilege (user, board, e-board)
 * @prop {Object}  userCommittees  Committees user belongs to
 * @prop {string}  major           User's major
 * @prop {string}  country         User's country of origin
 * @prop {string}  gender          User's gender
 * @prop {string}  birthday        User's birthday
 * @prop {boolean} paidMember      Paid member status for current year
 * @prop {boolean} applied         Applied status for current election
 * @prop {boolean} voted           Voted status for current election
 */

/**
 * @type {UserState}
 */

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { payload, type }) => {
	switch (type) {
		case ACTIONS.LOAD_USER_AND_PRIVILEGE:
			return { ...state, ...payload };
		default:
			return state;
	}
};

export const loadUser = () => dispatch => {
	loadCurrentUser().then(payload => dispatch({ type: ACTIONS.LOAD_USER_AND_PRIVILEGE, payload }));
};