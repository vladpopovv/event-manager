import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import Authorization from './components/authorization/Authorization';
import LoginPage from './components/login/LoginPage';
import SingUpPage from './components/signup/SignUpPage';
import HomePage from './components/home/HomePage';
import NotFound from './components/shared/NotFound';
import './style/main.less';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Authorization(HomePage, true, '/login')} />
        <Route path="/login" component={Authorization(LoginPage, false, '/')} />
        <Route path="/signup" component={Authorization(SingUpPage, false, '/')} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
