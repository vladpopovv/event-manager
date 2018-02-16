import React from 'react';
import PropTypes from 'prop-types';
import './eventStyle.less';

const EventMore = (props) => {
  const { events } = props;
  return (
    <div className="event__item_more">
      <i className="fa fa-plus" />{events.length} more
    </div>
  );
};

EventMore.propTypes = {
  events: PropTypes.shape({}).isRequired,
};

export default EventMore;
