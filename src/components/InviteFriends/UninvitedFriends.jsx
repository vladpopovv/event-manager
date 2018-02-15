import React from 'react';
import PropTypes from 'prop-types';
import UninvitedItem from './UninvitedItem';

const UninvitedFriends = props => (
  <div className="invite__friends-list my-2 border rounded">
    {props.friends.length === 0 &&
      <div className="invite__message">
        <span className="text-muted">
          You do not have any friends not invited.
        </span>
      </div>}
    {props.friends.map(friend => (
      <UninvitedItem key={friend.id} friend={friend} clickAddHandler={props.addHandler} />
    ))}
  </div>
);

UninvitedFriends.propTypes = {
  addHandler: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default UninvitedFriends;
