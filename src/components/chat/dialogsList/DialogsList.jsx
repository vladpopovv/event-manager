import React from 'react';
import PropTypes from 'prop-types';
import DialogsItem from './DialogsItem';
import './dialogsListStyle.less';

const DialogsList = (props) => {
  const { friends } = props;

  return (
    <div>
      <div className="list-group dialogs__list">
        {friends.map(friend => (
          <DialogsItem key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

DialogsList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default DialogsList;
