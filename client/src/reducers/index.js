import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import songsReducer from './songsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  songs: songsReducer
});