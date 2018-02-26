import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';
import notificationActions from './../notification/notificationActions';

const {
  getPersonalChatsUrl,
  sendMessageUrl,
  loadMessagesUrl,
  createChatUrl,
} = APICONSTANTS;

const chatActions = {
  getPersonalChats() {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_GET_PERSONAL_CHATS_REQUESTING });
      return fetch(getPersonalChatsUrl)
        .then(json => dispatch({
          type: CONSTANTS.CHAT_GET_PERSONAL_CHATS_SUCCESS,
          payload: json.data,
        }))
        .catch(error => dispatch({
          type: CONSTANTS.CHAT_GET_PERSONAL_CHATS_ERROR,
          payload: error,
        }));
    };
  },

  createChat(user) {
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
        })
        .catch(error => dispatch({
          type: CONSTANTS.CHAT_CREATE_ERROR,
          payload: error,
        }));
    };
  },

  sendMessage(message, chatId, from) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_SEND_MESSAGE_REQUESTING });
      return fetch(sendMessageUrl, {
        method: 'POST',
        body: JSON.stringify({
          message,
          chatId,
        }),
      })
        .then(json => dispatch({
          type: CONSTANTS.CHAT_SEND_MESSAGE_SUCCESS,
          payload: {
            chatId,
            message: {
              ...json.data,
              from,
            },
          },
        }))
        .catch(error => dispatch({
          type: CONSTANTS.CHAT_SEND_MESSAGE_ERROR,
          payload: error,
        }));
    };
  },

  loadMessages(chatId, date = '') {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_LOAD_MESSAGES_REQUESTING });
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
            'Loading error',
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
