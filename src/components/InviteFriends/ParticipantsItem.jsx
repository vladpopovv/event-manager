import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EventButton from './../shared/EventButton';

const ParticipantsItem = (props) => {
  const { friend } = props;
  const userLink = `users/${friend.id}`;
  const onClickRemove = () => props.clickRemoveHandler(friend);
  return (
    <div className="invite__item">
      <div className="invite__item-body m-2">
        <Link
          className="text-dark"
          to={userLink}
          href={userLink}
        >
          {friend.firstname} {friend.lastname}
        </Link>
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
