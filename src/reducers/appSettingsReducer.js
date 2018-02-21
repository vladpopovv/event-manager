import CONSTANTS from './../constants/actionConstants';

const initialState = {
  classes: ['layout'],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONSTANTS.APP_ADD_CLASS: {
      return {
        ...state,
        classes: state.classes.concat(payload),
      };
    }
    case CONSTANTS.APP_REMOVE_CLASS: {
      return {
        ...state,
        classes: state.classes.filter(className => className !== payload),
      };
    }
    default:
      return state;
  }
};
