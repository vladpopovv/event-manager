import React from 'react';
import PropTypes from 'prop-types';
import EventButton from './../shared/EventButton';

const UninvitedItem = (props) => {
  const { friend } = props;
  const onClickAdd = () => props.clickAddHandler(friend);
  return (
    <div className="invite__item">
      <div className="invite__item-body m-2">
        {friend.firstname} {friend.lastname}
        <EventButton
          clickHandler={onClickAdd}
          text="invite"
        />
      </div>
    </div>
  );
};

UninvitedItem.propTypes = {
  friend: PropTypes.shape({}).isRequired,
  clickAddHandler: PropTypes.func.isRequired,
};

export default UninvitedItem;
