import React from 'react';
import PropTypes from 'prop-types';
// import { Field } from 'redux-form';
import classNames from 'classnames';

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
    const wrapperClasses = classNames('form-group');
    const labelClasses = classNames('col-12 p-0');
    const fieldClasses = classNames('form-control', {
      'is-invalid': touched && error,
    });
    return (
      <div className={wrapperClasses}>
        <label htmlFor={`${form}-${input.name}`} className={labelClasses}>
          {label}
          <input
            {...input}
            id={`${form}-${input.name}`}
            placeholder={label}
            type={type}
            className={fieldClasses}
          />
          {touched &&
          ((error && <span>{error}</span>))}
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
