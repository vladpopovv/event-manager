import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import FriendsList from './FriendsList';
import FriendsRequestList from './FriendsRequestList';
import SearchFriends from './SearchFriends';

const FriendsPage = () => (
  <div className="container">
    <div className="row mt-4 border rounded">
      <div className="col-8 p-0 border-right">
        <Switch>
          <Route exact path="/friends" component={FriendsList} />
          <Route path="/friends/request" component={FriendsRequestList} />
        </Switch>
      </div>
      <div className="col-4 p-0">
        <div className="card border-0">
          <div className="card-header p-0 border-bottom">
            <ul className="list-group">
              <Link
                className="list-group-item border-0"
                href="/friends"
                to="/friends"
              >
                All friends
              </Link>
              <Link
                className="list-group-item border-0"
                href="/friends/request"
                to="/friends/request"
              >
                Friends Requests
              </Link>
            </ul>
          </div>
          <div className="card-body">
            <SearchFriends />
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default FriendsPage;
