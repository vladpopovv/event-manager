import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './eventStyle.less';

const EventItem = (props) => {
  const { event } = props;
  const onClickEventHandler = () => props.onClickEventHandler(event);
  const eventClasses = classNames('event__item', {
    // 'first-day': event.isFirstDay,
    // 'last-day': event.isLastDay,
  });
  return (
    <button
      className={eventClasses}
      onClick={onClickEventHandler}
      disabled={props.disabled}
    >
      {event.title}
    </button>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({}).isRequired,
  onClickEventHandler: PropTypes.func.isRequired,
  disabled: PropTypes.func,
};

EventItem.defaultProps = {
  disabled: false,
};

export default EventItem;
