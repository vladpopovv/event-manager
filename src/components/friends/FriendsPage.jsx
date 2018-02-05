import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

const friendsList = () => (
  <h1>All friends</h1>
);

const followers = () => (
  <h1>followers</h1>
);

const pendingFollowers = () => (
  <h1>pendingFollowers</h1>
);

const FriendsPage = () => (
  <div className="container">
    <div className="row">
      <div>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <Link href="/friends" to="/friends">
              All friends
              <span className="badge badge-warning badge-pill">14</span>
            </Link>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <Link href="/friends/followers" to="/friends/followers">
              Outgoing followers
              <span className="badge badge-warning badge-pill">14</span>
            </Link>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <Link href="/friends/pending_followers" to="/friends/pending_followers">
              Pending followers
              <span className="badge badge-warning badge-pill">14</span>
            </Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/friends" component={friendsList} />
        <Route path="/friends/followers" component={followers} />
        <Route path="/friends/pending_followers" component={pendingFollowers} />
      </Switch>
    </div>
  </div>
);


export default FriendsPage;
