import React from 'react';
import PropTypes from 'prop-types';
import './inputMessageStyle.less';

export default class InputMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: '',
    };

    this.onChangeMessageText = this.onChangeMessageText.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.onPressKey = this.onPressKey.bind(this);
  }

  onChangeMessageText(e) {
    const messageText = e.target.value.trim();

    this.setState({
      messageText,
    });
  }

  onPressKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.onSubmitMessage(e);
    }
  }

  onSubmitMessage(e) {
    e.preventDefault();
    this.props.sendMessageHandler(this.state.messageText);
    this.setState({
      messageText: '',
    });
  }

  render() {
    return (
      <form className="p-2">
        <div className="input-group">
          <textarea
            value={this.state.messageText}
            className="form-control input_message"
            onChange={this.onChangeMessageText}
            name="message"
            onKeyPress={this.onPressKey}
          />
          <button
            disabled={!this.state.messageText}
            className="btn btn-dark input-group-append"
            onClick={this.onSubmitMessage}
          >
            Send
          </button>
        </div>
      </form>
    );
  }
}

InputMessage.propTypes = {
  sendMessageHandler: PropTypes.func.isRequired,
};
