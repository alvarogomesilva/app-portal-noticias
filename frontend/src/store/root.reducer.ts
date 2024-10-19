
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import newReducer from './new/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  new: newReducer
});

export default rootReducer;
