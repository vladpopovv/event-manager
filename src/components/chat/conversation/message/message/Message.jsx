import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './messageStyle.less';
import ChatUtility from './../../../../../utility/chatUtility';

const Message = (props) => {
  const { message } = props;
  const user = message.from;
  const time = ChatUtility.getTimeMessage(message.createdAt);
  const messageClasses = classNames('message', 'alert', 'alert-light', 'py-1', 'my-1', 'px-2', 'mx-2', 'd-inline-block', {
    income: props.isIncome,
    'mr-5': props.isIncome,
    'ml-5': !props.isIncome,
  });
  return (
    <div className="">
      <div className={messageClasses}>
        <div className="message__top">
          <Link className="message__author mr-1" to={`/users/${user.id}`} href={`/users/${user.id}`}>
            {user.firstname}
          </Link>
          <span className="text-muted">{time}</span>
        </div>
        <span>
          {message.message}
        </span>
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
