import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './formButton.less';

const FormButton = (props) => {
  const btnClasses = classNames('btn', 'btn-sm', {
    [`btn-${props.buttonType}`]: props.buttonType,
  });
  return (
    <button
      type={props.type}
      className={btnClasses}
      disabled={props.disabled}
      onClick={props.onClickHandler}
    >
      {props.text}
      {props.icon &&
        <i className={classNames('fa', `fa-${props.icon}`, {
            'fa-spinner': props.loading,
            spinner: props.loading,
          })}
        />
      }
    </button>
  );
};

FormButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
};

FormButton.defaultProps = {
  icon: '',
  text: '',
  type: 'button',
  buttonType: '',
  disabled: false,
  loading: false,
};

export default FormButton;
