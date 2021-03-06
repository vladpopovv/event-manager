import React from 'react';
import PropTypes from 'prop-types';
import Message from './../message/Message';
import MessageNotification from './../MessageNotification';
import ChatUtility from './../../../../../utility/chatUtility';
import './messageBoxStyle.less';

const MessagesBox = (props) => {
  const { user, chat } = props;
  const messages = ChatUtility.setDateBetweenDays(props.messages, chat.isFullDialog);

  const onScrollHandler = (e) => {
    if (e.target.scrollTop === 0) {
      props.loadMessagesHandler();
    }
  };
  return (
    <div
      ref={props.messagesBoxRef}
      className="message__box border-bottom"
      onScroll={onScrollHandler}
    >
      {messages.map(message => (
        message.id
        ? <Message key={message.id} message={message} isIncome={user.id !== message.from.id} />
        : <MessageNotification key={message.info} text={message.info} />
      ))}
    </div>
  );
};

MessagesBox.propTypes = {
  messagesBoxRef: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}).isRequired,
  chat: PropTypes.shape({}).isRequired,
  loadMessagesHandler: PropTypes.func.isRequired,
};

MessagesBox.defaultProps = {
  messages: [],
};

export default MessagesBox;
