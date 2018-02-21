import React from 'react';
import PropTypes from 'prop-types';
import DialogsItem from './DialogsItem';

const DialogsList = (props) => {
  const { friends } = props;

  return (
    <div>
      <ul>
        {friends.map(friend => (
          <DialogsItem key={friend.id} friend={friend} />
        ))}
      </ul>
    </div>
  );
};

DialogsList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default DialogsList;
