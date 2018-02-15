import React from 'react';
import PropTypes from 'prop-types';
import EventButton from './../shared/EventButton';

const UninvitedItem = (props) => {
  const { friend } = props;
  const onClickAdd = () => props.clickAddHandler(friend);
  return (
    <div>
      {friend.firstname} {friend.lastname}
      <EventButton
        clickHandler={onClickAdd}
        text="invite"
      />
    </div>
  );
};

UninvitedItem.propTypes = {
  friend: PropTypes.shape({}).isRequired,
  clickAddHandler: PropTypes.func.isRequired,
};

export default UninvitedItem;
