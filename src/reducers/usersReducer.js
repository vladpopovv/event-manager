import CONSTANTS from './../constants/actionConstants';

const initialState = {
  user: {},
  error: '',
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.USERS_GET_DATA_REQUESTING: {
      return {
        ...state,
        loading: true,
      };
    }
    case CONSTANTS.USERS_GET_DATA_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case CONSTANTS.USERS_GET_DATA_ERROR:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    default:
      return state;
  }
};
