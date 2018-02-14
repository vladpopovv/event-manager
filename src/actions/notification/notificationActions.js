import CONSTANTS from './../../constants/actionConstants';

export default {
  addNew(type, title, description) {
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.NOTIFICATION_ADD_NEW,
        payload: { type, title, description },
      });
    };
  },
  delete(notificationId) {
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.NOTIFICATION_DELETE,
        payload: notificationId,
      });
    };
  },
};
