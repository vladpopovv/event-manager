import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DayItem = (props) => {
  // const dayData = props.dayData;
  const dayClasses = classNames('calendar__day', {
    inactive: props.dayData.isBefore || props.dayData.isAfter,
  });
  return (
    <div className={dayClasses}>
      {props.dayData.day.date()}
    </div>
  );
};

DayItem.propTypes = {
  dayData: PropTypes.shape({
    day: PropTypes.shape({
      date: PropTypes.func.isRequired,
    }),
    isBefore: PropTypes.bool,
    isAfter: PropTypes.bool,
  }).isRequired,
};

export default DayItem;
