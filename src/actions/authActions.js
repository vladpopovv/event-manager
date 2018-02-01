import CONSTANTS from './../constants/constants';

const APIURL = 'http://s.q-man.ru:5005/';

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
  return fetch(`${APIURL}${urlRequest}`, options);
}

export default {
  signUpRequest(data) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.SIGN_UP_REQUESTING });
      return fetchRequest(data, 'signup')
        .then((response) => {
          if (response.status > 500) {
            throw new Error('Server error');
          }
          return response.json();
        })
        .then((json) => {
          if (json.error) {
            console.log('ERROR', json.error);
            return dispatch({
              type: CONSTANTS.SIGN_UP_ERROR,
              payload: json,
            });
          }
          console.log('SUCCESS REQUEST', json);
          return dispatch({
            type: CONSTANTS.SIGN_UP_SUCCESS,
            payload: json,
          });
        })
        .catch(error => dispatch({
          type: CONSTANTS.SIGN_UP_REQUEST_ERROR,
          payload: error,
        }));
    };
  },

  signInRequest(data) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.SIGN_IN_REQUESTING });
      return fetchRequest(data, 'signin')
        .then((response) => {
          console.log(response);
          if (response.status >= 500) {
            throw new Error('Server error');
          }
          if (!response.ok && response.statusText === 'Unauthorized') {
            throw new Error('Invalid login or password.');
          }
          return response.json();
        })
        .then((json) => {
          localStorage.setItem('authorizationToken', json.data.token);
          localStorage.setItem('userData', JSON.stringify(json.data));
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

  logOutRequest() {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authorization: localStorage.getItem('authorizationToken'),
      },
    };
    localStorage.clear();
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.LOG_OUT_SUCCESS,
      });
      fetch(`${APIURL}logout`, options)
        .then((response) => {
          if (response.status >= 500) {
            throw new Error('Server error');
          }
          return response.json();
        })
        .then((json) => {
          localStorage.clear();
          return dispatch({
            type: CONSTANTS.LOG_OUT_SUCCESS,
            payload: json,
          });
        })
        .catch(error => console.log('ERROR REQUEST', error));
    };
  },
};
