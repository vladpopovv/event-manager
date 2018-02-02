import fetchIntercept from 'fetch-intercept';
import APICONSTANTS from './../constants/apiConstants';

const { APIURL } = APICONSTANTS;
// import authToken from './authToken';

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

  // requestError: (error) => {
  //   // Called when an error occured during another 'request' interceptor call
  //   return Promise.reject(error);
  // },

  // response: (response) => {
  //   // Modify the reponse object
  //   return response;
  // },

  // responseError: (error) => {
  //   // Handle an fetch error
  //   return Promise.reject(error);
  // }
});
