import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import friendReducer from './friendReducer';
import notificationReducer from './notificationReducer';
import eventReducer from './eventReducer';
import appSettingsReducer from './appSettingsReducer';

const reducers = {
  user: userReducer,
  form: formReducer,
  friends: friendReducer,
  notification: notificationReducer,
  events: eventReducer,
  app: appSettingsReducer,
};

export default combineReducers(reducers);
