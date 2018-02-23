import CONSTANTS from './../constants/actionConstants';

const initialState = {
  chats: [],
  loading: {
    getChats: false,
  },
  messages: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.CHAT_GET_PERSONAL_CHATS_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          getChats: true,
        },
      };
    case CONSTANTS.CHAT_GET_PERSONAL_CHATS_SUCCESS: {
      const { messages } = state;
      payload.forEach((chat) => {
        const oldMessages = state.messages[chat.id] ? state.messages[chat.id] : [];
        messages[chat.id] = oldMessages.concat(chat.lastMessages);
      });
      return {
        ...state,
        chats: payload,
        messages,
        loading: {
          ...state.loading,
          getChats: false,
        },
      };
    }
    case CONSTANTS.CHAT_GET_PERSONAL_CHATS_ERROR:
      return {
        ...state,
        error: payload,
        loading: {
          ...state.loading,
          getChats: false,
        },
      };
    case CONSTANTS.CHAT_SEND_MESSAGE_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          sendMessage: true,
        },
      };
    case CONSTANTS.CHAT_SEND_MESSAGE_SUCCESS: {
      const { messages } = state;

      return {
        ...state,
        messages: {
          ...state.messages,
          ...messages[payload.chatId].unshift(payload.message),
        },
        loading: {
          ...state.loading,
          sendMessage: false,
        },
      };
    }
    case CONSTANTS.CHAT_SEND_MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: {
          ...state.loading,
          sendMessage: false,
        },
      };
    case CONSTANTS.CHAT_LOAD_MESSAGES_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadMessages: true,
        },
      };
    case CONSTANTS.CHAT_LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          ...state.messages[payload.chatId].push(payload.message),
        },
        loading: {
          ...state.loading,
          loadMessages: false,
        },
      };
    case CONSTANTS.CHAT_LOAD_MESSAGES_ERROR:
      return {
        ...state,
        error: payload,
        loading: {
          ...state.loading,
          loadMessages: false,
        },
      };
    default:
      return state;
  }
};
