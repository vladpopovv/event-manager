import CONSTANTS from './../constants/constants';

const initialState = {
  isAuthentificated: !!localStorage.getItem('authorizationToken'),
  loading: false,
  signUp: {},
  signIn: {},
  data: JSON.parse(localStorage.getItem('userData')),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.SIGN_UP_REQUESTING:
      return {
        ...state,
        signUp: {
          ...state.singUp,
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
          ...state.singUp,
          error: payload.message,
        },
      };
    case CONSTANTS.SIGN_IN_REQUESTING:
      return {
        ...state,
        signIn: {
          ...state.singIn,
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
          ...state.singIn,
          error: payload.message,
        },
      };
    case CONSTANTS.SIGN_IN_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        signIn: {
          ...state.singIn,
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
