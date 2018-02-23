import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AccountReducer from './AccountReducer';
import MembersReducer from './MembersReducer';
import PostReducer from './PostReducer';

export default combineReducers({
  auth: AuthReducer,
  account: AccountReducer,
  members: MembersReducer,
  post: PostReducer,
});
