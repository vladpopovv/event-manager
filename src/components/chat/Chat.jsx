import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialogs from './dialogs/Dialogs';
import Dialog from './dialog/dialog/Dialog';
import ChatUtility from './../../utility/chatUtility';
import chatActions from './../../actions/chat/chatActions';
import friendsActions from './../../actions/friends/friendsActions';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.openDialogHandler = this.openDialogHandler.bind(this);
    this.closeDialogHandler = this.closeDialogHandler.bind(this);
  }

  componentDidMount() {
    this.props.getFriends();
    this.props.getPersonalChats()
      .then(() => {
        if (this.props.chatId) {
          console.log('GET CHAT ID', this.props);
          this.props.openChatById(this.props.chatId);
        }
      });
  }

  componentWillUnmount() {
    this.props.clearChat();
  }

  openDialogHandler(chat) {
    if (this.props.redirectToFunc) {
      this.props.redirectToFunc(`/chats/${chat.id}`);
    }
    return this.props.openChat(chat);
  }

  closeDialogHandler(chat) {
    if (this.props.redirectToFunc) {
      this.props.redirectToFunc('/chats');
    }
    return this.props.closeChat(chat);
  }

  render() {
    const { currentChats, loading } = this.props;
    const chats = ChatUtility.setNameToChats(this.props.chats);
    const currentChat = currentChats[0];
    return (
      <div className="border rounded">
        <div className="p-2">
          <i className="fa fa-comments-o" />Chat
          {currentChats.length > 0
            ? <Dialog
              loading={loading.loadMessages.indexOf(currentChat.id) !== -1}
              chat={currentChat}
              messages={this.props.messages[currentChat.id]}
              closeDialogHandler={this.closeDialogHandler}
              user={this.props.user}
              sendMessageHandler={this.props.sendMessage}
              loadMessagesHandler={this.props.loadMessages}
            />
            : <Dialogs
              friends={this.props.friends}
              chats={chats}
              openDialogHandler={this.openDialogHandler}
              createDialogHandler={this.props.createChat}
            />
          }
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  chatType: PropTypes.string,
  chats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  chatId: PropTypes.string,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}).isRequired,
  currentChats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  messages: PropTypes.shape({}).isRequired,
  loading: PropTypes.shape({}).isRequired,
  getPersonalChats: PropTypes.func.isRequired,
  clearChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  openChat: PropTypes.func.isRequired,
  openChatById: PropTypes.func.isRequired,
  closeChat: PropTypes.func.isRequired,
  redirectToFunc: PropTypes.func,
};

Chat.defaultProps = {
  chatId: '',
  chatType: 'small',
  redirectToFunc: undefined,
};

const mapStateToProps = state => ({
  chats: state.chat.chats,
  currentChats: state.chat.currentChats,
  messages: state.chat.messages,
  user: state.user.data,
  friends: state.friends.friends,
  loading: state.chat.loading,
});

const mapDispatchToProps = dispatch => ({
  getPersonalChats: bindActionCreators(chatActions.getPersonalChats, dispatch),
  sendMessage: bindActionCreators(chatActions.sendMessage, dispatch),
  loadMessages: bindActionCreators(chatActions.loadMessages, dispatch),
  clearChat: bindActionCreators(chatActions.clearChat, dispatch),
  getFriends: bindActionCreators(friendsActions.getFriends, dispatch),
  createChat: bindActionCreators(chatActions.createChat, dispatch),
  openChat: bindActionCreators(chatActions.openChat, dispatch),
  openChatById: bindActionCreators(chatActions.openChatById, dispatch),
  closeChat: bindActionCreators(chatActions.closeChat, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
