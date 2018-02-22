import React from 'react';
import PropTypes from 'prop-types';
import DialogsItem from './DialogsItem';
import './dialogsListStyle.less';

const DialogsList = (props) => {
  const { chats } = props;

  return (
    <div className="card">
      <div className="card-header p-1">
        Dialogs list
      </div>
      <div className="dialog card-body p-0 d-flex">
        <div className="list-group dialogs__list">
          {chats.map(chat => (
            <DialogsItem
              key={chat.id}
              chat={chat}
              openDialogHandler={props.openDialogHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

DialogsList.propTypes = {
  openDialogHandler: PropTypes.func.isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default DialogsList;
