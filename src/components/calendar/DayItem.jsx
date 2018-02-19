import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import EventItem from './../event/EventItem';
import EventMore from './../event/eventMore/EventMore';

const DayItem = (props) => {
  const disabled = props.dayData.isBefore || props.dayData.isAfter;
  const dayClasses = classNames('calendar__day-content', {
    inactive: disabled,
    today: props.dayData.isToday,
  });
  const { events } = props.dayData.eventsData;
  // const onClickDay = () => props.onClickDay();
  // const onClickFirstEvent = () => props.onClickEventHandler(events[0]);
  const hasEvents = events && events.length !== 0;
  const day = moment(props.dayData.day).date();
  const firstEvents = events.slice(0, 2);
  const isMore = events.length > 2;
  // const moreCount = events.length - 2;
  // onClick={events.length === 0 ? onClickDay : onClickFirstEvent}
  return (
    <div
      className="calendar__day"
      role="presentation"
    >
      <div className={dayClasses}>
        <span className="day__date">
          {day}
        </span>
        <div className="events-list">
          {hasEvents &&
            firstEvents.map(event => (
              <EventItem
                event={event}
                onClickEventHandler={props.onClickEventHandler}
              />
            ))
          }
          {isMore &&
            <EventMore
              events={events}
              onClickEventHandler={props.onClickEventHandler}
            />
           }
        </div>
      </div>
    </div>
  );
};

DayItem.propTypes = {
  onClickEventHandler: PropTypes.func.isRequired,
  // onClickDay: PropTypes.func.isRequired,
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
