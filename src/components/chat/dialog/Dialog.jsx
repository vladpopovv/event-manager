import React from 'react';
import PropTypes from 'prop-types';
import MessagesBox from './message/MessagesBox';
import InputMessage from './InputMessage';
import './dialogStyle.less';

const Dialog = (props) => {
  const { chat } = props;

  return (
    <div className="card">
      <div className="card-header p-1">
        {chat.participants[0].firstname} {chat.participants[0].lastname}
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={props.closeDialogHandler}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="dialog card-body p-0 d-flex">
        <MessagesBox />
        <InputMessage />
      </div>
    </div>
  );
};

Dialog.propTypes = {
  closeDialogHandler: PropTypes.func.isRequired,
  chat: PropTypes.shape({}).isRequired,
};

export default Dialog;
