import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputField from './../shared/InputField';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const formName = 'login';
    const { handleSubmit } = this.props;
    return (
      <div className={classNames('jumbotron', 'col-8')}>
        <h1>Login</h1>
        <form className="border-bottom mb-3" onSubmit={handleSubmit}>
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
          <div className="mb-3 clearfix">
            <button type="submit" className={classNames('float-right', 'btn', 'btn-primary')}>
              Login
            </button>
          </div>
        </form>
        <div className="">
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
