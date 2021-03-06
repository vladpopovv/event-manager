import CONSTANTS from './../constants/actionConstants';
import authToken from './../actions/authorization/authToken';

const initialState = {
  isAuthentificated: authToken.hasToken(),
  loading: false,
  signUp: {},
  signIn: {},
  data: {},
  // data: JSON.parse(localStorage.getItem('userData')),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.USER_GET_DATA_REQUESTING:
      return {
        ...state,
        error: '',
        loading: true,
      };
    case CONSTANTS.USER_GET_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case CONSTANTS.USER_GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };
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
    case CONSTANTS.LOG_OUT_REQUESTING:
      return {
        ...initialState,
        loading: true,
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
