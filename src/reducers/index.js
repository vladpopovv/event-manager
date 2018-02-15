import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import friendReducer from './friendReducer';
import notificationReducer from './notificationReducer';

const reducers = {
  user: userReducer,
  form: formReducer,
  friends: friendReducer,
  notification: notificationReducer,
};

export default combineReducers(reducers);
