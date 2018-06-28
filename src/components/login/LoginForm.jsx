import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from './../shared/InputField';
import InputPassword from './../shared/InputPassword';
import FormButton from './../shared/FormButton';
import authActions from './../../actions/authorization/authActions';
import validators from './../validators/validationForm';
import AuthContainer from './../containers/AuthContainer';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOtherTypeAuth = this.onOtherTypeAuth.bind(this);
  }


  onOtherTypeAuth(typeAuth) {
    this.props.signInByToken(typeAuth);
  }

  handleSubmit(values) {
    this.props.signInRequest(values);
  }
  render() {
    const {
      handleSubmit,
      loading,
      invalid,
      pristine,
      anyTouched,
      signIn: { error },
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
        type: 'password',
        component: InputPassword,
        name: 'password',
        label: 'Password',
        validate: [validators.required, validators.minLength6],
      },
    ];

    return (
      <AuthContainer title="Log in">
        <div className="card-body">
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
              loading={loading}
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
          <div className="login_auth">
            <p className="m-0 d-inline">Do you have account on github.com or vk.com?</p>
            <button
              className="btn btn-primary ml-2"
              onClick={() => this.onOtherTypeAuth('github')}
              data-authtype="github"
            >
              <i className="fa fa-github" aria-hidden="true" />
            </button>
            <button
              className="btn btn-primary ml-2"
              onClick={() => this.onOtherTypeAuth('vkontakte')}
            >
              <i className="fa fa-vk" aria-hidden="true" />
            </button>
          </div>
          <div>
            <p className="m-0 mr-2 d-inline">Don`t you have account yet?</p>
            <Link href="/signup" to="/signup">Sing up</Link>
          </div>
        </div>
      </AuthContainer>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  anyTouched: PropTypes.bool,
  signInRequest: PropTypes.func.isRequired,
  signInByToken: PropTypes.func.isRequired,
  signIn: PropTypes.shape({}),
};

LoginForm.defaultProps = {
  loading: true,
  pristine: false,
  invalid: true,
  anyTouched: false,
  signIn: {},
};

const mapStateToProps = state => ({
  loading: state.user.loading,
  signIn: state.user.signIn,
});


const mapDispatchToProps = dispatch => ({
  signInRequest: bindActionCreators(authActions.signInRequest, dispatch),
  signInByToken: bindActionCreators(authActions.signInByToken, dispatch),
});

const form = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default reduxForm({
  form: 'login',
})(form);
