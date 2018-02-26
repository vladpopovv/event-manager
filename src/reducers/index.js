import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import chatReducer from './chatReducer';
import friendReducer from './friendReducer';
import notificationReducer from './notificationReducer';

const reducers = {
  user: userReducer,
  users: usersReducer,
  form: formReducer,
  chat: chatReducer,
  friends: friendReducer,
  notification: notificationReducer,
};

export default combineReducers(reducers);
