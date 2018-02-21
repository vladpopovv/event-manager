import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DialogsList from './dialogsList/DialogsList';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="border rounded">
        <div className="p-2">
          Chat
          <DialogsList friends={this.props.friends} />
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
