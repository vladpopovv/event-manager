import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputField from './../shared/InputField';
import FormButton from './../shared/FormButton';
import validate from './singUpFormValidation';
import AuthContainer from './../../containers/AuthContainer';

class SingUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <AuthContainer title="Sing up">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <Field
              component={InputField}
              type="email"
              name="email"
              label="Email"
            />
            <Field
              component={InputField}
              name="firstName"
              label="First Name"
            />
            <Field
              component={InputField}
              name="lastName"
              label="Last Name"
            />
            <Field
              component={InputField}
              name="nickName"
              label="Nick Name"
            />
            <Field
              type="password"
              component={InputField}
              name="password"
              label="Password"
            />
            <Field
              type="password"
              component={InputField}
              name="passwordRepeat"
              label="Repeat password"
            />
            <FormButton
              type="submit"
              text="Sing up"
              buttonType="primary"
              buttonFloat="right"
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
};

export default reduxForm({
  form: 'singup',
  validate,
})(SingUpForm);
