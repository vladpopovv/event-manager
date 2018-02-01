import constants from './../constants/constants';

const initialState = {
  isAuthentificated: false,
  loading: false,
  signUpError: '',
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
    default:
      return state;
  }
};
