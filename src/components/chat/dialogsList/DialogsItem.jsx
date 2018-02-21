import React from 'react';
import PropTypes from 'prop-types';

const DialogsItem = (props) => {
  const { friend } = props;

  return (
    <div>
      {friend.firstname} {friend.lastname}
    </div>
  );
};

DialogsItem.propTypes = {
  friend: PropTypes.shape({}).isRequired,
};

export default DialogsItem;
