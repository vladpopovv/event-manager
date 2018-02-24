import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import friendReducer from './friendReducer';
import notificationReducer from './notificationReducer';
import eventReducer from './eventReducer';
import appSettingsReducer from './appSettingsReducer';
import modalReducer from './modalReducer';

const reducers = {
  user: userReducer,
  form: formReducer,
  friends: friendReducer,
  notification: notificationReducer,
  events: eventReducer,
  app: appSettingsReducer,
  modal: modalReducer,
};

export default combineReducers(reducers);
