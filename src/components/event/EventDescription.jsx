import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventButton from './../shared/EventButton';
import CalendarUtility from './../../utility/calendarUtility';

const EventDescription = (props) => {
  const { event } = props;
  const participants = event.participants ? event.participants : [];
  const fromDate = CalendarUtility.getDateByFormat(event.fromDate);
  const toDate = CalendarUtility.getDateByFormat(event.toDate);
  return (
    <div>
      <div className="modal-body">
        <div className="row">
          <div className="col-6">
            Start date: {fromDate}
          </div>
          <div className="col-6">
            End date: {toDate}
          </div>
        </div>
        <div>
          <span>Owner: </span>
          <Link
            to={`/users/${event.owner.id}`}
            href={`/users/${event.owner.id}`}
            onClick={props.onClickUser}
          >
            {event.owner.firstname} {event.owner.lastname}
          </Link>
        </div>
        {event.description &&
          <div>
            <span>Description: </span>
            {event.description}
          </div>
        }
        <div>
          Participants:
          <ul className="list-group">
            {participants.map(participant => (
              <li className="list-group-item" key={participant.id}>
                <Link
                  to={`/users/${participant.id}`}
                  href={`/users/${participant.id}`}
                  onClick={props.onClickUser}
                >
                  {participant.firstname} {participant.lastname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="modal-footer">
        <EventButton
          clickHandler={props.clickDeleteEventHandler}
          text="Delete event"
        />
      </div>
    </div>
  );
};

EventDescription.propTypes = {
  clickDeleteEventHandler: PropTypes.func.isRequired,
  onClickUser: PropTypes.func.isRequired,
  event: PropTypes.shape({}).isRequired,
};

export default EventDescription;
