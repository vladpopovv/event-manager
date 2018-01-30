import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputField from './../shared/InputField';
import FormButton from './../shared/FormButton';
import validate from './loginFormValidation';
import AuthContainer from './../../containers/AuthContainer';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <AuthContainer title="Login">
        <form className="card-body" onSubmit={handleSubmit} noValidate>
          <Field
            component={InputField}
            type="email"
            name="email"
            label="Email"
          />
          <Field
            component={InputField}
            type="password"
            name="password"
            label="Password"
          />

          <FormButton
            type="submit"
            text="Login"
            buttonType="primary"
            buttonFloat="right"
            disabled={submitting}
          />
        </form>
        <div className="card-footer">
          <h5>Don`t you have account yet?</h5>
          <Link href="/singup" to="/singup">Sing up</Link>
        </div>
      </AuthContainer>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

LoginForm.defaultProps = {
  submitting: true,
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
