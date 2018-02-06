import CONSTANTS from './../../constants/constants';
import APICONSTANTS from './../../constants/apiConstants';
import notificationActions from './../notification/notificationActions';

const {
  getFriendsUrl,
} = APICONSTANTS;


const friendsActions = {
  getFriends() {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.FRIENDS_GET_FRIENDS_REQUESTING });
      return fetch(getFriendsUrl)
        .then(response => response.json())
        .then(json =>
          dispatch({
            type: CONSTANTS.FRIENDS_GET_FRIENDS_SUCCESS,
            payload: json.data,
          }))
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error));
          return dispatch({
            type: CONSTANTS.FRIENDS_GET_FRIENDS_ERROR,
            payload: error,
          });
        });
    };
  },
};

export default friendsActions;
