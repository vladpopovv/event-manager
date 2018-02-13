import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';
import authToken from './authToken';
import notificationActions from './../notification/notificationActions';

const {
  signInUrl,
  signUpUrl,
  logOutUrl,
} = APICONSTANTS;

function getOptionsRequest(data) {
  return {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

function fetchRequest(data, urlRequest) {
  const options = getOptionsRequest(data);
  return fetch(urlRequest, options);
}

const authActions = {
  signInRequest(data) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.SIGN_IN_REQUESTING });
      return fetchRequest(data, signInUrl)
        .then((response) => {
          if (!response.ok && response.statusText === 'Unauthorized') {
            throw new Error('Invalid login or password.');
          }
          return response.json();
        })
        .then((json) => {
          dispatch(notificationActions.addNew(
            'success',
            'Successfully!',
            'You have successfully login.',
          ));
          authToken.setToken(json.data.token);
          return dispatch({
            type: CONSTANTS.SIGN_IN_SUCCESS,
            payload: json,
          });
        })
        .catch(error => dispatch({
          type: CONSTANTS.SIGN_IN_ERROR,
          payload: error,
        }));
    };
  },
  getUserDataRequest() {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.USER_GET_DATA_REQUESTING });
      return fetch('whoami')
        .then(response => response.json())
        .then(json => dispatch({
          type: CONSTANTS.USER_GET_DATA_SUCCESS,
          payload: json.data,
        }))
        .catch(error => dispatch({
          type: CONSTANTS.USER_GET_DATA_ERROR,
          payload: error,
        }));
    };
  },
  signUpRequest(data) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.SIGN_UP_REQUESTING });
      return fetchRequest(data, signUpUrl)
        .then(response => response.json())
        .then((json) => {
          if (json.error) {
            throw new Error(json.error);
          }
          dispatch(notificationActions.addNew(
            'success',
            'Successfully!',
            'You have successfully registered.',
          ));
          dispatch(authActions.signInRequest({
            login: data.login,
            password: data.password,
          }));
          return dispatch({
            type: CONSTANTS.SIGN_UP_SUCCESS,
            payload: json,
          });
        })
        .catch(error => dispatch({
          type: CONSTANTS.SIGN_UP_ERROR,
          payload: error,
        }));
    };
  },
  logOutRequest() {
    const options = {
      method: 'GET',
    };
    authToken.clearToken();
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.LOG_OUT_REQUESTING,
      });
      fetch(logOutUrl, options)
        .then(response => response.json())
        .then(json => dispatch({
          type: CONSTANTS.LOG_OUT_SUCCESS,
          payload: json,
        }))
        .catch(error => console.log('ERROR REQUEST', error));
    };
  },
};

export default authActions;
