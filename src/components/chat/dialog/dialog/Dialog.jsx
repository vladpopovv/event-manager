import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MessagesBox from './../message/messageBox/MessagesBox';
import InputMessage from './../inputMessage/InputMessage';
import Loader from './../message/loader/Loader';
import ChatUtility from './../../../../utility/chatUtility';
import './dialogStyle.less';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textMessage: '',
    };

    this.onClickClose = this.onClickClose.bind(this);
    this.sendMessageHandler = this.sendMessageHandler.bind(this);
    this.changeMessageHandler = this.changeMessageHandler.bind(this);
    this.loadMessagesHandler = this.loadMessagesHandler.bind(this);
  }

  onClickClose() {
    const { chat } = this.props;
    this.props.closeDialogHandler(chat);
  }

  sendMessageHandler() {
    const { chat } = this.props;
    this.props.sendMessageHandler(this.state.textMessage, chat.id, this.props.user);
  }

  changeMessageHandler(message) {
    this.setState({
      textMessage: message,
    });
  }

  loadMessagesHandler() {
    const { chat, messages } = this.props;
    const lastMessage = messages[messages.length - 1];
    const timeOfLastMessage = lastMessage.createdAt;

    if (chat.isFullDialog || this.props.loading) {
      return;
    }

    this.props.loadMessagesHandler(chat.id, timeOfLastMessage);
  }

  render() {
    const { chat } = this.props;
    const dialogName = ChatUtility.getChatName(chat);

    return (
      <div className="card">
        <div className="card-header p-1">
          <Link
            to={`users/${chat.participants[0].id}`}
            href={`users/${chat.participants[0].id}`}
          >
            {dialogName}
          </Link>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.onClickClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="messages__wrapper">
          <Loader loading={this.props.loading} />
          <div className="dialog card-body p-0 d-flex">
            <MessagesBox
              messages={this.props.messages}
              chat={chat}
              user={this.props.user}
              loadMessagesHandler={this.loadMessagesHandler}
            />
            <InputMessage
              textMessage={this.state.textMessage}
              sendMessageHandler={this.sendMessageHandler}
              changeMessageHandler={this.changeMessageHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  loading: PropTypes.bool.isRequired,
  closeDialogHandler: PropTypes.func.isRequired,
  sendMessageHandler: PropTypes.func.isRequired,
  loadMessagesHandler: PropTypes.func.isRequired,
  chat: PropTypes.shape({}).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}).isRequired,
};

Dialog.defaultProps = {
  messages: [],
  // textMessage: '',
};

export default Dialog;
