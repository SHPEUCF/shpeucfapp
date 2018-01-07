import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostReducer from './PostReducer';

export default combineReducers({
  auth: AuthReducer,
  post: PostReducer,

});
