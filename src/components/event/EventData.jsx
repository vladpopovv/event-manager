import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const EventData = (props) => {
  const { event } = props;
  const fromDate = moment(event.fromDate).format('MM-DD-YYYY');
  const toDate = moment(event.toDate).format('MM-DD-YYYY');

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{event.title}</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.onHide}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
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
              <Link to={`/users/${event.owner.id}`} href={`/users/${event.owner.id}`}>
                {event.owner.firstname} {event.owner.lastname}
              </Link>
            </div>
            <div>
              <span>Description: </span>
              {event.description}
            </div>
            <div>
              <ul className="list-group">
                {event.participants.map(participant => (
                  <li className="list-group-item">
                    <Link to={`/users/${participant.id}`} href={`/users/${participant.id}`}>
                      {participant.firstname} {participant.lastname}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EventData.propTypes = {
  event: PropTypes.shape({}).isRequired,
  onHide: PropTypes.func.isRequired,
};

export default EventData;
