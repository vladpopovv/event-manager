import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './dialogItemStyle.less';

const DialogsItem = (props) => {
  const { chat } = props;
  const openDialogHandler = () => props.openDialogHandler(chat);
  return (
    <button
      onClick={openDialogHandler}
      className={classNames('dialog__item', 'list-group-item-action', { 'bg-primary text-white': props.disabled })}
      disabled={props.disabled}
    >
      {chat.name}
    </button>
  );
};

DialogsItem.propTypes = {
  disabled: PropTypes.bool,
  chat: PropTypes.shape({}).isRequired,
  openDialogHandler: PropTypes.func.isRequired,
};

DialogsItem.defaultProps = {
  disabled: false,
};

export default DialogsItem;
