import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
// reduxForm

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="loginEmail">
              Email
              <Field id="loginEmail" name="email" component="input" type="email" />
            </label>
          </div>
          <div>
            <label htmlFor="loginPassword">
              Password
              <Field id="loginPassword" name="password" component="input" type="password" />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
})(LoginForm);

// export default LoginForm;
