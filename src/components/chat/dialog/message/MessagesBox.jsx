import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import './messageBoxStyle.less';

const MessagesBox = (props) => {
  const { messages, user } = props;

  return (
    <div className="message__box border-bottom">
      {messages.map(message => (
        <Message key={message.id} message={message} isIncome={user.id !== message.from.id} />
      ))}
    </div>
  );
};

MessagesBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}).isRequired,
};

MessagesBox.defaultProps = {
  messages: [],
};

export default MessagesBox;
