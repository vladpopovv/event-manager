import fetchIntercept from 'fetch-intercept';
import APICONSTANTS from './../../constants/apiConstants';
import authToken from './authToken';
import authActions from './authActions';

const { APIURL } = APICONSTANTS;

const fetchInterceptor = store => (
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

    response: response => response.json()
      .then((json) => {
        if (!json.success) {
          store.dispatch(authActions.logOutRequest());
          throw new Error(json.error);
        }
        return json;
      }),
    // if (response.status === 401 && authToken.hasToken()) {
    //   authActions.logOutRequest();
    // }
    // return response;

    responseError: () => {
      throw new Error('Sorry, a query error. Check your connection');
    },
  })
);

export default fetchInterceptor;
