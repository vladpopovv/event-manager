import CONSTANTS from './../constants/actionConstants';

const initialState = {
  friends: [],
  followers: [],
  foundUsers: [],
  loading: {
    sendRequestLoading: [],
    addToFriendsLoading: [],
    deleteFriendsLoading: [],
    deleteRequestsLoading: [],
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.FRIENDS_GET_FRIENDS_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          getFriendsLoading: true,
        },
        error: '',
      };
    case CONSTANTS.FRIENDS_GET_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          getFriendsLoading: false,
        },
        friends: payload,
      };
    case CONSTANTS.FRIENDS_GET_FRIENDS_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          getFriendsLoading: false,
        },
        error: payload,
      };
    case CONSTANTS.FRIENDS_GET_REQUESTS_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          getRequestsLoading: true,
        },
        error: '',
      };
    case CONSTANTS.FRIENDS_GET_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          getRequestsLoading: false,
        },
        followers: payload,
      };
    case CONSTANTS.FRIENDS_GET_REQUESTS_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          getRequestsLoading: false,
        },
        error: payload,
      };
    case CONSTANTS.FRIENDS_DETELE_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteFriendsLoading: state.loading.deleteFriendsLoading.concat(payload),
        },
        error: '',
      };
    case CONSTANTS.FRIENDS_DELETE_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteFriendsLoading:
            state.loading.deleteFriendsLoading.filter(userItemId =>
              payload.id !== userItemId),
        },
      };
    case CONSTANTS.FRIENDS_DELETE_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteFriendsLoading:
            state.loading.deleteFriendsLoading.filter(userItemId =>
              payload.id !== userItemId),
        },
        error: payload.error,
      };
    case CONSTANTS.FRIENDS_DELETE_REQUEST_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteRequestsLoading: state.loading.deleteRequestsLoading.concat(payload),
        },
        error: '',
      };
    case CONSTANTS.FRIENDS_DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteRequestsLoading:
            state.loading.deleteRequestsLoading.filter(userItemId =>
              payload.id !== userItemId),
        },
      };
    case CONSTANTS.FRIENDS_DELETE_REQUEST_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteRequestsLoading:
            state.loading.deleteRequestsLoading.filter(userItemId =>
              payload.id !== userItemId),
        },
        error: payload.error,
      };
    case CONSTANTS.FRIENDS_SEARCH_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          searchLoading: true,
        },
      };
    case CONSTANTS.FRIENDS_SEARCH_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          searchLoading: false,
        },
        foundUsers: payload,
      };
    case CONSTANTS.FRIENDS_SEARCH_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          searchLoading: false,
        },
        error: payload,
      };
    case CONSTANTS.FRIENDS_SEND_REQUEST_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          sendRequestLoading: state.loading.sendRequestLoading.concat(payload),
        },
      };
    case CONSTANTS.FRIENDS_SEND_REQUEST_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          sendRequestLoading:
            state.loading.sendRequestLoading.filter(userItemId =>
              payload.id !== userItemId),
        },
      };
    case CONSTANTS.FRIENDS_SEND_REQUEST_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          sendRequestLoading:
            state.loading.sendRequestLoading.filter(userItemId =>
              payload.id !== userItemId),
        },
        error: payload.error,
      };
    case CONSTANTS.FRIENDS_ADD_REQUESTING:
      return {
        ...state,
        loading: {
          ...state.loading,
          addToFriendsLoading: state.loading.addToFriendsLoading.concat(payload),
        },
      };
    case CONSTANTS.FRIENDS_ADD_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          addToFriendsLoading:
            state.loading.addToFriendsLoading.filter(userItemId =>
              payload.id !== userItemId),
        },
      };
    case CONSTANTS.FRIENDS_ADD_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          addToFriendsLoading:
            state.loading.addToFriendsLoading.filter(userItemId =>
              payload.id !== userItemId),
        },
        error: payload.error,
      };
    default:
      return state;
  }
};
