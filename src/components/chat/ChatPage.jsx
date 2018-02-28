import React from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

const ChatPage = (props) => {
  const redirectToFunc = url => props.history.push(url);
  const chatId = props.match.params.id;
  return (
    <div className="container">
      <div className="row py-3 justify-content-center">
        <div className="col-10">
          <Chat chatId={chatId} redirectToFunc={redirectToFunc} chatType="full" />
        </div>
      </div>
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
