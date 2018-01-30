import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputField from './../shared/InputField';
import FormButton from './../shared/FormButton';
import AuthContainer from './../../containers/AuthContainer';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const formName = 'login';
    const { handleSubmit } = this.props;
    return (
      <AuthContainer title="Login">
        <form className="card-body" onSubmit={handleSubmit} noValidate>
          <InputField
            type="email"
            name="email"
            form={formName}
            label="Email"
          />
          <InputField
            type="password"
            name="password"
            form={formName}
            label="Password"
          />
          <FormButton
            type="submit"
            text="Login"
            buttonType="primary"
            buttonFloat="right"
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
};

export default reduxForm({
  form: 'login',
})(LoginForm);
