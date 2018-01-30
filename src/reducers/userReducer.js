import constants from './../constants/constants';

const initialState = {
  isAuthentificated: false,
};
/* payload */
export default (state = initialState, { type }) => {
  switch (type) {
    case constants.USER_IS_AUTHENTICATED: {
      return {
        ...state,
        user: state.user,
      };
    }
    default:
      return state;
  }
};
