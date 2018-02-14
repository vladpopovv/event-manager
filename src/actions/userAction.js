import constants from './../constants/actionConstants';

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
