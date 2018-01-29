import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';

export default class InputField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      label,
      name,
      type,
      form,
    } = this.props;
    const wrapperClasses = classNames('form-group');
    const labelClasses = classNames('col-12 p-0');
    const fieldClasses = classNames('form-control');
    return (
      <div className={wrapperClasses}>
        <label htmlFor={`${form}-${name}`} className={labelClasses}>
          {label}
          <Field
            className={fieldClasses}
            id={`${form}-${name}`}
            name={name}
            component="input"
            type={type}
          />
        </label>
      </div>
    );
  }
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  form: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  type: 'text',
};
