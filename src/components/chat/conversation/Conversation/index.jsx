import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MessagesBox from './../message/messageBox/MessagesBox';
import InputMessage from './../inputMessage/InputMessage';
import Loader from './../message/loader/Loader';
import './ConversationStyle.less';

class Conversation extends React.Component {
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

  componentDidMount() {
    this.intervalLoadMessages = setInterval(() => {
      if (this.props.chat.id) {
        this.props.updateMessagesHandler(this.props.chat.id);
      }
    }, 2000);
  }

  componentDidUpdate(prevProps) {
    const { chat } = this.props;
    const { messagesBox } = this;

    if (messagesBox && chat.id !== prevProps.chat.id) {
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }


    // if (messagesBox && messages.length) {
    //   const prevFirstMessage = prevProps.messages[0];
    //   const currentFirstMessage = messages[0];
    //   const hasNewMessage = prevFirstMessage.id !== currentFirstMessage.id;
    //   const messagesBoxIsDown =
    //   ((messagesBox.scrollTop + messagesBox.clientHeight) / messagesBox.scrollHeight) * 100 > 95;
    //   if (hasNewMessage && messagesBoxIsDown) {
    //     messagesBox.scrollTop = messagesBox.scrollHeight;
    //   }
    // }
  }

  componentWillUnmount() {
    clearInterval(this.intervalLoadMessages);
  }


  onClickClose() {
    const { chat } = this.props;
    this.props.closeDialogHandler(chat);
  }

  sendMessageHandler() {
    const { chat } = this.props;
    const { messagesBox } = this;
    this.setState({
      textMessage: '',
    });
    this.props.sendMessageHandler(this.state.textMessage, chat.id, this.props.user)
      .then(() => { messagesBox.scrollTop = messagesBox.scrollHeight; });
  }

  changeMessageHandler(message) {
    this.setState({
      textMessage: message,
    });
  }

  loadMessagesHandler() {
    const { chat, messages } = this.props;
    if (chat.isFullDialog || this.props.loading || !messages.length) {
      return;
    }
    const lastMessage = messages[messages.length - 1];
    const timeOfLastMessage = lastMessage.createdAt;


    this.props.loadMessagesHandler(chat.id, timeOfLastMessage);
  }

  render() {
    const { chat } = this.props;

    if (this.props.isHidden && this.props.chatType === 'compressed') {
      return null;
    }

    if (!chat.id) {
      return (
        <div className="chat__conversation p-1">
          <div className="chat__notification border rounded bg-light">
            {this.props.isNotFound &&
              <span className="chat__notification-text text-muted">
                Sorry, the chat was not found.
              </span>
            }
            <span className="chat__notification-text text-muted">
              Please select a chat room to start a conversation
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="chat__conversation p-1">
        <div className="card d-flex h-100">
          <div className="card-header p-1">
            <Link
              to={`/users/${chat.participants[0].id}`}
              href={`/users/${chat.participants[0].id}`}
            >
              {chat.name}
            </Link>
            <button
              type="button"
              className="close text-dark"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.onClickClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="messages__wrapper">
            <Loader loading={this.props.loading} />
            <div className="conversation h-100 card-body p-0 d-flex">
              <MessagesBox
                messagesBoxRef={(el) => { this.messagesBox = el; }}
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
      </div>
    );
  }
}

Conversation.propTypes = {
  loading: PropTypes.bool.isRequired,
  isNotFound: PropTypes.bool,
  closeDialogHandler: PropTypes.func.isRequired,
  updateMessagesHandler: PropTypes.func.isRequired,
  sendMessageHandler: PropTypes.func.isRequired,
  loadMessagesHandler: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    id: PropTypes.number,
  }),
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}).isRequired,
  chatType: PropTypes.string,
  isHidden: PropTypes.bool.isRequired,
};

Conversation.defaultProps = {
  messages: [],
  chat: {},
  isNotFound: false,
  chatType: 'compressed',
};

export default Conversation;
