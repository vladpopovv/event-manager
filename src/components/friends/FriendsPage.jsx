import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import FriendsList from './FriendsList';
import FollowerList from './FollowerList';

const FriendsPage = () => (
  <div className="container">
    <div className="row mt-4">
      <div className="col-3">
        <ul className="list-group">
          <Link
            className="list-group-item list-group-item-action"
            href="/friends"
            to="/friends"
          >
            All friends
          </Link>
          <Link
            className="list-group-item list-group-item-action"
            href="/friends/followers"
            to="/friends/followers"
          >
            Outgoing followers
          </Link>
        </ul>
      </div>
      <div className="col-7">
        <Switch>
          <Route exact path="/friends" component={FriendsList} />
          <Route path="/friends/followers" component={FollowerList} />
        </Switch>
      </div>
    </div>
  </div>
);


export default FriendsPage;
