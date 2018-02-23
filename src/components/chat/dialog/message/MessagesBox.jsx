import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import './messageBoxStyle.less';

const MessagesBox = (props) => {
  const { messages, user } = props;
  const onScrollHandler = (e) => {
    if (e.target.scrollTop === 0) {
      props.loadMessagesHandler();
    }
  };
  return (
    <div className="message__box border-bottom" onScroll={onScrollHandler} >
      {messages.map(message => (
        <Message key={message.id} message={message} isIncome={user.id !== message.from.id} />
      ))}
    </div>
  );
};

MessagesBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}).isRequired,
  loadMessagesHandler: PropTypes.func.isRequired,
};

MessagesBox.defaultProps = {
  messages: [],
};

export default MessagesBox;
