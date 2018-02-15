import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';
import notificationActions from './../notification/notificationActions';

const {
  addNewEventUrl,
} = APICONSTANTS;

const eventAction = {
  addNewEvent(eventData) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.EVENT_ADD_REQUESTING });
      return fetch(addNewEventUrl, {
        method: 'POST',
        body: JSON.stringify(eventData),
      })
        .then((json) => {
          dispatch(notificationActions.addNew(
            'info',
            'Success',
            `${eventData.title} successfully created`,
          ));
          return dispatch({
            type: CONSTANTS.EVENT_ADD_SUCCESS,
            payload: { data: json.data },
          });
        })
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.EVENT_ADD_ERROR,
            payload: { error: error.message },
          });
        });
    };
  },
};

export default eventAction;
