import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputField from './../shared/InputField';
import FormButton from './../shared/FormButton';
import AuthContainer from './../../containers/AuthContainer';

class SingUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { handleSubmit } = this.props;
    const formName = 'singUp';
    return (
      <AuthContainer title="Sing up">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <InputField
              type="email"
              name="email"
              form={formName}
              label="Email"
            />
            <InputField
              name="firstName"
              form={formName}
              label="First Name"
            />
            <InputField
              name="lastName"
              form={formName}
              label="Last Name"
            />
            <InputField
              name="nickName"
              form={formName}
              label="Nick Name"
            />
            <InputField
              type="password"
              name="password"
              form={formName}
              label="Password"
            />
            <InputField
              type="password"
              name="passwordRepeat"
              form={formName}
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
})(SingUpForm);
