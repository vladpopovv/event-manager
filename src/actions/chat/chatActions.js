import uuidv4 from 'uuid/v4';
import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';
import chatSocket from './../sockets/chatSocket';
import notificationActions from './../notification/notificationActions';

const {
  getPersonalChatsUrl,
  sendMessageUrl,
  loadMessagesUrl,
  createChatUrl,
} = APICONSTANTS;

const chatActions = {
  getPersonalChats(currentChatId) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_GET_PERSONAL_CHATS_REQUESTING });
      return fetch(getPersonalChatsUrl)
        .then((json) => {
          dispatch({
            type: CONSTANTS.CHAT_GET_PERSONAL_CHATS_SUCCESS,
            payload: json.data,
          });
          json.data.forEach(chat => chatSocket.joinChat(chat.id));
          if (currentChatId) {
            dispatch(chatActions.openChatById(currentChatId));
          }
        })
        .catch(error => dispatch({
          type: CONSTANTS.CHAT_GET_PERSONAL_CHATS_ERROR,
          payload: error,
        }));
    };
  },

  createChat(user, pushUrlHandler) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_CREATE_REQUESTING });
      return fetch(`${createChatUrl}/${user.id}`, {
        method: 'PUT',
      })
        .then((json) => {
          dispatch(chatActions.loadMessages(json.data.id));
          dispatch({
            type: CONSTANTS.CHAT_CREATE_SUCCESS,
            payload: {
              ...json.data,
              participants: [user],
            },
          });
          if (pushUrlHandler) {
            pushUrlHandler(`/chats/${json.data.id}`);
          }

          dispatch(chatActions.openChat(json.data.id));
        })
        .catch(error => dispatch({
          type: CONSTANTS.CHAT_CREATE_ERROR,
          payload: error,
        }));
    };
  },

  openChat(chatId) {
    return dispatch => dispatch({
      type: CONSTANTS.CHAT_OPEN,
      payload: chatId,
    });
  },

  openChatById(chatId) {
    return dispatch => dispatch({
      type: CONSTANTS.CHAT_OPEN_BY_ID,
      payload: chatId,
    });
  },

  closeChat(chat) {
    return dispatch => dispatch({
      type: CONSTANTS.CHAT_CLOSE,
      payload: chat,
    });
  },

  // TODO: add dispatch change store on send message
  sendMessage(message, chatId, from) {
    return (dispatch) => {
      const messageId = uuidv4();
      chatSocket.sendMessage(message, chatId)
        .then(json => dispatch({
          type: CONSTANTS.CHAT_SEND_MESSAGE_SUCCESS,
          payload: {
            chatId,
            message: {
              ...json.data,
              id: messageId,
              from,
            },
          },
        }))
        .catch(error => dispatch({
          type: CONSTANTS.CHAT_SEND_MESSAGE_ERROR,
          payload: error,
        }));
    // dispatch({ type: CONSTANTS.CHAT_SEND_MESSAGE_REQUESTING });
    //   return fetch(sendMessageUrl, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       message,
    //       chatId,
    //     }),
    //   })
    };
  },

  loadMessages(chatId, date = '') {
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.CHAT_LOAD_MESSAGES_REQUESTING,
        payload: chatId,
      });
      return fetch(`${loadMessagesUrl}?chatId=${chatId}&date=${date}&limit=20`)
        .then(json => dispatch({
          type: CONSTANTS.CHAT_LOAD_MESSAGES_SUCCESS,
          payload: {
            chatId,
            messages: json.data,
          },
        }))
        .catch((error) => {
          dispatch({
            type: CONSTANTS.CHAT_LOAD_MESSAGES_ERROR,
            payload: error,
          });
          return dispatch(notificationActions.addNew(
            'danger',
            'Loading error',
            'Loading messages error',
          ));
        });
    };
  },

  takeNewMessage(message) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_TAKE_NEW_MESSAGE, payload: { message } });
    };
  },

  updateMessages(chatId) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_UPDATE_ALL_MESSAGES_REQUESTING });
      return fetch(`${loadMessagesUrl}?chatId=${chatId}&limit=20`)
        .then(json => dispatch({
          type: CONSTANTS.CHAT_UPDATE_ALL_MESSAGES_SUCCESS,
          payload: {
            chatId,
            messages: json.data,
          },
        }))
        .catch((error) => {
          dispatch({
            type: CONSTANTS.CHAT_UPDATE_ALL_MESSAGES_ERROR,
            payload: error,
          });
          return dispatch(notificationActions.addNew(
            'danger',
            'Loading error',
            'Chat loading error',
          ));
        });
    };
  },

  clearChat() {
    return dispatch => dispatch({
      type: CONSTANTS.CHAT_CLEAR,
    });
  },
};

export default chatActions;
