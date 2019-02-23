import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MembersReducer from './MembersReducer';
import EventsReducer from './EventsReducer';
import PostReducer from './PostReducer';
import GeneralReducer from './GeneralReducer';

export default combineReducers({
  auth: AuthReducer,
  members: MembersReducer,
  events: EventsReducer,
  post: PostReducer,
  general: GeneralReducer
});
