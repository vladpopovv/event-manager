import React from 'react';
import PropTypes from 'prop-types';

const DialogsItem = (props) => {
  const { friend } = props;

  return (
    <div className="list-group-item list-group-item-action">
      {friend.firstname} {friend.lastname}
    </div>
  );
};

DialogsItem.propTypes = {
  friend: PropTypes.shape({}).isRequired,
};

export default DialogsItem;
