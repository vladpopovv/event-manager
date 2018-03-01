import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import eventsActions from './../../actions/eventsActions/eventsActions';
import modalActions from './../../actions/modalActions/modalActions';
import NewEvent from './../event/NewEvent';
import DayItem from './DayItem';
import CalendarUtility from './../../utility/calendarUtility';
import EventData from './../event/EventData';
import Loader from './../shared/loader/Loader';
import './calendarStyle.less';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const date = moment();
    this.state = {
      month: date.get('month'),
      year: date.get('year'),
    };

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickToday = this.onClickToday.bind(this);
    this.openModalEventData = this.openModalEventData.bind(this);
    this.openModalAddEvent = this.openModalAddEvent.bind(this);
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

  openModalAddEvent(date) {
    const startDate = CalendarUtility.getDateByFormat(date);
    const dayOfMonth = CalendarUtility.getMonth(this.state.year, this.state.month);
    const eventsDays = CalendarUtility.getEventsDays(this.props.events, dayOfMonth);
    this.props.addModal(<NewEvent
      onHide={this.props.deleteModal}
      startDate={startDate}
      events={eventsDays}
      date={startDate}
    />);
  }

  openModalEventData(event) {
    this.props.addModal(<EventData
      onHide={this.props.deleteModal}
      event={event}
      deleteEventHandler={this.props.deleteEvents}
    />);
  }

  render() {
    const date = moment().month(this.state.month).year(this.state.year);
    const currentMonth = date.format('MMMM');
    const btnTodayIsDisabled = moment().isSame(date, 'month');
    const currentYear = this.state.year;

    const weekDaysName = moment.weekdaysShort();
    const dayOfMonth = CalendarUtility.getMonth(currentYear, this.state.month);
    const eventsDays = CalendarUtility.getEventsDays(this.props.events, dayOfMonth);
    const daysRender = [];
    eventsDays.forEach((day) => {
      daysRender.push(<DayItem
        key={day.day}
        dayData={day}
        onClickEventHandler={this.openModalEventData}
        onClickDay={this.openModalAddEvent}
      />);
    });


    return (
      <div>
        <div className="calendar">
          <Loader loading={this.props.loading} />
          <div className="calendar__top d-flex justify-content-between align-content-center p-2">
            <div>
              <button onClick={this.openModalAddEvent} className="btn btn-sm btn-primary mr-2">
                Add event
              </button>
            </div>
            <div className="calendar__caption">
              <span>
                {currentMonth} {currentYear}
              </span>
            </div>
            <div>
              <button
                onClick={this.onClickToday}
                className="btn btn-sm btn-primary mr-2"
                disabled={btnTodayIsDisabled}
              >
                Today
              </button>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={this.onClickPrev}
                >
                  <i className="fa fa-chevron-left" />
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={this.onClickNext}
                >
                  <i className="fa fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
          <div className="calendar__table">
            <div className="calendar__header bg-primary">
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
  loading: PropTypes.bool,
  getEventsOfRange: PropTypes.func.isRequired,
  addModal: PropTypes.func.isRequired,
  deleteEvents: PropTypes.func.isRequired,
  deleteModal: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  events: [],
  loading: false,
};

const mapStateToProps = state => ({
  events: state.events.events,
  loading: state.events.loading.getting,
});

const mapDispatchToProps = dispatch => ({
  getEventsOfRange: bindActionCreators(eventsActions.getEventsOfRange, dispatch),
  deleteEvents: bindActionCreators(eventsActions.deleteEvents, dispatch),
  addModal: bindActionCreators(modalActions.addNew, dispatch),
  deleteModal: bindActionCreators(modalActions.delete, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
