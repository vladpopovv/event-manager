import io from 'socket.io-client';
import authToken from './../authorization/authToken';
import APICONSTANTS from './../../constants/apiConstants';
import chatActions from './../chat/chatActions';

let socket;
let dispatch;

const chatSocket = {
  connect(dispatchHandler) {
    const token = authToken.getToken();
    socket = io.connect(APICONSTANTS.chatSocketNamespace);
    dispatch = dispatchHandler;

    socket.on('connect', () => {
      socket.emit('authentication', { token });
    });

    socket.on('message', messageData => dispatch(chatActions.takeNewMessage(messageData)));
  },

  joinChat(chatId) {
    socket.emit('join_chat', chatId);
  },

  sendMessage(message, chatId) {
    socket.emit('message', { message, chatId });
  },
};

export default chatSocket;
