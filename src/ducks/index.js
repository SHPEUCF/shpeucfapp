import { combineReducers } from 'redux';
import UserReducer from './User'
import MembersReducer from './Members';
import EventsReducer from './Events';
import GeneralReducer from './General';
import ElectionReducer from './Elections';
import CommitteesReducer from './Committees';

export * from './User'
export * from './Members';
export * from './Events';
export * from './General';
export * from './Elections';
export * from './Committees';

export default combineReducers({
    user: UserReducer,
    members: MembersReducer,
    events: EventsReducer,
    general: GeneralReducer,
    elect: ElectionReducer,
    committees: CommitteesReducer
});
