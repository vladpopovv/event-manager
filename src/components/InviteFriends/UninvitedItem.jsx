import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EventButton from './../shared/EventButton';

const UninvitedItem = (props) => {
  const { friend } = props;
  const userLink = `users/${friend.id}`;
  const onClickAdd = () => props.clickAddHandler(friend);
  return (
    <div className="invite__item">
      <div className="invite__item-body m-2">
        <Link
          className="text-dark"
          to={userLink}
          href={userLink}
          onClick={props.onClickUser}
        >
          {friend.firstname} {friend.lastname}
        </Link>
        <EventButton
          clickHandler={onClickAdd}
          text="invite"
        />
      </div>
    </div>
  );
};

UninvitedItem.propTypes = {
  onClickUser: PropTypes.func.isRequired,
  friend: PropTypes.shape({}).isRequired,
  clickAddHandler: PropTypes.func.isRequired,
};

export default UninvitedItem;
