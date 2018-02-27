import React from 'react';
import PropTypes from 'prop-types';
import FriendChatItem from './FriendChatItem';

const FriendsChatList = (props) => {
  const { friends } = props;

  return (
    <div className="dialog card-body p-0 d-flex">
      <div className="list-group dialogs__list border-bottom border-left border-right">
        {friends.map(friend => (
          <FriendChatItem
            key={friend.id}
            friend={friend}
            openDialogHandler={props.openDialogHandler}
          />
        ))}
      </div>
    </div>
  );
};

FriendsChatList.propTypes = {
  openDialogHandler: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FriendsChatList;
