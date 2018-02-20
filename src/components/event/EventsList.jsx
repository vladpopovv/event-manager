import React from 'react';
import PropTypes from 'prop-types';
import CalendarUtility from './../../utility/calendarUtility';
import EventDescription from './EventDescription';

const EventsList = (props) => {
  const { events } = props;

  return (
    <div id="accordion">
      {events.map(event => (
        <div className="card" key={event.id}>
          <div className="card-header" id={`headingEvent${event.id}`}>
            <h5 className="mb-0">
              <button
                type="button"
                className="btn btn-link w-100 collapsed"
                data-toggle="collapse"
                data-target={`#collapseEvent${event.id}`}
                aria-expanded="true"
                aria-controls={`#collapseEvent${event.id}`}
              >
                <span className="events__title_dropdown float-left">
                  {event.title}
                </span>
                <span className="events__date_dropdown text-muted">
                  {CalendarUtility.getDateByFormat(event.fromDate)} -
                  {CalendarUtility.getDateByFormat(event.toDate)}
                </span>
              </button>
            </h5>
          </div>

          <div
            id={`collapseEvent${event.id}`}
            className="collapse"
            aria-labelledby={`#headingEvent${event.id}`}
            data-parent="#accordion"
          >
            <EventDescription
              clickDeleteEventHandler={() => (
                props.deleteEventHandler(event)
                  .then(() => props.onHide()))}
              event={event}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
};

EventsList.defaultProps = {
  events: {
    eventsData: {
      events: [],
    },
  },
};

export default EventsList;
