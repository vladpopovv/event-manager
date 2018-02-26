import React from 'react';
import PropTypes from 'prop-types';
import './dialogItemStyle.less';

const DialogsItem = (props) => {
  const { chat } = props;
  const openDialogHandler = () => props.openDialogHandler(chat);
  return (
    <button onClick={openDialogHandler} className="dialog__item list-group-item-action">
      {chat.name}
    </button>
  );
};

DialogsItem.propTypes = {
  chat: PropTypes.shape({}).isRequired,
  openDialogHandler: PropTypes.func.isRequired,
};

export default DialogsItem;
