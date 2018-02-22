import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
  const { message } = props;

  return (
    <div>
      {message.body}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({}).isRequired,
};

export default Message;
