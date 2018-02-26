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
      chatDialog: {},
    };

    this.openDialogHandler = this.openDialogHandler.bind(this);
    this.closeDialogHandler = this.closeDialogHandler.bind(this);
  }

  componentDidMount() {
    this.props.getFriends();
    this.props.getPersonalChats();
  }

  componentWillUnmount() {
    this.props.clearChat();
  }

  openDialogHandler(friends) {
    this.setState({
      chatDialog: friends,
    });
  }

  closeDialogHandler() {
    this.setState({
      chatDialog: {},
    });
  }
  render() {
    const { chatDialog } = this.state;
    const chats = ChatUtility.setNameToChats(this.props.chats);
    return (
      <div className="border rounded">
        <div className="p-2">
          <i className="fa fa-comments-o" />Chat
          {chatDialog.id
            ? <Dialog
              chat={chatDialog}
              messages={this.props.messages[chatDialog.id]}
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
  chats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}).isRequired,
  messages: PropTypes.shape({}).isRequired,
  getPersonalChats: PropTypes.func.isRequired,
  clearChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  getFriends: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  chats: state.chat.chats,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
