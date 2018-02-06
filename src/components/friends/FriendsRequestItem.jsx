import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FriendsItemContainer from './../containers/FriendsItemContainer';

const FriendsRequestItem = (props) => {
  const userLink = `/user/${props.user.id}`;
  return (
    <FriendsItemContainer>
      <Link
        className="text-dark"
        to={userLink}
        href={userLink}
      >
        {props.user.firstname} {props.user.lastname}
      </Link>
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
    </FriendsItemContainer>
  );
};

FriendsRequestItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default FriendsRequestItem;
