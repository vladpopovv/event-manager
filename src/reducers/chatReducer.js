import CONSTANTS from './../constants/actionConstants';

const initialState = {
  chats: [],
  currentChat: {},
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
      messages[payload.chatId] = Array.of(payload.message).concat(messages[payload.chatId]);
      return {
        ...state,
        messages: {
          ...messages,
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
    case CONSTANTS.CHAT_LOAD_MESSAGES_SUCCESS: {
      const { messages } = state;
      const currentMessages = messages[payload.chatId] ? messages[payload.chatId] : [];
      messages[payload.chatId] = currentMessages.concat(payload.messages);
      return {
        ...state,
        messages: {
          ...messages,
        },
        loading: {
          ...state.loading,
          loadMessages: false,
        },
      };
    }
    case CONSTANTS.CHAT_LOAD_MESSAGES_ERROR:
      return {
        ...state,
        error: payload,
        loading: {
          ...state.loading,
          loadMessages: false,
        },
      };
    case CONSTANTS.CHAT_CLEAR:
      return {
        ...state,
        chats: [],
        messages: {},
      };
    case CONSTANTS.CHAT_CREATE_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          createChat: true,
        },
      };
    case CONSTANTS.CHAT_CREATE_SUCCESS: {
      const { chats } = state;
      const indexChat = chats.findIndex(chat => chat.id === payload.id);
      const index = indexChat >= 0 ? indexChat : chats.length;
      chats[index] = payload;
      return {
        ...state,
        chats,
        currentChat: payload,
        loading: {
          ...state.loading,
          createChat: false,
        },
      };
    }
    case CONSTANTS.CHAT_CREATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: {
          ...state.loading,
          createChat: false,
        },
      };
    default:
      return state;
  }
};
