import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './formButton.less';

const FormButton = (props) => {
  const btnClasses = classNames('btn', {
    [`btn-${props.buttonType}`]: props.buttonType,
    [`float-${props.buttonFloat}`]: true,
  });
  return (
    <div className="clearfix">
      <button
        type={props.type}
        className={btnClasses}
        disabled={props.disabled}
      >
        {props.text}
        <i className={classNames('fa', 'ml-2', {
            'fa-sign-in': !props.loading,
            'fa-spinner': props.loading,
            spinner: props.loading,
          })}
        />
      </button>
    </div>
  );
};

FormButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  buttonType: PropTypes.string,
  buttonFloat: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

FormButton.defaultProps = {
  text: 'Submit',
  type: 'submit',
  buttonType: '',
  buttonFloat: 'left',
  disabled: false,
  loading: false,
};

export default FormButton;
