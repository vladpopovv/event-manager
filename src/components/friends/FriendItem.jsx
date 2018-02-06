import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ControlButton from './../shared/ControlButton';
import FriendsItemContainer from './../containers/FriendsItemContainer';

const FriendItem = (props) => {
  const userLink = `/user/${props.friend.id}`;
  return (
    <FriendsItemContainer>
      <Link
        className="text-dark"
        to={userLink}
        href={userLink}
      >
        {props.friend.firstname} {props.friend.lastname}
      </Link>
      <div>
        <div className="btn-group" role="group">
          <ControlButton
            buttonType="outline-success"
            icon="comments-o"
          />
          <ControlButton
            buttonType="outline-danger"
            icon="trash"
          />
        </div>
      </div>
    </FriendsItemContainer>
  );
};

FriendItem.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default FriendItem;
