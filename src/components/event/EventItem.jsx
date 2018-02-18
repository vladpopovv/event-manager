import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './eventStyle.less';

const EventItem = (props) => {
  const { event } = props;
  const onClickEventHandler = () => props.onClickEventHandler(event);
  const eventClasses = classNames('event__item', {
    'first-day': event.isFirstDay,
    'last-day': event.isLastDay,
  });
  return (
    <div className={eventClasses} role="presentation" onClick={onClickEventHandler}>
      {event.title}
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({}).isRequired,
  onClickEventHandler: PropTypes.func.isRequired,
};

export default EventItem;
