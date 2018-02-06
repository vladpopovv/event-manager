import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FriendsRequestItem = props => (
  <li
    className="list-group-item border-top-0 border-left-0 border-right-0
    border-bottom d-flex justify-content-between align-items-center"
  >
    <Link className="text-dark" to={`/user/${props.follower.id}`} href={`/user/${props.follower.id}`}>{props.follower.firstname} {props.follower.lastname}</Link>
    <div>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-outline-success">
          <i className="fa fa-plus-circle" />
        </button>
        <button type="button" className="btn btn-outline-danger">
          <i className="fa fa-trash" />
        </button>
      </div>
    </div>
  </li>
);

FriendsRequestItem.propTypes = {
  follower: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default FriendsRequestItem;
