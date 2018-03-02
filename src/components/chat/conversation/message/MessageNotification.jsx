import React from 'react';
import PropTypes from 'prop-types';

const MessageNotification = (props) => {
  const { text } = props;
  return (
    <div className="text-center">
      <span className="alert alert-success p-1 m-1 d-inline-block">{text}</span>
    </div>
  );
};

MessageNotification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default MessageNotification;
