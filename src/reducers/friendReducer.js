import CONSTANTS from './../constants/constants';

const initialState = {
  friends: [{
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  }],
  followers: [{
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  }],
  foundUsers: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.FRIENDS_GET_FRIENDS_REQUESTING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CONSTANTS.FRIENDS_GET_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        // friends: payload,
      };
    case CONSTANTS.FRIENDS_GET_FRIENDS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CONSTANTS.FRIENDS_GET_FOLLOWERS_REQUESTING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CONSTANTS.FRIENDS_GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        loading: false,
        followers: payload,
      };
    case CONSTANTS.FRIENDS_GET_FOLLOWERS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CONSTANTS.FRIENDS_DETELE_REQUESTING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CONSTANTS.FRIENDS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CONSTANTS.FRIENDS_DELETE_ERROR:
      return {
        ...state,
        loading: true,
        error: payload,
      };
    case CONSTANTS.FRIENDS_SEARCH_REQUESTING:
      return {
        ...state,
        loading: true,
      };
    case CONSTANTS.FRIENDS_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        foundUsers: payload,
      };
    case CONSTANTS.FRIENDS_SEARCH_ERROR:
      return {
        ...state,
        loading: true,
        error: payload,
      };
    default:
      return state;
  }
};
