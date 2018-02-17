import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import eventsActions from './../../actions/eventsActions/eventsActions';
import NewEvent from './../event/NewEvent';
import Modal from './../modal/Modal';
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
      modalIsOpen: false,
    };

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickToday = this.onClickToday.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  componentDidMount() {
    this.getEvents(this.state.year, this.state.month);
  }

  onClickPrev() {
    const { month, year } = this.state;
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (month === 0) ? year - 1 : year;
    this.setState({
      year: prevYear,
      month: prevMonth,
    });
    this.getEvents(prevYear, prevMonth);
  }

  onClickNext() {
    const { month, year } = this.state;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (month === 11) ? year + 1 : year;
    this.setState({
      year: nextYear,
      month: nextMonth,
    });
    this.getEvents(nextYear, nextMonth);
  }

  onClickToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    this.setState({
      month,
      year,
    });
    this.getEvents(year, month);
  }

  getEvents(year, month) {
    const { firstDayOfRange, lastDayOfRange } = CalendarUtility.getRangePoint(year, month);
    this.props.getEventsOfRange(firstDayOfRange, lastDayOfRange);
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }


  renderWeek(weekItem) {
    console.log('RENDER WEEK', weekItem, this);
    const renderDays = [];
    for (const dayItem of weekItem) {
      renderDays.push(
        <td key={dayItem.day} className="border">
          <DayItem dayData={dayItem[1]} />
        </td>);
    }
    return (renderDays);
  }

  render() {
    const currentMonth = moment().month(this.state.month).format('MMMM');
    const currentYear = this.state.year;

    const weekDaysName = moment.weekdaysShort();
    const dayOfMonth = CalendarUtility.getMonth(currentYear, this.state.month);
    const eventsDays = CalendarUtility.getEventsDays(this.props.events, dayOfMonth);
    const weeks = CalendarUtility.getMonthByWeek(eventsDays);
    const weeksRender = [];
    for (const week of weeks.values()) {
      weeksRender.push(<tr>{this.renderWeek(week)}</tr>);
    }
    return (
      <div>
        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
          <NewEvent onHide={this.closeModal} />
        </Modal>
        <div className="calendar">
          <div className="calendar__top d-flex justify-content-between align-content-center p-2">
            <div>
              <button onClick={this.openModal} className="calendar__btn mr-2">
                Add event
              </button>
              <button onClick={this.onClickToday} className="calendar__btn mr-2">
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
              {weeksRender}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
  getEventsOfRange: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  events: [],
};

const mapStateToProps = state => ({
  events: state.events.events,
});

const mapDispatchToProps = dispatch => ({
  getEventsOfRange: bindActionCreators(eventsActions.getEventsOfRange, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
