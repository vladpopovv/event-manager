import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import InputField from './../shared/InputField';
import FormButton from './../shared/FormButton';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const formName = 'login';
    const wrapperClasses = classNames('jumbotron', 'col-5');
    const { handleSubmit } = this.props;
    return (
      <div className={wrapperClasses}>
        <h1>Login</h1>
        <form className="border-bottom mb-3" onSubmit={handleSubmit} noValidate>
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
