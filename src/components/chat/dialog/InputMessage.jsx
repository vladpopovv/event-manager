import React from 'react';

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
      <form>
        <textarea onChange={this.onChangeMessageText} name="message" id="" cols="30" rows="10">
          {this.state.messageText}
        </textarea>
        <button>
          Send
        </button>
      </form>
    );
  }
}
