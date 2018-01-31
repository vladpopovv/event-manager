import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class FormButton extends React.PureComponent {
  render() {
    const {
      text,
      type,
      buttonType,
      buttonFloat,
      disabled,
    } = this.props;
    const btnClasses = classNames('btn', {
      [`btn-${buttonType}`]: buttonType,
      [`float-${buttonFloat}`]: true,
    });
    return (
      <div className="clearfix">
        <button type={type} className={btnClasses} disabled={disabled}>
          {text}
        </button>
      </div>
    );
  }
}

FormButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  buttonType: PropTypes.string,
  buttonFloat: PropTypes.string,
  disabled: PropTypes.bool,
};

FormButton.defaultProps = {
  type: '',
  buttonType: '',
  buttonFloat: 'left',
  disabled: false,
};
