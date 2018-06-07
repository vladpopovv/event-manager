import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CalendarUtility from './../../utility/calendarUtility';
import EventDescription from './EventDescription';
// import Loader /from './../shared/loader/Loader';

const EventsList = (props) => {
  const { events } = props;
  const isNoEvents = events.length === 0 && !props.loading;

  return (
    <div>
      <div className="mt-2">
        Events for the selected period of time
        {props.loading &&
          <div className={classNames('loader__spinner', 'text-primary', 'sm')}>
            <i className="fa fa-spinner spinner" />
          </div>
        }
      </div>
      {isNoEvents &&
        <div className="invite__message">
          <span className="text-muted">
            You do not have any events
          </span>
        </div>}
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
                onClickUser={props.onClickUser}
                clickDeleteEventHandler={() => (
                  props.deleteEventHandler(event)
                    .then(() => props.onHide()))}
                event={event}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  onClickUser: PropTypes.func.isRequired,
};

EventsList.defaultProps = {
  events: {
    eventsData: {
      events: [],
    },
  },
  loading: false,
};

export default EventsList;
