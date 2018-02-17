import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import EventItem from './../event/EventItem';
// import EventMore from './../event/EventMore';

const DayItem = (props) => {
  const dayClasses = classNames('calendar__day', {
    inactive: props.dayData.isBefore || props.dayData.isAfter,
  });
  const { events } = props.dayData.eventsData;
  const hasEvents = events && events.length !== 0;
  const day = moment(props.dayData.day).date();
  // const isMore = events.length > 1;

  return (
    <div className={dayClasses}>
      <span>
        {day}
      </span>
      {hasEvents &&
        <EventItem event={events[0]} />
      }
    </div>
  );
};

DayItem.propTypes = {
  dayData: PropTypes.shape({
    day: PropTypes.string,
    isBefore: PropTypes.bool,
    isAfter: PropTypes.bool,
    eventsData: PropTypes.shape({
      events: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
      })),
    }),
  }).isRequired,
};

export default DayItem;
