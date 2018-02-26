import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialogs from './dialogs/Dialogs';
import Dialog from './dialog/Dialog';
import ChatUtility from './../../utility/chatUtility';
import chatActions from './../../actions/chat/chatActions';
import friendsActions from './../../actions/friends/friendsActions';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // chatDialog: {},
    };
  }

  componentDidMount() {
    this.props.getFriends();
    this.props.getPersonalChats();
  }

  componentWillUnmount() {
    this.props.clearChat();
  }

  render() {
    const { currentChats } = this.props;
    const chats = ChatUtility.setNameToChats(this.props.chats);
    return (
      <div className="border rounded">
        <div className="p-2">
          <i className="fa fa-comments-o" />Chat
          {currentChats.length > 0
            ? <Dialog
              chat={currentChats[0]}
              messages={this.props.messages[currentChats[0].id]}
              closeDialogHandler={this.props.closeChat}
              user={this.props.user}
              sendMessageHandler={this.props.sendMessage}
              loadMessagesHandler={this.props.loadMessages}
            />
            : <Dialogs
              friends={this.props.friends}
              chats={chats}
              openDialogHandler={this.props.openChat}
              createDialogHandler={this.props.createChat}
            />
          }
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}).isRequired,
  currentChats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  messages: PropTypes.shape({}).isRequired,
  getPersonalChats: PropTypes.func.isRequired,
  clearChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  openChat: PropTypes.func.isRequired,
  closeChat: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  chats: state.chat.chats,
  currentChats: state.chat.currentChats,
  messages: state.chat.messages,
  user: state.user.data,
  friends: state.friends.friends,
});

const mapDispatchToProps = dispatch => ({
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
