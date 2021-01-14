import { combineReducers } from 'redux';
import UserReducer from './User';
import MembersReducer from './Members';
import EventsReducer from './Events';
import ElectionReducer from './Elections';
import CommitteesReducer from './Committees';

export * from './User';
export * from './Members';
export * from './Events';
export * from './Elections';
export * from './Committees';

export default combineReducers({
	user: UserReducer,
	members: MembersReducer,
	events: EventsReducer,
	elect: ElectionReducer,
	committees: CommitteesReducer
});