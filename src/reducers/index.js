import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MembersReducer from './MembersReducer';
import PostReducer from './PostReducer';

export default combineReducers({
  auth: AuthReducer,
  members: MembersReducer,
  post: PostReducer,
});
