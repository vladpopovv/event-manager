import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Dialogs from './dialogs/Dialogs';
import Conversation from './conversation/Conversation/index';
import ChatUtility from './../../utility/chatUtility';
import chatActions from './../../actions/chat/chatActions';
import friendsActions from './../../actions/friends/friendsActions';
import './chatStyle.less';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.openDialogHandler = this.openDialogHandler.bind(this);
    this.closeDialogHandler = this.closeDialogHandler.bind(this);
    this.createDialogHandler = this.createDialogHandler.bind(this);
  }

  componentDidMount() {
    this.props.getPersonalChats(this.props.chatId);
    this.props.getFriends();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId && this.isRequesting) {
      this.isRequesting = false;
    }

    if (nextProps.userId && !this.isRequesting) {
      const user = nextProps.friends.find(friend => friend.id === nextProps.userId);
      if (user) {
        this.isRequesting = true;
        this.props.createChat(user, this.props.redirectToFunc)
          .then(() => { this.isRequesting = false; });
      }
    }

    if (!nextProps.chatId && this.props.currentChat && this.props.redirectToFunc) {
      this.props.closeChat();
    }

    if (nextProps.chatId !== this.props.chatId) {
      this.props.openChat(nextProps.chatId);
    }
  }

  componentWillUnmount() {
    this.props.clearChat();
  }

  createDialogHandler(user) {
    this.props.createChat(user, this.props.redirectToFunc);
  }

  openDialogHandler(chat) {
    if (this.props.redirectToFunc) {
      return this.props.redirectToFunc(`/chats/${chat.id}`);
    }
    return this.props.openChat(chat.id);
  }

  closeDialogHandler() {
    if (this.props.redirectToFunc) {
      this.props.redirectToFunc('/chats');
    }
    return this.props.closeChat();
  }

  render() {
    const { loading } = this.props;
    const chats = ChatUtility.setNameToChats(this.props.chats);
    const currentChat = ChatUtility.getChatById(this.props.currentChat, chats);
    const hasActiveConversation = !!currentChat.id;
    const currentMessages = hasActiveConversation ? this.props.messages[currentChat.id] : [];
    const currentChatLoading = hasActiveConversation
      ? loading.loadMessages.indexOf(currentChat.id) !== -1
      : false;
    const chatIsNotFound = currentChat.isNotFound && chats.length !== 0;
    return (
      <div className="border rounded">
        <div className="px-2 py-1">
          <div className="px-1 mb-1">
            <i className="fa fa-comments-o mr-1" />
            Chat
          </div>
          <div className={classNames('chat__wrapper', this.props.chatType)} >
            <Dialogs
              chatType={this.props.chatType}
              isHidden={hasActiveConversation}
              friends={this.props.friends}
              currentChat={this.props.currentChat}
              chats={chats}
              openDialogHandler={this.openDialogHandler}
              createDialogHandler={this.createDialogHandler}
            />
            <Conversation
              redirectHandler={this.props.redirectToFunc}
              chatType={this.props.chatType}
              isNotFound={chatIsNotFound}
              isHidden={!hasActiveConversation}
              loading={currentChatLoading}
              chat={currentChat}
              messages={currentMessages}
              closeDialogHandler={this.closeDialogHandler}
              user={this.props.user}
              sendMessageHandler={this.props.sendMessage}
              loadMessagesHandler={this.props.loadMessages}
              updateMessagesHandler={this.props.updateMessages}
            />
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  chatType: PropTypes.string,
  chats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  chatId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  userId: PropTypes.number,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}).isRequired,
  currentChat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  messages: PropTypes.shape({}).isRequired,
  loading: PropTypes.shape({}).isRequired,
  getPersonalChats: PropTypes.func.isRequired,
  clearChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  openChat: PropTypes.func.isRequired,
  closeChat: PropTypes.func.isRequired,
  updateMessages: PropTypes.func.isRequired,
  redirectToFunc: PropTypes.func,
};

Chat.defaultProps = {
  chatId: 0,
  userId: 0,
  chatType: 'compressed',
  redirectToFunc: undefined,
};

const mapStateToProps = state => ({
  chats: state.chat.chats,
  currentChat: state.chat.currentChat,
  messages: state.chat.messages,
  user: state.user.data,
  friends: state.friends.friends,
  loading: state.chat.loading,
});

const mapDispatchToProps = dispatch => ({
  updateMessages: bindActionCreators(chatActions.updateMessages, dispatch),
  getPersonalChats: bindActionCreators(chatActions.getPersonalChats, dispatch),
  sendMessage: bindActionCreators(chatActions.sendMessage, dispatch),
  loadMessages: bindActionCreators(chatActions.loadMessages, dispatch),
  clearChat: bindActionCreators(chatActions.clearChat, dispatch),
  getFriends: bindActionCreators(friendsActions.getFriends, dispatch),
  createChat: bindActionCreators(chatActions.createChat, dispatch),
  openChat: bindActionCreators(chatActions.openChat, dispatch),
  closeChat: bindActionCreators(chatActions.closeChat, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
