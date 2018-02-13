import React from 'react';
// import moment from 'moment';
import CalendarUtility from './../../utility/calendarUtility';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(CalendarUtility.getMonth(2018, 1));
    return (
      <h1>Calendar</h1>
    );
  }
}

export default Calendar;
