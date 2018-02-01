import constants from './../constants/constants';

const initialState = {
  isAuthentificated: false,
  loading: false,
  signUpError: '',
  signInError: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SIGN_UP_REQUESTING:
      return {
        ...state,
        signUpError: '',
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
        signUpError: payload.error,
      };
    case constants.SIGN_IN_REQUESTING:
      return {
        ...state,
        signInError: '',
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
        signInError: payload.error,
      };
    default:
      return state;
  }
};
