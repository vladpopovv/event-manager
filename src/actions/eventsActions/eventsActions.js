import CONSTANTS from './../../constants/actionConstants';
import APICONSTANTS from './../../constants/apiConstants';
import notificationActions from './../notification/notificationActions';

const sortEvents = events => (
  events.sort((firstEvent, secondEvent) => {
    const firstStartDay = new Date(firstEvent.fromDate);
    const secondStartDay = new Date(secondEvent.fromDate);
    if (firstStartDay > secondStartDay) return 1;
    if (firstStartDay < secondStartDay) return -1;
    return 0;
  })
);

const {
  addNewEventUrl,
  getEventsOfRangeUrl,
} = APICONSTANTS;

const eventActions = {
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
            payload: json.data,
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

  getEventsOfRange(startDate, endDate) {
    return (dispatch) => {
      dispatch({ type: CONSTANTS.EVENT_GET_RANGE_REQUESTING });
      return fetch(`${getEventsOfRangeUrl}?from_date=${startDate}&to_date=${endDate}`)
        .then(json => dispatch({
          type: CONSTANTS.EVENT_GET_RANGE_SUCCESS,
          payload: sortEvents(json.data),
        }))
        .catch((error) => {
          dispatch(notificationActions.addNew('danger', 'Request error', error.message));
          return dispatch({
            type: CONSTANTS.EVENT_GET_RANGE_ERROR,
            payload: { error: error.message },
          });
        });
    };
  },
};

export default eventActions;
