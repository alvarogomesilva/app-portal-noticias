
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import noticeReducer from './notice/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notice: noticeReducer
});

export default rootReducer;
