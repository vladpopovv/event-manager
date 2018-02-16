import React from 'react';
import PropTypes from 'prop-types';
import './eventStyle.less';

const EventItem = (props) => {
  const { event } = props;
  return (
    <div className="event__item">
      {event.title}
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({}).isRequired,
};

export default EventItem;
