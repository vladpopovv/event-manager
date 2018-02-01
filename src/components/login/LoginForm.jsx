import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from './../shared/InputField';
import FormButton from './../shared/FormButton';
import authActions from './../../actions/authActions';
import {
  required as requiredValidate,
  email as emailValidate,
  minLength5 as minLength5Validate,
} from './../shared/validationForm';
import AuthContainer from './../../containers/AuthContainer';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.signInRequest(values);
  }

  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
      pristine,
      anyTouched,
      signInError,
    } = this.props;
    console.log(this.props);
    return (
      <AuthContainer title="Login">
        <form className="card-body" onSubmit={handleSubmit(this.handleSubmit)} noValidate>
          <Field
            component={InputField}
            type="email"
            name="login"
            label="Email"
            validate={[requiredValidate, emailValidate]}
          />

          <Field
            component={InputField}
            type="password"
            name="password"
            label="Password"
            validate={[requiredValidate, minLength5Validate]}
          />

          <FormButton
            type="submit"
            text="Login"
            buttonType="primary"
            buttonFloat="right"
            disabled={(anyTouched || !pristine) && (invalid || submitting)}
          />
        </form>
        {signInError && <div className="alert alert-danger" role="alert">{signInError}</div>}
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
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  anyTouched: PropTypes.bool,
  signInRequest: PropTypes.func.isRequired,
  signInError: PropTypes.string,
};

LoginForm.defaultProps = {
  submitting: true,
  pristine: false,
  invalid: true,
  anyTouched: false,
  signInError: '',
};

const mapStateToProps = state => ({
  loading: state.user.loading,
  signInError: state.user.signUpError,
});


const mapDispathcToProps = dispatch => ({
  signInRequest: bindActionCreators(authActions.signInRequest, dispatch),
});

const form = connect(mapStateToProps, mapDispathcToProps)(LoginForm);

export default reduxForm({
  form: 'login',
})(form);
