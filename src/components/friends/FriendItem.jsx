import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ControlButton from './../shared/ControlButton';
import FriendsItemContainer from './../containers/FriendsItemContainer';

const FriendItem = (props) => {
  const onDeleteFriends = () => props.deleteHandler(props.friend);
  const userLink = `/users/${props.friend.id}`;

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
          <Link
            className="btn btn-primary"
            to={`/chats?userId=${props.friend.id}`}
            href={`/chats?userId=${props.friend.id}`}
          >
            <i className="fa fa-comments-o" />
          </Link>
          <ControlButton
            buttonType="outline-danger"
            icon="trash"
            onClickHandler={onDeleteFriends}
            loading={props.deleteLoading}
            disabled={props.deleteLoading}
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
  deleteHandler: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool,
};

FriendItem.defaultProps = {
  deleteLoading: false,
};

export default FriendItem;
