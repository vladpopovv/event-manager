import fetchIntercept from 'fetch-intercept';
import APICONSTANTS from './../../constants/apiConstants';
import authToken from './../authorization/authToken';
import authActions from './../authorization/authActions';

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
        if (!json.success && json.error === 'You are not authorized: invalid token') {
          if (authToken.hasToken() || store.user.isAuthentificated) {
            store.dispatch(authActions.logOutRequest());
          }

          throw new Error(json.error);
        }
        if (!json.success && json.error === 'Invalid credentials') {
          throw new Error('Incorrect login or password');
        }
        return json;
      }),

    responseError: () => {
      throw new Error('Sorry, a query error. Check your connection');
    },
  })
);

export default fetchInterceptor;
