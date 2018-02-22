import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

const MessagesBox = (props) => {
  const { messages } = props;

  return (
    <div>
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
