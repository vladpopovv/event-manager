import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputField from './../shared/InputField';
import InputTextarea from './../shared/InputTextarea';
import FormButton from './../shared/FormButton';
import validators from './../validators/validationForm';
import Invite from './../InviteFriends/Invite';
import eventAction from './../../actions/eventsActions/eventsActions';

class NewEvent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      invitedFriends: [],
    };

    this.onChangeInvitedFriends = this.onChangeInvitedFriends.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onChangeInvitedFriends(invitedFriends) {
    this.setState({
      invitedFriends,
    });
  }

  onClose() {
    this.props.onHide('addNewEvent');
  }

  handleSubmit(value) {
    this.props.addNewEvent({
      ...value,
      participants: this.state.invitedFriends,
    }).then(() => this.onClose());
  }

  render() {
    // console.log(this.state.invitedFriends);
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
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.props.onHide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit(this.handleSubmit)} >
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <Field
                    component={InputField}
                    type="date"
                    value="2017-11-08"
                    name="fromDate"
                    label="Start date"
                    validate={[validators.required]}
                  />
                </div>
                <div className="col-6">
                  <Field
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
              <Invite onChangeInvitedFriends={this.onChangeInvitedFriends} />

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
};

const mapStateToProps = state => ({
  loading: state.events.loading.adding,
});

const mapDispathcToProps = dispatch => ({
  addNewEvent: bindActionCreators(eventAction.addNewEvent, dispatch),
});

const NewEventForm = connect(mapStateToProps, mapDispathcToProps)(NewEvent);

export default reduxForm({
  form: 'addNewEvent',
})(NewEventForm);
