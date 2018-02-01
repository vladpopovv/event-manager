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
};
