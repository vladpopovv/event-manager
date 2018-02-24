import CONSTANTS from './../../constants/actionConstants';

export default {
  addNew(element) {
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.MODAL_ADD_NEW,
        payload: element,
      });
    };
  },
  delete() {
    return (dispatch) => {
      dispatch({
        type: CONSTANTS.MODAL_DELETE,
      });
    };
  },
};
