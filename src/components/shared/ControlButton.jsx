import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './formButton.less';

const ControlButton = (props) => {
  const btnClasses = classNames('btn', 'btn-primary', {
    // [`btn-${props.buttonType}`]: props.buttonType,
  });
  const icon = props.loading ? 'fa-spinner' : `fa-${props.icon}`;
  return (
    <button
      type={props.type}
      className={btnClasses}
      disabled={props.disabled}
      onClick={props.onClickHandler}
    >
      {props.icon &&
        <i className={classNames('fa', icon, {
            spinner: props.loading,
          })}
        />
      }
      {props.text}
    </button>
  );
};

ControlButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  // buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
};

ControlButton.defaultProps = {
  icon: '',
  text: '',
  type: 'button',
  // buttonType: '',
  disabled: false,
  loading: false,
};

export default ControlButton;
