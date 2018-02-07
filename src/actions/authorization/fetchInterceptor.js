import fetchIntercept from 'fetch-intercept';
import APICONSTANTS from './../../constants/apiConstants';
import authToken from './authToken';
import authActions from './authActions';

const { APIURL } = APICONSTANTS;

fetchIntercept.register({
  request: (urlRequest, config) => {
    const options = {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    if (authToken.hasToken()) {
      options.headers.Authorization = authToken.getToken('authorizationToken');
    }
    const url = `${APIURL}${urlRequest}`;
    return [url, options];
  },

  response: (response) => {
    if (response.status === 401 && authToken.hasToken()) {
      authActions.logOutRequest();
    }
    return response;
  },

  responseError: () => {
    throw new Error('Sorry, a query error. Check your connection');
  },

});
