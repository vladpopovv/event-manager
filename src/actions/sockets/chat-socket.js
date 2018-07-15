import io from 'socket.io-client';
import authToken from './../authorization/authToken';
import APICONSTANTS from './../../constants/apiConstants';
import chatActions from './../chat/chatActions';

let socket;

const chatSocket = {
  connect() {
    const token = authToken.getToken();
    socket = io.connect(APICONSTANTS.chatSocketNamespace);

    socket.on('connect', () => {
      socket.emit('authentication', { token });
    });

    socket.on('message', messageData => chatActions.takeNewMessage(messageData));
  },

  joinChat(chatId) {
    socket.emit('join_chat', chatId);
  },

  sendMessage(message, chatId) {
    socket.emit('message', { message, chatId });
  },
};

export default chatSocket;
