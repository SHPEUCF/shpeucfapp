import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AccountReducer from './AccountReducer';
import PostReducer from './PostReducer';

export default combineReducers({
  auth: AuthReducer,
  account: AccountReducer,
  post: PostReducer,
});
