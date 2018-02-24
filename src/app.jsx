import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import Authorization from './components/authorization/Authorization';
import LoginPage from './components/login/LoginPage';
import SignUpPage from './components/signup/SignUpPage';
import Layout from './components/layout/Layout';
import NotFound from './components/shared/NotFound';
import NotificationWrapper from './components/notification/NotificationWrapper';
// import Modal from './components/modal/Modal';
import fetchInterceptor from './actions/authorization/fetchInterceptor';
import './style/main.less';

const store = createStore();
fetchInterceptor(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Authorization(LoginPage, false, '/')} />
        <Route path="/signup" component={Authorization(SignUpPage, false, '/')} />
        <Route path="/" component={Authorization(Layout)} />
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

// ReactDOM.render(
//   <Provider store={store}>
//     <Modal />
//   </Provider>,
//   document.getElementById('modals'),
// );
