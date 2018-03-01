import CONSTANTS from './../constants/actionConstants';
import ChatUtility from './../utility/chatUtility';

const initialState = {
  chats: [],
  currentChat: 0,
  loading: {
    getChats: false,
    loadMessages: [],
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
        messages[chat.id] = chat.lastMessages;
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
          loadMessages: state.loading.loadMessages.concat(payload),
        },
      };
    case CONSTANTS.CHAT_LOAD_MESSAGES_SUCCESS: {
      const { messages, chats } = state;
      // const chatsArray = state.chats;
      const indexChat = chats.findIndex(chat => chat.id === payload.chatId);
      const currentChat = chats[indexChat];
      chats[indexChat] = {
        ...currentChat,
        isFullDialog: payload.messages.length === 0,
      };
      const currentMessages = messages[payload.chatId] ? messages[payload.chatId] : [];
      messages[payload.chatId] =
        ChatUtility.getUniqueMessages(currentMessages.concat(payload.messages));
      return {
        ...state,
        chats,
        messages: {
          ...messages,
        },
        loading: {
          ...state.loading,
          loadMessages: state.loading.loadMessages.filter(chatId => chatId !== payload.chatId),
        },
      };
    }
    case CONSTANTS.CHAT_LOAD_MESSAGES_ERROR:
      return {
        ...state,
        error: payload,
        loading: {
          ...state.loading,
          loadMessages: state.loading.loadMessages.filter(chatId => chatId !== payload.chatId),
        },
      };
    case CONSTANTS.CHAT_UPDATE_ALL_MESSAGES_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          loadMessages: state.loading.loadMessages.concat(payload),
        },
      };
    case CONSTANTS.CHAT_UPDATE_ALL_MESSAGES_SUCCESS: {
      const { messages } = state;
      const currentMessages = messages[payload.chatId] ? messages[payload.chatId] : [];
      messages[payload.chatId] =
        ChatUtility.getUniqueMessages(currentMessages.concat(payload.messages));

      return {
        ...state,
        // currentChat: {
        //   ...state.currentChat,
        //   isFullDialog: payload.messages.length === 0,
        // },
        messages: {
          ...messages,
        },
        loading: {
          ...state.loading,
          loadMessages: state.loading.loadMessages.filter(chatId => chatId !== payload.chatId),
        },
      };
    }
    case CONSTANTS.CHAT_UPDATE_ALL_MESSAGES_ERROR:
      return {
        ...state,
        error: payload,
        loading: {
          ...state.loading,
          loadMessages: state.loading.loadMessages.filter(chatId => chatId !== payload.chatId),
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
      const index = indexChat >= 0 ? indexChat : chats.length - 1;
      const { messages } = state;
      chats[index] = payload;
      messages[payload.id] = [];
      return {
        ...state,
        chats,
        messages: {
          ...messages,
        },
        // currentChat: payload.id,
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
    case CONSTANTS.CHAT_OPEN_BY_ID: {
      // const chatById = state.chats.find(chat => chat.id === payload);
      return {
        ...state,
        currentChat: +payload,
      };
    }
    case CONSTANTS.CHAT_OPEN:
      return {
        ...state,
        currentChat: +payload,
      };
    case CONSTANTS.CHAT_CLOSE:
      return {
        ...state,
        currentChat: 0,
      };
    default:
      return state;
  }
};
