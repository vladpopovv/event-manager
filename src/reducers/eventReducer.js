import CONSTANTS from './../constants/actionConstants';

const initialState = {
  events: [],
  loading: {
    adding: false,
  },
};

export default (state = initialState, { type, payload }) => {
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
    case CONSTANTS.EVENT_GET_RANGE_REQUESTING:
      return {
        ...state,
        events: [],
        loading: {
          ...state.loading,
          getting: true,
        },
      };
    case CONSTANTS.EVENT_GET_RANGE_SUCCESS:
      return {
        ...state,
        events: payload,
        loading: {
          ...state.loading,
          getting: false,
        },
      };
    case CONSTANTS.EVENTS_GET_RANGE_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          getting: false,
        },
      };
    default:
      return state;
  }
};
