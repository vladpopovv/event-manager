import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputField from './../shared/InputField';
import FormButton from './../shared/FormButton';
import {
  required as requiredValidate,
  email as emailValidate,
  minLength5 as minLength5Validate,
  passwordEquality as passwordEqualityValidate,
} from './../shared/validationForm';
import AuthContainer from './../../containers/AuthContainer';

class SingUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
      anyTouched,
    } = this.props;
    return (
      <AuthContainer title="Sing up">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <Field
              component={InputField}
              type="email"
              name="email"
              label="Email"
              validate={[requiredValidate, emailValidate]}
            />
            <Field
              component={InputField}
              name="firstName"
              label="First Name"
              validate={[requiredValidate]}
            />
            <Field
              component={InputField}
              name="lastName"
              label="Last Name"
              validate={[requiredValidate]}
            />
            <Field
              component={InputField}
              name="nickName"
              label="Nick Name"
              validate={[requiredValidate]}
            />
            <Field
              type="password"
              component={InputField}
              name="password"
              label="Password"
              validate={[requiredValidate, minLength5Validate]}
            />
            <Field
              type="password"
              component={InputField}
              name="passwordRepeat"
              label="Repeat password"
              validate={[requiredValidate, passwordEqualityValidate]}
            />
            <FormButton
              type="submit"
              text="Sing up"
              buttonType="primary"
              buttonFloat="right"
              disabled={anyTouched && (invalid || submitting)}
            />
          </form>
        </div>
        <div className="card-footer">
          <h5>Have an account?</h5>
          <Link href="/login" to="/login">Sing in</Link>
        </div>
      </AuthContainer>
    );
  }
}

SingUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  anyTouched: PropTypes.bool,
};

SingUpForm.defaultProps = {
  submitting: true,
  invalid: false,
  anyTouched: true,
};

export default reduxForm({
  form: 'singup',
})(SingUpForm);
