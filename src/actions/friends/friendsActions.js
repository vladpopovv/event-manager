import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';
import notificationActions from './../notification/notificationActions';

const {
  getFriendsUrl,
  searchUsersUrl,
  addToFriendsUrl,
  getFriendRequetsUrl,
  deleteFriendsUrl,
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
  sendRequestToFriends(user) {
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.FRIENDS_SEND_REQUEST_REQUESTING,
        payload: user.id,
      });
      return fetch(addToFriendsUrl, {
        method: 'POST',
        body: JSON.stringify({
          userIds: [user.id],
        }),
      })
        .then(response => response.json())
        .then((json) => {
          dispatch(friendsActions.getFriendRequets());
          dispatch(notificationActions.addNew('info', 'Success', `The request was successfully sent to ${user.firstname} ${user.lastname}`));
          return dispatch({
            type: CONSTANTS.FRIENDS_SEND_REQUEST_SUCCESS,
            payload: { data: json.data, id: user.id },
          });
        })
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.FRIENDS_SEND_REQUEST_ERROR,
            payload: { error: error.message, id: user.id },
          });
        });
    };
  },
  addToFriends(user) {
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.FRIENDS_ADD_REQUESTING,
        payload: user.id,
      });
      return fetch(addToFriendsUrl, {
        method: 'POST',
        body: JSON.stringify({
          userIds: [user.id],
        }),
      })
        .then(response => response.json())
        .then((json) => {
          dispatch(friendsActions.getFriendRequets());
          dispatch(notificationActions.addNew('info', 'Success', `${user.firstname} ${user.lastname} has been successfully added to your friends list`));
          return dispatch({
            type: CONSTANTS.FRIENDS_ADD_SUCCESS,
            payload: { data: json.data, id: user.id },
          });
        })
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.FRIENDS_ADD_ERROR,
            payload: { error: error.message, id: user.id },
          });
        });
    };
  },
  deleteRequestToFriends(user) {
    const url = `friends/${user.id}/requests`;
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.FRIENDS_DELETE_REQUEST_REQUESTING,
        payload: user.id,
      });
      return fetch(url, {
        method: 'delete',
        // body: JSON.stringify({
        //   userIds: [user.id],
        // }),
      })
        .then(response => response.json())
        .then((json) => {
          dispatch(notificationActions.addNew('info', 'Success', `${user.firstname} ${user.lastname} request was successfully deleted`));
          dispatch(friendsActions.getFriendRequets());
          return dispatch({
            type: CONSTANTS.FRIENDS_DELETE_REQUEST_SUCCESS,
            payload: { data: json.data, id: user.id },
          });
        })
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.FRIENDS_DELETE_REQUEST_ERROR,
            payload: { error: error.message, id: user.id },
          });
        });
    };
  },
  deleteFriends(user) {
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.FRIENDS_DETELE_REQUESTING,
        payload: user.id,
      });
      return fetch(deleteFriendsUrl, {
        method: 'POST',
        body: JSON.stringify({
          userIds: [user.id],
        }),
      })
        .then(response => response.json())
        .then((json) => {
          dispatch(friendsActions.getFriends());
          dispatch(notificationActions.addNew(
            'info',
            'Success',
            `${user.firstname} ${user.lastname} has been removed from your friends list`,
          ));
          return dispatch({
            type: CONSTANTS.FRIENDS_DELETE_SUCCESS,
            payload: { data: json.data, id: user.id },
          });
        })
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.FRIENDS_DELETE_ERROR,
            payload: { error: error.message, id: user.id },
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
