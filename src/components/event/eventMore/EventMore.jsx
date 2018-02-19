import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap';
import CalendarUtility from './../../../utility/calendarUtility';
import './eventMoreStyle.less';
import './../eventStyle.less';

const EventMore = (props) => {
  const { events } = props;
  const onClickEventHandler = event => props.onClickEventHandler(event);
  const moreCount = events.length - 2;
  return (
    <div className="btn-group">
      <button
        type="button"
        className="event__item event__show-more dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        + {moreCount} more
      </button>
      <div className="dropdown-menu events__dropdown">
        {events.map((event, i) => (
          <button
            className="dropdown-item"
            onClick={() => onClickEventHandler(event)}
            data-id={i}
          >
            <span className="events__title_dropdown">
              {event.title}
            </span>
            <span className="events__date_dropdown text-muted">
              {CalendarUtility.getDateByFormat(event.fromDate)} -
              {CalendarUtility.getDateByFormat(event.toDate)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

EventMore.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClickEventHandler: PropTypes.func.isRequired,
};

export default EventMore;
