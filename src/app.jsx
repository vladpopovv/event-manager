import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import MainPage from './components/main/MainPage';
import LoginPage from './components/login/LoginPage';
import SingUpPage from './components/singup/SingUpPage';
import HomePage from './components/home/HomePage';
import './style/main.less';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/singup" component={SingUpPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
