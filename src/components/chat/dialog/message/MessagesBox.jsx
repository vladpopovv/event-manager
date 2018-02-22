import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import './messageBoxStyle.less';

const MessagesBox = (props) => {
  const { messages } = props;

  return (
    <div className="message__box border-bottom">
      MESSAGES
      {messages.map(message => (
        <Message message={message} />
      ))}
    </div>
  );
};

MessagesBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})),
};

MessagesBox.defaultProps = {
  messages: [],
};

export default MessagesBox;
