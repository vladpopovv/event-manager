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
        <textarea className="input_message" onChange={this.onChangeMessageText} name="message">
          {this.state.messageText}
        </textarea>
        <button>
          Send
        </button>
      </form>
    );
  }
}
