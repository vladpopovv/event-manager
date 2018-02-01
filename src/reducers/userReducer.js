import constants from './../constants/constants';

const initialState = {
  isAuthentificated: false,
  loading: false,
  signUp: {},
  signIn: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SIGN_UP_REQUESTING:
      return {
        ...state,
        signUp: {
          error: '',
        },
        loading: true,
      };
    case constants.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthentificated: true,
      };
    case constants.SIGN_UP_ERROR:
      return {
        ...state,
        loading: false,
        signUp: {
          error: payload.error,
        },
      };
    case constants.SIGN_IN_REQUESTING:
      return {
        ...state,
        signIn: {
          error: '',
        },
        loading: true,
      };
    case constants.SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthentificated: true,
      };
    case constants.SIGN_IN_ERROR:
      return {
        ...state,
        loading: false,
        signIn: {
          error: payload.message,
        },
      };
    case constants.SIGN_IN_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        signIn: {
          error: 'Error request',
        },
      };
    default:
      return state;
  }
};
