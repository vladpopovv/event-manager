import React from 'react';
import PropTypes from 'prop-types';
import DialogsItem from './../dialogItem/DialogsItem';
import './dialogsListStyle.less';

const DialogsList = (props) => {
  const { chats } = props;
  return (
    <div className="dialog card-body p-0 d-flex">
      <div className="list-group dialogs__list">
        {chats.map(chat => (
          <DialogsItem
            disabled={props.currentChat === chat.id}
            key={chat.id}
            chat={chat}
            openDialogHandler={props.openDialogHandler}
          />
        ))}
      </div>
    </div>
  );
};

DialogsList.propTypes = {
  openDialogHandler: PropTypes.func.isRequired,
  currentChat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  chats: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default DialogsList;
