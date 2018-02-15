import React from 'react';
import PropTypes from 'prop-types';
import UninvitedItem from './UninvitedItem';

const UninvitedFriends = props => (
  <div>
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
