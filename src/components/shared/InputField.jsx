import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class InputField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      passwordInputType: this.props.type,
    };

    this.onToggleTypePassword = this.onToggleTypePassword.bind(this);
  }

  onToggleTypePassword() {
    const type = this.state.passwordInputType === 'password' ? 'text' : 'password';
    this.setState({
      passwordInputType: type,
    });
  }

  renderToggleInputType(toggleClasses) {
    return (
      <div className="input-group-prepend">
        <div
          className="input-group-text"
          tabIndex="-1"
          onClick={this.onToggleTypePassword}
          onKeyDown={this.onToggleTypePassword}
          role="button"
        >
          <i className={toggleClasses} />
        </div>
      </div>
    );
  }

  render() {
    const {
      input,
      label,
      type,
      meta: { touched, error, form },
    } = this.props;
    const fieldClasses = classNames('form-control', {
      'is-invalid': touched && error,
    });
    const { passwordInputType } = this.state;
    const toggleType = (passwordInputType === 'text') ? '' : '-slash';
    const toggleClasses = classNames('fa', `fa-eye${toggleType}`);

    return (
      <div className="form-group">
        <label htmlFor={`${form}-${input.name}`} className="col-12 p-0">
          {label}
          <div className="input-group">
            {type === 'password' &&
              this.renderToggleInputType(toggleClasses)}
            <input
              {...input}
              id={`${form}-${input.name}`}
              placeholder={label}
              type={this.state.passwordInputType}
              className={fieldClasses}
            />
          </div>
          {touched &&
          ((error && <span className="text-danger">{error}</span>))}
        </label>
      </div>
    );
  }
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  input: PropTypes.shape({}),
  meta: PropTypes.shape({
    erorrs: PropTypes.shape({}),
    touched: PropTypes.bool,
  }),
};

InputField.defaultProps = {
  type: 'text',
  meta: {},
  input: {},
};
