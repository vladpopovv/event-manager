import React from 'react';
import './inputMessageStyle.less';

export default class InputMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: '',
    };

    this.onChangeMessageText = this.onChangeMessageText.bind(this);
  }

  onChangeMessageText(e) {
    const messageText = e.target.value;

    this.setState({
      messageText,
    });
  }

  render() {
    return (
      <form className="p-2">
        <div className="input-group">
          <textarea
            className="form-control input_message"
            onChange={this.onChangeMessageText}
            name="message"
          >
            {this.state.messageText}
          </textarea>
          <button className="btn btn-dark input-group-append">
            Send
          </button>
        </div>
      </form>
    );
  }
}
