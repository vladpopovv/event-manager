import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FollowerItem = props => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    <Link className="text-dark" to={`/user/${props.follower.id}`} href={`/user/${props.follower.id}`}>{props.follower.firstname} {props.follower.lastname}</Link>
    <div>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-outline-success">Add to friends</button>
        <button type="button" className="btn btn-outline-danger">Delete</button>
      </div>
    </div>
  </li>
);

FollowerItem.propTypes = {
  follower: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default FollowerItem;
