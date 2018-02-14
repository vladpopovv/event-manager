import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputGroup from './InputGroup';

export default class InputField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
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
    const inputError = (touched && error) ? error : '';

    return (
      <InputGroup error={inputError}>
        <label
          htmlFor={`${form}-${input.name}`}
          className="col-12 p-0 mb-0"
        >
          {label}
          <div className="input-group">
            <input
              {...input}
              id={`${form}-${input.name}`}
              placeholder={label}
              type={type}
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
