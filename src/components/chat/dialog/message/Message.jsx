import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './messageStyle.less';

const Message = (props) => {
  const { message } = props;
  const messageClasses = classNames('message', 'alert', 'alert-dark', 'p-1', 'm-1', 'd-inline-block', {
    income: props.isIncome,
  });
  return (
    <div className="">
      <div className={messageClasses}>
        {message.message}
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({}).isRequired,
  isIncome: PropTypes.bool,
};

Message.defaultProps = {
  isIncome: false,
};

export default Message;
