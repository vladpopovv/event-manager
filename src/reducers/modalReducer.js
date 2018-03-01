import CONSTANTS from './../constants/actionConstants';

const initialState = {
  modals: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.MODAL_ADD_NEW: {
      return {
        ...state,
        modals: state.modals.concat(payload),
      };
    }
    case CONSTANTS.MODAL_DELETE:
      return {
        ...state,
        modals: state.modals.filter((modal, i) => i !== 0),
      };
    default:
      return state;
  }
};
