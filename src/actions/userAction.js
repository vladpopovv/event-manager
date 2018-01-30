import constants from './../constants/constants';

export default {
  checkAuthentificated() {
    return (dispatch) => {
      dispatch({
        type: constants.USER_CHECK_AUTHENTICATED,
        payload: {},
      });
    };
  },
};
