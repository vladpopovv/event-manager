import React from 'react';
import Moment from 'moment';
import CalendarUtility from './../../utility/calendarUtility';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  onClickPrev() {
    const { month, year } = this.state;
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (month === 0) ? year - 1 : year;
    this.setState({
      year: prevYear,
      month: prevMonth,
    });
  }

  onClickNext() {
    const { month, year } = this.state;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (month === 11) ? year + 1 : year;
    this.setState({
      year: nextYear,
      month: nextMonth,
    });
  }

  render() {
    const arrayDays = CalendarUtility.getMonth(this.state.year, this.state.month);
    const currentMonth = Moment().month(this.state.month).format('MMMM');
    const currentYear = Moment().year(this.state.year).format('YYYY');
    const weeks = [];
    for (let weekIndex = 0; weekIndex < arrayDays.length; weekIndex += 7) {
      const rows = [];
      for (let dayIndex = weekIndex; dayIndex < weekIndex + 7; dayIndex += 1) {
        rows.push(arrayDays[dayIndex]);
      }
      weeks.push(rows);
    }

    return (
      <div>
        {currentMonth} {currentYear}
        <div>
          <button onClick={this.onClickPrev}>prev month</button>
          <button onClick={this.onClickNext}>next month</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map(weekItem =>
              <tr>{weekItem.map(dayItem => <td>{dayItem.day.date()}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
