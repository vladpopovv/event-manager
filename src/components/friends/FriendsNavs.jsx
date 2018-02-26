import React from 'react';
import { Link } from 'react-router-dom';

const FriendsNavs = () => (
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
);

export default FriendsNavs;
