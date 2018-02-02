import CONSTANTS from './../constants/constants';
import APICONSTANTS from './../constants/apiConstants';

const {
  APIURL,
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
  return fetch(`${APIURL}${urlRequest}`, options);
}


export function signInRequest(data) {
  return (dispatch) => {
    dispatch({ type: CONSTANTS.SIGN_IN_REQUESTING });
    return fetchRequest(data, signInUrl)
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
}


export function signUpRequest(data) {
  return (dispatch) => {
    dispatch({ type: CONSTANTS.SIGN_UP_REQUESTING });
    return fetchRequest(data, signUpUrl)
      .then((response) => {
        if (response.status >= 500) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          console.log('ERROR', json.error);
          // dispatch({
          //   type: CONSTANTS.SIGN_UP_ERROR,
          //   payload: json,
          // });
          throw new Error(json.error);
        }
        dispatch(signInRequest({
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
}

export function logOutRequest() {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: localStorage.getItem('authorizationToken'),
    },
  };
  localStorage.clear();
  return (dispatch) => {
    dispatch({
      type: CONSTANTS.LOG_OUT_SUCCESS,
    });
    fetch(`${APIURL}${logOutUrl}`, options)
      .then((response) => {
        if (response.status >= 500) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then(json => dispatch({
        type: CONSTANTS.LOG_OUT_SUCCESS,
        payload: json,
      }))
      .catch(error => console.log('ERROR REQUEST', error));
  };
}
