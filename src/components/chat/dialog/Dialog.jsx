import React from 'react';
import PropTypes from 'prop-types';
import MessagesBox from './message/MessagesBox';
import InputMessage from './InputMessage';

const Dialog = (props) => {
  const { friend } = props;

  return (
    <div className="card">
      <div className="card-header">
        {friend.firstname} {friend.lastname}
      </div>
      <div className="card-body">
        <MessagesBox />
        <InputMessage />
      </div>
    </div>
  );
};

Dialog.propTypes = {
  friend: PropTypes.shape({}).isRequired,
};

export default Dialog;
