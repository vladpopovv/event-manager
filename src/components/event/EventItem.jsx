import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './eventStyle.less';

const EventItem = (props) => {
  const { event } = props;
  const eventClasses = classNames('event__item', {
    'first-day': event.isFirstDay,
    'last-day': event.isLastDay,
  });
  return (
    <div className={eventClasses}>
      {event.title}
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({}).isRequired,
};

export default EventItem;
