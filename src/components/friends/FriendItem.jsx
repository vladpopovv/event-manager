import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'bootstrap';

const FriendItem = props => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    <Link className="text-dark" to={`/user/${props.friend.id}`} href={`/user/${props.friend.id}`}>{props.friend.firstname} {props.friend.lastname}</Link>
    <div>
      <div className="dropdown">
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
        >
          <i className="fa fa-ellipsis-h" />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item">Send message</button>
          <div className="dropdown-divider" />
          <button className="dropdown-item">Delete</button>
        </div>
      </div>
    </div>
  </li>
);

FriendItem.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default FriendItem;
