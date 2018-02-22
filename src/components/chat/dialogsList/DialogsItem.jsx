import React from 'react';
import PropTypes from 'prop-types';

const DialogsItem = (props) => {
  const { friend } = props;
  const openDialogHandler = () => props.openDialogHandler(friend);
  return (
    <button onClick={openDialogHandler} className="list-group-item list-group-item-action">
      {friend.firstname} {friend.lastname}
    </button>
  );
};

DialogsItem.propTypes = {
  friend: PropTypes.shape({}).isRequired,
  openDialogHandler: PropTypes.func.isRequired,
};

export default DialogsItem;
