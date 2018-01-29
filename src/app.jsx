import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './containers/MainPage';
import LoginPage from './containers/LoginPage';
import SingUpPage from './containers/SingUpPage';
import './style/main.less';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/singup" component={SingUpPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app'),
);
