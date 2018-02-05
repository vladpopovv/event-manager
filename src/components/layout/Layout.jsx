import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './../header/Header';
import HomePage from './../home/HomePage';
import FriendsPage from './../friends/FriendsPage';

const Layout = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/friends" component={FriendsPage} />
    </Switch>
  </div>
);

export default Layout;
