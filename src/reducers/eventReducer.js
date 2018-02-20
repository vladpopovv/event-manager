import CONSTANTS from './../constants/actionConstants';

const initialState = {
  events: [],
  loading: {
    adding: false,
    getting: false,
  },
  eventsList: [],
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
        events: state.events.concat(payload),
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
    case CONSTANTS.EVENT_GET_LIST_RANGE_REQUESTING:
      return {
        ...state,
        eventsList: [],
        loading: {
          ...state.loading,
          gettingList: true,
        },
      };
    case CONSTANTS.EVENT_GET_LIST_RANGE_SUCCESS:
      return {
        ...state,
        eventsList: payload,
        loading: {
          ...state.loading,
          gettingList: false,
        },
      };
    case CONSTANTS.EVENTS_GET_LIST_RANGE_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          gettingList: false,
        },
      };
    case CONSTANTS.EVENT_DELETE_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          removing: true,
        },
      };
    case CONSTANTS.EVENT_DELETE_SUCCESS:
      return {
        ...state,
        events: state.events.filter(event => event.id !== payload.id),
        loading: {
          ...state.loading,
          removing: false,
        },
      };
    case CONSTANTS.EVENTS_DELETE_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          removing: false,
        },
      };
    case CONSTANTS.EVENT_CLEAR_LIST:
      return {
        ...state,
        eventsList: [],
      };
    default:
      return state;
  }
};
