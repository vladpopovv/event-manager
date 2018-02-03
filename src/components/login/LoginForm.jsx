import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from './../shared/InputField';
import InputPassword from './../shared/InputPassword';
import FormButton from './../shared/FormButton';
import authActions from './../../actions/authActions';
import validators from './../validators/validationForm';
import AuthContainer from './../../containers/AuthContainer';
import NotificationWrapper from './../notification/NotificationWrapper';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
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
      signIn: { error },
    } = this.props;
    const isTouched = (anyTouched || !pristine);
    const isSubmitDisabled = isTouched && (invalid || submitting);
    const fields = [
      {
        component: InputField,
        type: 'email',
        name: 'login',
        label: 'Email',
        validate: [validators.required, validators.email],
      },
      {
        type: 'password',
        component: InputPassword,
        name: 'password',
        label: 'Password',
        validate: [validators.required, validators.minLength5],
      },
    ];

    return (
      <AuthContainer title="Log in">
        <div className="card-body">
          <NotificationWrapper />
          <form onSubmit={handleSubmit(this.handleSubmit)} noValidate>
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
              text="Login"
              buttonType="primary"
              buttonFloat="right"
              disabled={isSubmitDisabled}
            />
          </form>
          {error && <div className="alert alert-danger mb-0 mt-3" role="alert">{error}</div>}
        </div>
        <div className="card-footer">
          <p className="m-0">Don`t you have account yet?</p>
          <Link href="/signup" to="/signup">Sing up</Link>
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
  signIn: PropTypes.shape({}),
};

LoginForm.defaultProps = {
  submitting: true,
  pristine: false,
  invalid: true,
  anyTouched: false,
  signIn: {},
};

const mapStateToProps = state => ({
  loading: state.user.loading,
  signIn: state.user.signIn,
});


const mapDispathcToProps = dispatch => ({
  signInRequest: bindActionCreators(authActions.signInRequest, dispatch),
});

const form = connect(mapStateToProps, mapDispathcToProps)(LoginForm);

export default reduxForm({
  form: 'login',
})(form);
