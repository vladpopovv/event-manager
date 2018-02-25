import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './eventStyle.less';

const EventItem = (props) => {
  const { event } = props;
  const colorClasses = [
    'btn-danger',
    'btn-info',
    'btn-warning',
    'btn-primary',
    'btn-secondary',
    // 'red',
    // 'blue',
    // 'yellow',
    // 'green',
    // 'teal',
    // 'orange',
    // 'pink',
  ];
  const color = colorClasses[(event.id * 1) % 5];
  const onClickEventHandler = (e) => {
    e.stopPropagation();
    props.onClickEventHandler(event);
  };
  const eventClasses = classNames('event__item', color);
  return (
    <button
      className={eventClasses}
      onClick={onClickEventHandler}
    >
      {event.title}
    </button>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({}).isRequired,
  onClickEventHandler: PropTypes.func.isRequired,
};

export default EventItem;
