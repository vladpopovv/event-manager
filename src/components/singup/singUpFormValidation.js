const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.nickName) {
    errors.nickName = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 5) {
    errors.password = 'Minimum password length is 5 characters';
  }

  if (!values.passwordRepeat) {
    errors.passwordRepeat = 'Required';
  } else if (values.password !== values.passwordRepeat) {
    errors.passwordRepeat = 'Passwords do not match';
  }

  return errors;
};

export default validate;
