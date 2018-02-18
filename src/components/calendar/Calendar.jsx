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
import EventData from './../event/EventData';
import './calendarStyle.less';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const date = moment();
    this.state = {
      month: date.get('month'),
      year: date.get('year'),
      modalAddEventIsOpen: false,
      modalEventDataIsOpen: false,
      eventData: {},
    };

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickToday = this.onClickToday.bind(this);
    this.openModalEventData = this.openModalEventData.bind(this);
    this.closeModalEventData = this.closeModalEventData.bind(this);
    this.openModalAddEvent = this.openModalAddEvent.bind(this);
    this.closeModalAddEvent = this.closeModalAddEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  componentDidMount() {
    this.getEvents(this.state.year, this.state.month);
  }

  onClickPrev() {
    const currentMonth = this.state.month;
    const currentYear = this.state.year;
    const newDate = moment([currentYear, currentMonth]).subtract(1, 'month');
    const year = newDate.get('year');
    const month = newDate.get('month');

    this.setState({
      year,
      month,
    });
    this.getEvents(year, month);
  }

  onClickNext() {
    const currentMonth = this.state.month;
    const currentYear = this.state.year;
    const newDate = moment([currentYear, currentMonth]).add(1, 'month');
    const year = newDate.get('year');
    const month = newDate.get('month');

    this.setState({
      year,
      month,
    });
    this.getEvents(year, month);
  }

  onClickToday() {
    const date = moment();
    const year = date.get('year');
    const month = date.get('month');
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

  openModalAddEvent() {
    this.setState({
      modalAddEventIsOpen: true,
    });
  }

  closeModalAddEvent() {
    this.setState({
      modalAddEventIsOpen: false,
    });
  }

  openModalEventData(event) {
    this.setState({
      modalEventDataIsOpen: true,
      eventData: event,
    });
  }

  closeModalEventData() {
    this.setState({
      modalEventDataIsOpen: false,
      eventData: {},
    });
  }

  render() {
    const currentMonth = moment().month(this.state.month).format('MMMM');
    const currentYear = this.state.year;

    const weekDaysName = moment.weekdaysShort();
    const dayOfMonth = CalendarUtility.getMonth(currentYear, this.state.month);
    const eventsDays = CalendarUtility.getEventsDays(this.props.events, dayOfMonth);
    const daysRender = [];
    for (const day of eventsDays.values()) {
      daysRender.push(
        <div className="calendar__day border">
          <DayItem dayData={day} onClickEventHandler={this.openModalEventData}/>
        </div>
      );
    }

    return (
      <div>
        <Modal show={this.state.modalAddEventIsOpen} onHide={this.closeModalAddEvent}>
          <NewEvent onHide={this.closeModalAddEvent} />
        </Modal>
        <Modal show={this.state.modalEventDataIsOpen} onHide={this.closeModalEventData}>
          <EventData onHide={this.closeModalEventData} event={this.state.eventData} />
        </Modal>
        <div className="calendar">
          <div className="calendar__top d-flex justify-content-between align-content-center p-2">
            <div>
              <button onClick={this.openModalAddEvent} className="calendar__btn mr-2">
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
          <div className="calendar__table">
            <div className="calendar__header">
              {weekDaysName.map(weekDay => (
                <div key={weekDay} className="calendar-header__item">{weekDay}</div>
              ))}
            </div>
            <div className="calendar__body">
              {daysRender}
            </div>
          </div>
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
