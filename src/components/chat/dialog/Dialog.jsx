import React from 'react';
import PropTypes from 'prop-types';
import MessagesBox from './message/MessagesBox';
import InputMessage from './InputMessage';
import ChatUtility from './../../../utility/chatUtility';
import './dialogStyle.less';

const Dialog = (props) => {
  const { chat } = props;
  const sendMessageHandler = message =>
    props.sendMessageHandler(message, chat.id, props.user);
  const loadMessagesHandler = () => {
    const lastMessage = props.messages[props.messages.length - 1];
    const timeOfLastMessage = lastMessage.createdAt;
    props.loadMessagesHandler(chat.id, timeOfLastMessage);
  };
  const dialogName = ChatUtility.getChatName(chat);

  return (
    <div className="card">
      <div className="card-header p-1">
        {dialogName}
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
        <MessagesBox
          messages={props.messages}
          user={props.user}
          loadMessagesHandler={loadMessagesHandler}
        />
        <InputMessage sendMessageHandler={sendMessageHandler} />
      </div>
    </div>
  );
};

Dialog.propTypes = {
  closeDialogHandler: PropTypes.func.isRequired,
  sendMessageHandler: PropTypes.func.isRequired,
  loadMessagesHandler: PropTypes.func.isRequired,
  chat: PropTypes.shape({}).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default Dialog;
