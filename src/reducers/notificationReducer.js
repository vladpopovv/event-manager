import CONSTANTS from './../constants/constants';

const initialState = {
  notifications: [],
  count: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.NOTIFICATION_ADD_NEW:
      return {
        ...state,
        notifications: state.notifications.concat({
          id: state.count,
          ...payload,
        }),
        count: state.count + 1,
      };
    case CONSTANTS.NOTIFICATION_DELETE:
      return {
        ...state,
        notifications: state.notifications.filter(notificationItem =>
          notificationItem.id !== payload),
      };
    default:
      return state;
  }
};
