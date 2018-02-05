// import CONSTANTS from './../constants/constants';

const initialState = {
  friends: [{
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  },
  {
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  },
  {
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  },
  {
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  },
  {
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  },
  {
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  },
  ],
  followers: [{
    firstname: 'Vova',
    lastname: 'Ivanov',
    id: 1,
  }],
};

export default (state = initialState, { type, payload }) => {
  console.log(payload);
  switch (type) {
    default:
      return state;
  }
};
