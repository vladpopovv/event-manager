import React from 'react';
import PropTypes from 'prop-types';
import './inputMessageStyle.less';

const InputMessage = (props) => {
  const onSubmitMessage = (e) => {
    e.preventDefault();
    props.sendMessageHandler();
  };

  const onPressKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && props.textMessage.trim()) {
      onSubmitMessage(e);
    }
  };
  const changeMessageHandler = e => props.changeMessageHandler(e.target.value);
  return (
    <form className="p-2">
      <div className="input-group">
        <textarea
          className="form-control input_message"
          onChange={changeMessageHandler}
          name="message"
          onKeyPress={onPressKey}
          value={props.textMessage}
        />
        <button
          className="btn btn-dark input-group-append"
          type="button"
          disabled={!props.textMessage.trim()}
          onClick={props.sendMessageHandler}
        >
          Send
        </button>
      </div>
    </form>
  );
};

InputMessage.propTypes = {
  textMessage: PropTypes.string.isRequired,
  sendMessageHandler: PropTypes.func.isRequired,
  changeMessageHandler: PropTypes.func.isRequired,
};

export default InputMessage;
