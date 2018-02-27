import React from 'react';
import PropTypes from 'prop-types';

const FriendChatItem = (props) => {
  const { friend } = props;
  const openDialogHandler = () => props.openDialogHandler(friend);
  return (
    <button onClick={openDialogHandler} className="dialog__item list-group-item-action">
      {friend.firstname} {friend.lastname}
    </button>
  );
};

FriendChatItem.propTypes = {
  friend: PropTypes.shape({}).isRequired,
  openDialogHandler: PropTypes.func.isRequired,
};

export default FriendChatItem;
