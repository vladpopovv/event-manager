import CONSTANTS from './../constants/actionConstants';

const appActions = {
  addClassApp(className) {
    return dispatch => dispatch({
      type: CONSTANTS.APP_ADD_CLASS,
      payload: className,
    });
  },
  removeClassApp(className) {
    return dispatch => dispatch({
      type: CONSTANTS.APP_REMOVE_CLASS,
      payload: className,
    });
  },
};

export default appActions;
