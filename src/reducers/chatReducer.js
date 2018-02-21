// import CONSTANTS from './../constants/actionConstants';

const initialState = {
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

export default (state = initialState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
