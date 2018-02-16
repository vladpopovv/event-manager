import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import EventItem from './../event/EventItem';
// import EventMore from './../event/EventMore';

const DayItem = (props) => {
  const dayClasses = classNames('calendar__day', {
    inactive: props.dayData.isBefore || props.dayData.isAfter,
  });
  const { events } = props.dayData.eventsData;
  console.error(props.dayData);
  const hasEvents = events && events.length !== 0;
  // const isMore = events.length > 1;

  return (
    <div className={dayClasses}>
      <span>
        {props.dayData.day.date()}
        {hasEvents &&
          <EventItem event={events[0]} />
        }
      </span>
    </div>
  );
};
// {hasEvents &&
//   isMore
//   ? <EventMore events={events} />
//   : <EventItem event={events[0]} />
// }
DayItem.propTypes = {
  dayData: PropTypes.shape({
    day: PropTypes.shape({
      date: PropTypes.func.isRequired,
    }),
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
