import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './eventButtonStyle.less';

const EventButton = (props) => {
  const iconClass = classNames('fa', props.icon);
  return (
    <button
      className="event__btn"
      onClick={props.clickHandler}
      type={props.type}
    >
      {props.icon &&
        <i className={iconClass} aria-hidden="true" />
      }
      {props.text}
    </button>
  );
};

EventButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
};

EventButton.defaultProps = {
  text: '',
  icon: '',
  type: 'button',
};

export default EventButton;
