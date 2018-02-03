import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpRequest } from './../../actions/authActions';
import InputField from './../shared/InputField';
import InputPassword from './../shared/InputPassword';
import FormButton from './../shared/FormButton';
import {
  required as requiredValidate,
  email as emailValidate,
  minLength5 as minLength5Validate,
  passwordEquality as passwordEqualityValidate,
} from './../shared/validationForm';

import AuthContainer from './../../containers/AuthContainer';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {

  }

  handleSubmit(values) {
    const dataRequest = {
      login: values.login,
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password,
    };
    this.props.signUpRequest(dataRequest)
      .then((resolve) => {
        if (resolve.payload.success) {
          return alert('You have successfully registered');
        }
        return false;
      });
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
    const isTouched = (anyTouched || !pristine);
    const isSubmitDisabled = isTouched && (invalid || submitting);
    const fields = [
      {
        component: InputField,
        type: 'email',
        name: 'login',
        label: 'Email',
        validate: [requiredValidate, emailValidate],
      },
      {
        component: InputField,
        name: 'firstname',
        label: 'First Name',
        validate: [requiredValidate],
      },
      {
        component: InputField,
        name: 'lastname',
        label: 'Last Name',
        validate: [requiredValidate],
      },
      {
        type: 'password',
        component: InputPassword,
        name: 'password',
        label: 'Password',
        validate: [requiredValidate, minLength5Validate],
      },
      {
        type: 'password',
        component: InputPassword,
        name: 'passwordRepeat',
        label: 'Repeat password',
        validate: [requiredValidate, minLength5Validate, passwordEqualityValidate],
      },
    ];

    return (
      <AuthContainer title="Sign up">
        <div className="card-body">
          <form
            onSubmit={handleSubmit(this.handleSubmit)}
            noValidate
            className="mb-3"
          >
            {fields.map(fieldItem => (
              <Field
                key={fieldItem.name}
                component={fieldItem.component}
                type={fieldItem.type}
                name={fieldItem.name}
                label={fieldItem.label}
                validate={fieldItem.validate}
              />
            ))}

            <FormButton
              type="submit"
              text="Sign up"
              buttonType="primary"
              buttonFloat="right"
              disabled={isSubmitDisabled}
            />
          </form>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
        </div>
        <div className="card-footer">
          <p className="m-0">Have an account?</p>
          <Link href="/login" to="/login">Sign in</Link>
        </div>
      </AuthContainer>
    );
  }
}

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  anyTouched: PropTypes.bool,
  signUpRequest: PropTypes.func.isRequired,
  signUp: PropTypes.shape({}),
};

SignUpForm.defaultProps = {
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
  signUpRequest: bindActionCreators(signUpRequest, dispatch),
});

const form = connect(mapStateToProps, mapDispathcToProps)(SignUpForm);

export default reduxForm({
  form: 'signup',
})(form);
