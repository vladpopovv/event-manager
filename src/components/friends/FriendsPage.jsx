import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FriendsList from './FriendsList';
import FriendsRequestList from './FriendsRequestList';
import SearchFriends from './../searchFriends/SearchFriends';
import FriendsNavs from './FriendsNavs';

const FriendsPage = () => (
  <div className="container">
    <div className="row">
      <div className="col-12 my-4">
        <div className="row border rounded">
          <div className="col-8 border-right">
            <Switch>
              <Route exact path="/friends" component={FriendsList} />
              <Route path="/friends/request" component={FriendsRequestList} />
            </Switch>
          </div>
          <div className="col-4 p-0">
            <div className="card border-0">
              <div className="card-header p-0 border-bottom">
                <FriendsNavs />
              </div>
              <div className="card-body p-3">
                <SearchFriends />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default FriendsPage;
