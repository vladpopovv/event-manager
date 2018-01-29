import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className={classNames('jumbotron', 'col-8')}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={classNames('form-group')}>
            <label htmlFor="loginEmail" className={classNames('col-12 p-0')}>
              Email
              <Field
                className={classNames('form-control')}
                id="loginEmail"
                name="email"
                component="input"
                type="email"
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="loginPassword" className={classNames('col-12 p-0')}>
              Password
              <Field
                className={classNames('form-control')}
                id="loginPassword"
                name="password"
                component="input"
                type="password"
              />
            </label>
          </div>
          <div className="mb-3 clearfix">
            <button type="submit" className={classNames('float-right', 'btn', 'btn-primary')}>
              Login
            </button>
          </div>
        </form>
        <div>
          <h5>Don`t you have account yet?</h5>
          <Link href="/singup" to="/singup">Sing up</Link>
        </div>
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
