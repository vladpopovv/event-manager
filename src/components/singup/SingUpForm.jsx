import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class SingUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className={classNames('jumbotron', 'col-8')}>
        <h1>Sing up</h1>
        <form className="border-bottom mb-3" onSubmit={handleSubmit}>
          <div className={classNames('form-group')}>
            <label htmlFor="singUpEmail" className={classNames('col-12 p-0')}>
              Email
              <Field
                className={classNames('form-control')}
                id="singUpEmail"
                name="email"
                component="input"
                type="email"
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="singUpFirstName" className={classNames('col-12 p-0')}>
              First name
              <Field
                className={classNames('form-control')}
                id="singUpFirstName"
                name="firstName"
                component="input"
                type="text"
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="singUpLastName" className={classNames('col-12 p-0')}>
              Last name
              <Field
                className={classNames('form-control')}
                id="singUpLastName"
                name="lastName"
                component="input"
                type="text"
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="singUpNick" className={classNames('col-12 p-0')}>
              Nick name
              <Field
                className={classNames('form-control')}
                id="singUpNick"
                name="nickName"
                component="input"
                type="text"
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="singUpPassword" className={classNames('col-12 p-0')}>
              Password
              <Field
                className={classNames('form-control')}
                id="singUpPassword"
                name="password"
                component="input"
                type="password"
              />
            </label>
          </div>
          <div className={classNames('form-group')}>
            <label htmlFor="singUpRepeatPassword" className={classNames('col-12 p-0')}>
              Repeat password
              <Field
                className={classNames('form-control')}
                id="singUpRepeatPassword"
                name="password"
                component="input"
                type="password"
              />
            </label>
          </div>
          <div className="mb-3 clearfix">
            <button type="submit" className={classNames('float-right', 'btn', 'btn-primary')}>
              Sing up
            </button>
          </div>
        </form>
        <div className="">
          <h5>Have an account?</h5>
          <Link href="/login" to="/login">Sing in</Link>
        </div>
      </div>
    );
  }
}

SingUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'singup',
})(SingUpForm);
