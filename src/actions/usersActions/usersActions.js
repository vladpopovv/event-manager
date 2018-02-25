import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';

const { getUserDataUrl } = APICONSTANTS;

export default {
  getUserDataById(userId) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.USERS_GET_DATA_REQUESTING });
      fetch(`${getUserDataUrl}/${userId}`)
        .then(response => response.json())
        .then((json) => {
          if (!json.data.id) {
            throw new Error('User is not found');
          }

          dispatch({
            type: CONSTANTS.USERS_GET_DATA_SUCCESS,
            payload: json.data,
          });
        })
        .catch(error => dispatch({
          type: CONSTANTS.USERS_GET_DATA_ERROR,
          payload: error.message,
        }));
    };
  },
};
