import React from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

const ChatPage = (props) => {
  const redirectToFunc = url => props.history.push(url);
  const chatId = props.match.params.id;
  return (
    <div>
      <Chat chatId={chatId} redirectToFunc={redirectToFunc} />
    </div>
  );
};

ChatPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

ChatPage.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

export default ChatPage;
