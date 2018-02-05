import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputGroup from './InputGroup';

export default class InputField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
    };

    this.onToggleVisible = this.onToggleVisible.bind(this);
  }

  onToggleVisible() {
    const { isHidden } = this.state;
    this.setState({
      isHidden: !isHidden,
    });
  }

  renderToggleVisible() {
    return (
      <div className="input-group-prepend">
        <div
          className="input-group-text"
          tabIndex="-1"
          onClick={this.onToggleVisible}
          onKeyDown={this.onToggleVisible}
          role="button"
        >
          <i className={classNames('fa', {
              'fa-eye': !this.state.isHidden,
              'fa-eye-slash': this.state.isHidden,
            })}
          />
        </div>
      </div>
    );
  }

  render() {
    const {
      input,
      label,
      meta: { touched, error, form },
    } = this.props;
    const fieldClasses = classNames('form-control', {
      'is-invalid': touched && error,
    });

    const inputType = this.state.isHidden ? 'password' : 'text';
    const inputError = (touched && error) ? error : '';

    return (
      <InputGroup error={inputError} >
        <label
          htmlFor={`${form}-${input.name}`}
          className="col-12 p-0 mb-0"
        >
          {label}
          <div className="input-group">
            {this.renderToggleVisible()}
            <input
              {...input}
              id={`${form}-${input.name}`}
              placeholder={label}
              type={inputType}
              className={fieldClasses}
            />
          </div>
        </label>
      </InputGroup>
    );
  }
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  input: PropTypes.shape({}),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
};

InputField.defaultProps = {
  type: 'text',
  meta: {
    error: '',
    touched: false,
  },
  input: {},
};
