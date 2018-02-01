import CONSTANTS from './../constants/constants';

const initialState = {
  isAuthentificated: !!localStorage.getItem('authorizationToken'),
  loading: false,
  signUp: {},
  signIn: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.SIGN_UP_REQUESTING:
      return {
        ...state,
        signUp: {
          error: '',
        },
        loading: true,
      };
    case CONSTANTS.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CONSTANTS.SIGN_UP_ERROR:
      return {
        ...state,
        loading: false,
        signUp: {
          error: payload.error,
        },
      };
    case CONSTANTS.SIGN_IN_REQUESTING:
      return {
        ...state,
        signIn: {
          error: '',
        },
        loading: true,
      };
    case CONSTANTS.SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.data,
        isAuthentificated: true,
      };
    case CONSTANTS.SIGN_IN_ERROR:
      return {
        ...state,
        loading: false,
        signIn: {
          error: payload.message,
        },
      };
    case CONSTANTS.SIGN_IN_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        signIn: {
          error: 'Error request',
        },
      };
    case CONSTANTS.LOG_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthentificated: false,
      };
    default:
      return state;
  }
};
