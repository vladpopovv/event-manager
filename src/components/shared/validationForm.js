export const required = value => (value ? undefined : 'Required');

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);

const minLength = min => value =>
  (value && value.length < min ? `Must be ${min} characters or more` : undefined);

export const minLength5 = minLength(5);

export const passwordEquality = (value, allValues) =>
  (value !== allValues.password
    ? 'Passwords do not match'
    : undefined);
