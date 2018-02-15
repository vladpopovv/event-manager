import React from 'react';
import PropTypes from 'prop-types';
import EventButton from './../shared/EventButton';

const ParticipantsItem = (props) => {
  const { friend } = props;
  const onClickRemove = () => props.clickRemoveHandler(friend);
  return (
    <div className="invite__item">
      <div className="invite__item-body m-2">
        {friend.firstname} {friend.lastname}
        <EventButton
          clickHandler={onClickRemove}
          text="remove"
        />
      </div>
    </div>
  );
};

ParticipantsItem.propTypes = {
  friend: PropTypes.shape({}).isRequired,
  clickRemoveHandler: PropTypes.func.isRequired,
};

export default ParticipantsItem;
