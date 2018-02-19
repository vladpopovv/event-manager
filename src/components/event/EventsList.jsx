import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const EventsList = (props) => {
  const { days } = props;
  const date = moment(props.date).format('MM-DD-YYYY');
  console.log('days.get(date)', props);
  const { events } = days.has(date) ? days.get(date).eventsData : [];
  return (
    <div>
      <ul className="list-group">
        {events.map(event => (
          <li className="list-group-item">
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

EventsList.propTypes = {
  date: PropTypes.string.isRequired,
  days: PropTypes.instanceOf(Map).isRequired,
};

export default EventsList;
