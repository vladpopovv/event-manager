import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DialogsList from './dialogsList/DialogsList';
import Dialog from './dialog/Dialog';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatDialog: {
        id: 1,
        login: 'vvasechkin@gmail.com',
        firstname: 'Vasya',
        lastname: 'Vasechkin',
      },
    };
  }

  render() {
    return (
      <div className="border rounded">
        <div className="p-2">
          Chat
          {this.state.chatDialog.id
            ? <Dialog friend={this.state.chatDialog} />
            : <DialogsList friends={this.props.friends} />
          }
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  friends: state.chat.friends, // TODO change chat to friends
  messages: state.chat.messages,
});

export default connect(mapStateToProps)(Chat);
