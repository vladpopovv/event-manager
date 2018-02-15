import React from 'react';
import PropTypes from 'prop-types';
import ParticipantsItem from './ParticipantsItem';

const Participants = props => (
  <div>
    <span>Participants</span>
    {props.friends.map(friend => (
      <ParticipantsItem key={friend.id} friend={friend} clickRemoveHandler={props.removeHandler} />
    ))}
  </div>
);

Participants.propTypes = {
  removeHandler: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Participants;
