import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

const reducers = {
  user: userReducer,
  form: formReducer,
  notification: notificationReducer,
};

export default combineReducers(reducers);
