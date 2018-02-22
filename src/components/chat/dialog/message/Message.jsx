import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Message = (props) => {
  const { message } = props;

  return (
    <div className="">
      <div className="alert alert-dark p-1 m-1 d-inline-block">
        {message.message}
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({}).isRequired,
};

export default Message;
