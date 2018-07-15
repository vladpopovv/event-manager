import React from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';

const ChatPage = (props) => {
  const userId = new URLSearchParams(props.location.search).get('userId');
  const redirectToFunc = url => props.history.push(url);
  const chatId = props.match.params.id;
  return (
    <div className="container">
      <div className="row py-3 justify-content-center">
        <div className="col-12">
          <Chat
            chatId={chatId}
            redirectToFunc={redirectToFunc}
            chatType="full"
            userId={userId}
          />
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
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
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
