import CONSTANTS from './../constants/actionConstants';

const initialState = {
  events: [],
  loading: {
    adding: false,
  },
};
/* payload */
export default (state = initialState, { type }) => {
  switch (type) {
    case CONSTANTS.EVENT_ADD_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          adding: true,
        },
      };
    case CONSTANTS.EVENT_ADD_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          adding: false,
        },
      };
    case CONSTANTS.EVENT_ADD_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          adding: false,
        },
      };
    default:
      return state;
  }
};
