import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  // ваши редюсеры
  form: formReducer,
};

export default combineReducers(reducers);
