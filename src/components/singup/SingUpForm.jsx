import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import authActions from './../../actions/authActions';
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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.signUpRequest(values);
  }

  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
      pristine,
      anyTouched,
      signUp: { error },
    } = this.props;

    return (
      <AuthContainer title="Sing up">
        <div className="card-body">
          <form
            onSubmit={handleSubmit(this.handleSubmit)}
            noValidate
            className="mb-3"
          >
            <Field
              component={InputField}
              type="email"
              name="login"
              label="Email"
              validate={[requiredValidate, emailValidate]}
            />
            <Field
              component={InputField}
              name="firstname"
              label="First Name"
              validate={[requiredValidate]}
            />
            <Field
              component={InputField}
              name="lastname"
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
              disabled={(anyTouched || !pristine) && (invalid || submitting)}
            />
          </form>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
  pristine: PropTypes.bool,
  anyTouched: PropTypes.bool,
  signUpRequest: PropTypes.func.isRequired,
  signUp: PropTypes.shape({}),
};

SingUpForm.defaultProps = {
  submitting: true,
  invalid: false,
  pristine: true,
  anyTouched: false,
  signUp: {},
};

const mapStateToProps = state => ({
  loading: state.user.loading,
  signUp: state.user.signUp,
});


const mapDispathcToProps = dispatch => ({
  signUpRequest: bindActionCreators(authActions.signUpRequest, dispatch),
});

const form = connect(mapStateToProps, mapDispathcToProps)(SingUpForm);

export default reduxForm({
  form: 'singup',
})(form);
