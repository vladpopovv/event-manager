import React from 'react';
import moment from 'moment';
import DayItem from './DayItem';
import CalendarUtility from './../../utility/calendarUtility';
import './calendarStyle.less';

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
    this.onClickToday = this.onClickToday.bind(this);
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

  onClickToday() {
    const date = new Date();
    this.setState({
      month: date.getMonth(),
      year: date.getFullYear(),
    });
  }

  renderWeek(weekItem) {
    console.log(this.year);
    return (
      <tr>
        {weekItem.map(dayItem => (
          <td key={dayItem.d} className="border"><DayItem dayData={dayItem} /></td>
        ))}
      </tr>
    );
  }

  render() {
    const arrayDays = CalendarUtility.getMonth(this.state.year, this.state.month);
    const currentMonth = moment().month(this.state.month).format('MMMM');
    const currentYear = this.state.year;
    const weeks = [];
    const weekDaysName = moment.weekdaysShort();

    for (let weekIndex = 0; weekIndex < arrayDays.length; weekIndex += 7) {
      const rows = [];
      for (let dayIndex = weekIndex; dayIndex < weekIndex + 7; dayIndex += 1) {
        rows.push(arrayDays[dayIndex]);
      }
      weeks.push(rows);
    }

    return (
      <div className="col-8">
        <div className="calendar">
          <div className="calendar__top d-flex justify-content-between align-content-center p-2">
            <div>
              <button className="calendar__btn">
                Add event
              </button>
              <button onClick={this.onClickToday} className="calendar__btn">
                Today
              </button>
            </div>
            <span className="calendar__caption">
              {currentMonth} {currentYear}
            </span>
            <div>
              <div className="calendar__control">
                <button className="calendar__btn" onClick={this.onClickPrev}>
                  prev month
                </button>
                <button className="calendar__btn" onClick={this.onClickNext}>
                  next month
                </button>
              </div>
            </div>
          </div>
          <table className="calendar__table">
            <thead className="calendar__header">
              <tr>
                {weekDaysName.map(weekDay => (
                  <th key={weekDay} className="calendar-header__item">{weekDay}</th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {weeks.map(weekItem => this.renderWeek(weekItem))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Calendar;
