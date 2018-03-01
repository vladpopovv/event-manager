import React from 'react';
import PropTypes from 'prop-types';
import ParticipantsItem from './ParticipantsItem';

const Participants = props => (
  <div>
    <small>Invited Participants</small>
    <div className="invite__friends-list my-2 border rounded">
      {props.friends.length === 0 &&
        <div className="invite__message">
          <span className="text-muted">
            You have not invited any friends yet
          </span>
        </div>}
      {props.friends.map(friend => (
        <ParticipantsItem
          key={friend.id}
          friend={friend}
          clickRemoveHandler={props.removeHandler}
        />
      ))}
    </div>
  </div>
);

Participants.propTypes = {
  removeHandler: PropTypes.func.isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Participants;
