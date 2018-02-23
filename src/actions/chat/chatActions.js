import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';

const {
  getPersonalChatsUrl,
  sendMessageUrl,
} = APICONSTANTS;

const chatActions = {
  getPersonalChats() {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_GET_PERSONAL_CHATS_REQUESTING });
      return fetch(getPersonalChatsUrl)
        .then(response => response.json()) // delete after merge
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
  sendMessage(message, chatId, from) {
    console.log('chatId', chatId);
    return (dispatch) => {
      dispatch({ type: CONSTANTS.CHAT_SEND_MESSAGE_REQUESTING });
      return fetch(sendMessageUrl, {
        method: 'POST',
        body: JSON.stringify({
          message,
          chatId,
        }),
      })
        .then(response => response.json()) // delete after merge
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
};

export default chatActions;
