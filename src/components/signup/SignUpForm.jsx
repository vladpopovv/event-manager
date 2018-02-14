import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import authActions from './../../actions/authorization/authActions';
import InputField from './../shared/InputField';
import InputPassword from './../shared/InputPassword';
import FormButton from './../shared/FormButton';
import validators from './../validators/validationForm';
import AuthContainer from './../containers/AuthContainer';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const dataRequest = {
      login: values.login,
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password,
    };
    this.props.signUpRequest(dataRequest);
  }

  render() {
    const {
      handleSubmit,
      loading,
      invalid,
      pristine,
      anyTouched,
      signUp: { error },
    } = this.props;
    const isTouched = (anyTouched || !pristine);
    const isSubmitDisabled = isTouched && (invalid || loading);
    const fields = [
      {
        component: InputField,
        type: 'email',
        name: 'login',
        label: 'Email',
        validate: [validators.required, validators.email],
      },
      {
        component: InputField,
        name: 'firstname',
        label: 'First Name',
        validate: [validators.required],
      },
      {
        component: InputField,
        name: 'lastname',
        label: 'Last Name',
        validate: [validators.required],
      },
      {
        type: 'password',
        component: InputPassword,
        name: 'password',
        label: 'Password',
        validate: [validators.required, validators.minLength5],
      },
      {
        type: 'password',
        component: InputPassword,
        name: 'passwordRepeat',
        label: 'Repeat password',
        validate: [
          validators.required,
          validators.minLength5,
          validators.passwordEquality,
        ],
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
              loading={loading}
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
  loading: PropTypes.bool,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  anyTouched: PropTypes.bool,
  signUpRequest: PropTypes.func.isRequired,
  signUp: PropTypes.shape({}),
};

SignUpForm.defaultProps = {
  loading: true,
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

const form = connect(mapStateToProps, mapDispathcToProps)(SignUpForm);

export default reduxForm({
  form: 'signup',
})(form);
