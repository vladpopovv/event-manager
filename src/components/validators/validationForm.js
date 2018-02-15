import Moment from 'moment';

const validators = {
  required: value => (value ? '' : 'Required'),

  email: value => (
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : ''),

  minLength: (min, value) =>
    (value && value.length < min ? `Must be ${min} characters or more` : ''),

  minLength5: value => (validators.minLength(5, value)),

  passwordEquality: (value, allValues) =>
    (value !== allValues.password
      ? 'Passwords do not match'
      : ''),

  dateSequence: (value, allValues) => (
    Moment(allValues.fromDate).isAfter(Moment(value))
      ? 'The dates are in the wrong sequence'
      : ''),
};

export default validators;
