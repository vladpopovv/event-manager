import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MessagesBox from './../message/messageBox/MessagesBox';
import InputMessage from './../inputMessage/InputMessage';
import Loader from './../message/loader/Loader';
import ChatUtility from './../../../../utility/chatUtility';
import './dialogStyle.less';

const Dialog = (props) => {
  const { chat } = props;

  const sendMessageHandler = (message) => {
    if (!message) return;
    props.sendMessageHandler(message, chat.id, props.user);
  };

  const loadMessagesHandler = () => {
    const lastMessage = props.messages[props.messages.length - 1];
    const timeOfLastMessage = lastMessage.createdAt;

    if (chat.isFullDialog || props.loading) {
      return;
    }

    props.loadMessagesHandler(chat.id, timeOfLastMessage);
  };

  const onClickClose = () => props.closeDialogHandler(chat);

  const dialogName = ChatUtility.getChatName(chat);

  return (
    <div className="card">
      <div className="card-header p-1">
        <Link
          to={`users/${chat.participants[0].id}`}
          href={`users/${chat.participants[0].id}`}
        >
          {dialogName}
        </Link>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onClickClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="messages__wrapper">
        <Loader loading={props.loading} />
        <div className="dialog card-body p-0 d-flex">
          <MessagesBox
            messages={props.messages}
            chat={chat}
            user={props.user}
            loadMessagesHandler={loadMessagesHandler}
          />
          <InputMessage sendMessageHandler={sendMessageHandler} />
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  loading: PropTypes.bool.isRequired,
  closeDialogHandler: PropTypes.func.isRequired,
  sendMessageHandler: PropTypes.func.isRequired,
  loadMessagesHandler: PropTypes.func.isRequired,
  chat: PropTypes.shape({}).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}).isRequired,
};

Dialog.defaultProps = {
  messages: [],
};

export default Dialog;
