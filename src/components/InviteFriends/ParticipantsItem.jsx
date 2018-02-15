import React from 'react';
import PropTypes from 'prop-types';
import EventButton from './../shared/EventButton';

const ParticipantsItem = (props) => {
  const { friend } = props;
  const onClickRemove = () => props.clickRemoveHandler(friend);
  return (
    <div>
      {friend.firstname} {friend.lastname}
      <EventButton
        clickHandler={onClickRemove}
        text="remove"
      />
    </div>
  );
};

ParticipantsItem.propTypes = {
  friend: PropTypes.shape({}).isRequired,
  clickRemoveHandler: PropTypes.func.isRequired,
};

export default ParticipantsItem;
