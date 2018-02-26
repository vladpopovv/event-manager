import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DialogsList from './dialogsList/DialogsList';
import Dialog from './dialog/Dialog';
import chatActions from './../../actions/chat/chatActions';

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
            : <DialogsList
              chats={this.props.chats}
              openDialogHandler={this.openDialogHandler}
            />
          }
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}).isRequired,
  messages: PropTypes.shape({}).isRequired,
  getPersonalChats: PropTypes.func.isRequired,
  clearChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  chats: state.chat.chats,
  messages: state.chat.messages,
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  getPersonalChats: bindActionCreators(chatActions.getPersonalChats, dispatch),
  sendMessage: bindActionCreators(chatActions.sendMessage, dispatch),
  loadMessages: bindActionCreators(chatActions.loadMessages, dispatch),
  clearChat: bindActionCreators(chatActions.clearChat, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
