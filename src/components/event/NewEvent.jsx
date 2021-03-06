import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import InputField from './../shared/InputField';
import InputTextarea from './../shared/InputTextarea';
import FormButton from './../shared/FormButton';
import validators from './../validators/validationForm';
import Invite from './../InviteFriends/Invite';
import EventsList from './EventsList';
import CalendarUtility from './../../utility/calendarUtility';
import eventAction from './../../actions/eventsActions/eventsActions';

class NewEvent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      invitedFriends: [],
      startDate: this.props.date,
      endDate: this.props.date,
    };

    this.onChangeInvitedFriends = this.onChangeInvitedFriends.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.getEventsRequest = this.getEventsRequest.bind(this);
    this.removeEventHandler = this.removeEventHandler.bind(this);
  }

  componentDidMount() {
    const { startDate, endDate } = this.state;
    this.getEventsRequest(startDate, endDate);
    const date = moment(this.state.startDate).format('YYYY-MM-DD');
    this.props.dispatch(change('addNewEvent', 'fromDate', date));
    this.props.dispatch(change('addNewEvent', 'toDate', date));
  }

  componentWillUnmount() {
    this.props.clearEventList();
  }

  onChangeInvitedFriends(invitedFriends) {
    this.setState({
      invitedFriends,
    });
  }

  onChangeStartDate(e, newValue) {
    this.setState({
      startDate: newValue,
    });
    this.getEventsRequest(newValue, this.state.endDate);
  }

  onChangeEndDate(e, newValue) {
    this.setState({
      endDate: CalendarUtility.getDateByFormat(newValue),
    });
    this.getEventsRequest(this.state.startDate, newValue);
  }

  onClose() {
    this.props.onHide();
  }

  getEventsRequest(startDate = this.state.startDate, endDate = this.state.endDate) {
    clearTimeout(this.debounceGetEvents);
    this.debounceGetEvents = setTimeout(() => {
      if (moment(startDate).isValid() && moment(endDate).isValid()) {
        this.props.getEventsByRange(startDate, endDate);
      }
    }, 500);
  }

  handleSubmit(value) {
    this.props.addNewEvent({
      ...value,
    }, this.state.invitedFriends).then(() => this.onClose());
  }

  removeEventHandler(event) {
    this.props.deleteEvent(event)
      .then(() => this.getEventsRequest());
  }

  render() {
    const { handleSubmit } = this.props;
    const fields = [
      {
        component: InputField,
        type: 'text',
        name: 'title',
        label: 'Title',
        validate: [validators.required],
      },
      {
        type: 'textarea',
        component: InputTextarea,
        name: 'description',
        label: 'Description',
      },
    ];
    return (
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create new event</h5>
            <button
              type="button"
              className="close text-dark"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(this.handleSubmit)} >
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <Field
                    value="2018-02-03"
                    onChange={this.onChangeStartDate}
                    component={InputField}
                    type="date"
                    name="fromDate"
                    label="Start date"
                    validate={[validators.required]}
                  />
                </div>
                <div className="col-6">
                  <Field
                    onChange={this.onChangeEndDate}
                    component={InputField}
                    type="date"
                    name="toDate"
                    label="End date"
                    validate={[validators.required, validators.dateSequence]}
                  />
                </div>
              </div>
              {fields.map(fieldItem => (
                <Field
                  key={fieldItem.name}
                  component={fieldItem.component}
                  type={fieldItem.type}
                  name={fieldItem.name}
                  label={fieldItem.label}
                  validate={fieldItem.validate}
                />
              ))}
              <Invite
                onChangeInvitedFriends={this.onChangeInvitedFriends}
                onClickUser={this.props.onHide}
              />
              <EventsList
                events={this.props.events}
                date={this.state.startDate}
                loading={this.props.loadingEvents}
                onClickUser={this.props.onHide}
                deleteEventHandler={this.removeEventHandler}
              />
            </div>
            <div className="modal-footer">
              <FormButton
                loading={false}
                type="submit"
                text="Done"
                buttonType="primary"
                buttonFloat="right"
                disabled={false}
              />
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewEvent.propTypes = {
  onHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  addNewEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  getEventsByRange: PropTypes.func.isRequired,
  clearEventList: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()),
  date: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  loadingEvents: PropTypes.bool,
};

NewEvent.defaultProps = {
  events: [],
  loadingEvents: false,
};

const mapStateToProps = state => ({
  loading: state.events.loading.adding,
  loadingEvents: state.events.loading.gettingList,
  events: state.events.eventsList,
});

const mapDispathcToProps = dispatch => ({
  addNewEvent: bindActionCreators(eventAction.addNewEvent, dispatch),
  deleteEvent: bindActionCreators(eventAction.deleteEvents, dispatch),
  getEventsByRange: bindActionCreators(eventAction.getEventsListByRange, dispatch),
  clearEventList: bindActionCreators(eventAction.clearEventList, dispatch),
});

const NewEventForm = connect(mapStateToProps, mapDispathcToProps)(NewEvent);

export default reduxForm({
  form: 'addNewEvent',
})(NewEventForm);
