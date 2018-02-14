import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import Authorization from './components/authorization/Authorization';
import LoginPage from './components/login/LoginPage';
import SignUpPage from './components/signup/SignUpPage';
import HomePage from './components/home/HomePage';
import NotFound from './components/shared/NotFound';
import NotificationWrapper from './components/notification/NotificationWrapper';
import './actions/authorization/fetchInterceptor';
import './style/main.less';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Authorization(HomePage)} />
        <Route path="/login" component={Authorization(LoginPage, false, '/')} />
        <Route path="/signup" component={Authorization(SignUpPage, false, '/')} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

ReactDOM.render(
  <Provider store={store}>
    <NotificationWrapper />
  </Provider>,
  document.getElementById('notifications'),
);
