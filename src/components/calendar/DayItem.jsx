import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import EventItem from './../event/EventItem';
// import EventMore from './../event/EventMore';

const DayItem = (props) => {
  const dayClasses = classNames('calendar__day-content', {
    inactive: props.dayData.isBefore || props.dayData.isAfter,
    today: props.dayData.isToday,
  });
  const { events } = props.dayData.eventsData;
  const onClickDay = () => props.onClickDay();
  const onClickFirstEvent = () => props.onClickEventHandler(events[0]);
  const hasEvents = events && events.length !== 0;
  const day = moment(props.dayData.day).date();
  // const isMore = events.length > 1;

  return (
    <div
      className="calendar__day border"
      onClick={events.length === 0 ? onClickDay : onClickFirstEvent}
      role="presentation"
    >
      <div className={dayClasses}>
        <span className="day__date">
          {day}
        </span>
        {hasEvents &&
          <EventItem event={events[0]} onClickEventHandler={props.onClickEventHandler} />
        }
      </div>
    </div>
  );
};

DayItem.propTypes = {
  onClickEventHandler: PropTypes.func.isRequired,
  onClickDay: PropTypes.func.isRequired,
  dayData: PropTypes.shape({
    day: PropTypes.string,
    isBefore: PropTypes.bool,
    isAfter: PropTypes.bool,
    isToday: PropTypes.bool,
    eventsData: PropTypes.shape({
      events: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
      })),
    }),
  }).isRequired,
};

export default DayItem;
