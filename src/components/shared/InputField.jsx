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

  render() {
    const {
      input,
      label,
      type,
      meta: { touched, error, form },
    } = this.props;
    const wrapperClasses = classNames('form-group');
    const labelClasses = classNames('col-12 p-0');
    const fieldClasses = classNames('form-control', {
      'is-invalid': touched && error,
    });
    const { passwordInputType } = this.state;
    const eyeType = passwordInputType === 'text' ? '' : '-slash';
    const eyeClass = classNames('fa', `fa-eye${eyeType}`);
    return (
      <div className={wrapperClasses}>
        <label htmlFor={`${form}-${input.name}`} className={labelClasses}>
          {label}
          <div className="input-group">
            {type === 'password' &&
              <div className="input-group-prepend">
                <div
                  className="input-group-text"
                  tabIndex="0"
                  onClick={this.onToggleTypePassword}
                  onKeyDown={this.onToggleTypePassword}
                  role="button"
                >
                  <i className={eyeClass} />
                </div>
              </div>}
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
