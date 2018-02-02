import fetchIntercept from 'fetch-intercept';
import APICONSTANTS from './../constants/apiConstants';
// import authToken from './authToken';

const { APIURL } = APICONSTANTS;

fetchIntercept.register({
  request: (urlRequest, config) => {
    const options = {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization: authToken.getToken('authorizationToken'),
      },
    };
    const url = `${APIURL}${urlRequest}`;
    return [url, options];
  },

  requestError: (error) => {
    console.log('Request Error');
    return Promise.reject(new Error('Server error', error));
  },

});
