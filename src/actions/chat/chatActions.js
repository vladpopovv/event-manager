import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';

const {
  getPersonalChatsUrl,
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
};

export default chatActions;
