import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';
import notificationActions from './../notification/notificationActions';

const {
  getFriendsUrl,
  searchUsersUrl,
  addToFriendsUrl,
  getFriendRequetsUrl,
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
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.FRIENDS_GET_FRIENDS_ERROR,
            payload: error,
          });
        });
    };
  },
  searchUsers(query) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.FRIENDS_SEARCH_REQUESTING });
      return fetch(`${searchUsersUrl}?q=${query}`)
        .then(response => response.json())
        .then(json =>
          dispatch({
            type: CONSTANTS.FRIENDS_SEARCH_SUCCESS,
            payload: json.data,
          }))
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.FRIENDS_SEARCH_ERROR,
            payload: error.message,
          });
        });
    };
  },
  addToFriends(user) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.FRIENDS_ADD_REQUESTING });
      return fetch(addToFriendsUrl, {
        method: 'POST',
        body: JSON.stringify({
          userIds: [user.id],
        }),
      })
        .then(response => response.json())
        .then((json) => {
          dispatch(notificationActions.addNew('info', 'Success', `The request was successfully sent to ${user.firstname} ${user.lastname}`));
          return dispatch({
            type: CONSTANTS.FRIENDS_ADD_SUCCESS,
            payload: json.data,
          });
        })
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.FRIENDS_ADD_ERROR,
            payload: error.message,
          });
        });
    };
  },
  getFriendRequets() {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.FRIENDS_GET_REQUESTS_REQUESTING });
      return fetch(getFriendRequetsUrl)
        .then(response => response.json())
        .then(json => (
          dispatch({
            type: CONSTANTS.FRIENDS_GET_REQUESTS_SUCCESS,
            payload: json.data,
          })
        ))
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.FRIENDS_GET_REQUESTS_ERROR,
            payload: error.message,
          });
        });
    };
  },
};

export default friendsActions;
