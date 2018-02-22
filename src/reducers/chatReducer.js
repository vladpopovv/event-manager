import CONSTANTS from './../constants/actionConstants';

const initialState = {
  chats: [],
  loading: {
    getChats: false,
  },
  messages: [],
  friends: [
    {
      id: 1,
      login: 'vvasechkin@gmail.com',
      firstname: 'Vasya',
      lastname: 'Vasechkin',
    },
    {
      id: 47,
      login: 'lvigtor@gmail.com',
      firstname: 'Виктор',
      lastname: 'Лавров',
    },
    {
      id: 78,
      login: 'xs@xs.com',
      firstname: 'Xs',
      lastname: 'Xs',
    },
  ], // TODO delete
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
    case CONSTANTS.CHAT_GET_PERSONAL_CHATS_SUCCESS:
      return {
        ...state,
        chats: payload,
        loading: {
          ...state.loading,
          getChats: false,
        },
      };
    case CONSTANTS.CHAT_GET_PERSONAL_CHATS_ERROR:
      return {
        ...state,
        chats: payload,
        loading: {
          ...state.loading,
          getChats: false,
        },
      };
    default:
      return state;
  }
};
